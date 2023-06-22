import { Card } from '@mui/material'
import { usePages } from '@renderer/contexts/PagesContext'
import { TaxeDetails } from '@renderer/sections/@dashboard/taxe/TaxeDetails'
import { TaxeNcm } from '@renderer/sections/@dashboard/taxe/TaxeNcm'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { NewTaxeFormData } from '.'
import { useAlert } from '@renderer/hooks/Alert'
import { ErrorResponse } from '../../../../shared/types/error'

export function CardAddTaxe() {
  const { activeStep } = usePages()
  const { showAlert } = useAlert()
  const [ncm, setNcm] = useState('')
  const [loading, setLoading] = useState(false)
  const { reset, clearErrors, setError } = useFormContext()
  const navigate = useNavigate()

  const handleReset = useCallback(() => {
    reset()
    setNcm('')
    navigate(-1)
  }, [reset, navigate])

  const resolveErrors = useCallback(
    (data: NewTaxeFormData) => {
      const icmsPercentageIsEmpty = !data.icmsPercentage
      const ipiPercentageIsEmpty = !data.ipiPercentage
      const pisPercentageIsEmpty = !data.pisPercentage
      const cofinsPercentageIsEmpty = !data.cofinsPercentage
      let error = false
      if (data.icmsNature === 'taxed' && icmsPercentageIsEmpty) {
        setError('taxationPercentage', {
          message: 'Campo obrigatório',
        })
        error = true
      }
      if (data.ipiCst === '50' && ipiPercentageIsEmpty) {
        setError('ipiPercentage', {
          message: 'Campo obrigatório',
        })
        error = true
      }
      if (data.pisCofinsCst === '02') {
        if (pisPercentageIsEmpty) {
          setError('pisPercentage', { message: 'Campo obrigatório' })
          error = true
        }
        if (cofinsPercentageIsEmpty) {
          setError('cofinsPercentage', { message: 'Campo obrigatório' })
          error = true
        }
      }
      return error
    },
    [setError],
  )

  const finishRegistration = useCallback(
    async (data: NewTaxeFormData, updating: boolean, id?: number) => {
      try {
        setLoading(true)
        clearErrors()
        const haveErrors = resolveErrors(data)
        if (haveErrors) {
          return
        }
        let response: ErrorResponse
        if (updating) {
          response = await window.api.taxe.update({ id: id!, ...data })
        } else {
          response = await window.api.taxe.create(data)
        }
        if (response.type === 'error') {
          showAlert(response.message!, 'error')
          return
        }
        const alertMessage = updating ? 'atualizada' : 'cadastrada'
        showAlert(`Tributação ${alertMessage} com sucesso!`, 'success')
        handleReset()
      } catch (err: any) {
        showAlert(err.message, 'error')
      } finally {
        setLoading(false)
      }
    },
    [showAlert, clearErrors, resolveErrors, handleReset],
  )

  return (
    <Card sx={{ p: 3 }}>
      <>
        {activeStep === 0 && <TaxeNcm setNcm={setNcm} />}{' '}
        {activeStep === 1 && (
          <TaxeDetails
            ncm={ncm}
            finishRegistration={finishRegistration}
            loading={loading}
          />
        )}
      </>
    </Card>
  )
}
