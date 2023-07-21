import { Card } from '@mui/material'
import { usePages } from '@renderer/contexts/PagesContext'
import { useAlert } from '@renderer/hooks/Alert'
import { ProductEan } from '@renderer/sections/@dashboard/product/ProductEan'
import { FormEvent, useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { NewProductFormData } from '.'
import { ProductBasicInfo } from '@renderer/sections/@dashboard/product/ProductBasicInfo'
import { ProductPrice } from '@renderer/sections/@dashboard/product/ProductPrice'
import {
  ConfirmationDialog as ConfirmNcmNull,
  ConfirmationDialog as ConfirmTaxe,
} from '@renderer/components/ConfirmationDialog'
import { PATH_DASHBOARD } from '@renderer/routes/paths'

export function CardAddProduct() {
  const [loading, setLoading] = useState(false)
  const [dialogNcmNullOpen, setDialogNcmNullOpen] = useState(false)
  const [dialogConfirmTaxeOpen, setDialogConfirmTaxeOpen] = useState(false)
  const { showAlert } = useAlert()
  const { activeStep } = usePages()
  const { reset, getValues } = useFormContext<NewProductFormData>()
  const navigate = useNavigate()

  const handleReset = useCallback(() => {
    reset()
    navigate(-1)
  }, [reset, navigate])

  const saveData = useCallback(async (): Promise<void | 'error'> => {
    try {
      setLoading(true)
      const values = getValues()
      const result = await window.api.product.create(values)
      if (result.type === 'error') {
        showAlert('Erro ao cadastrar produto', 'error')
        return 'error'
      }
    } catch (err: any) {
      showAlert(err, 'error')
    } finally {
      setLoading(false)
    }
  }, [getValues, showAlert])

  const handleFinishProduct = useCallback(async () => {
    const error = await saveData()
    if (error === 'error') {
      return
    }
    handleReset()
  }, [saveData, handleReset])

  const finishRegistration = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      const values = getValues()
      if (!values.ncm) {
        setDialogNcmNullOpen(true)
        return
      }

      const taxe = await window.api.taxe.fetch({
        ncm: values.ncm,
      })

      if (!taxe.data) {
        setDialogConfirmTaxeOpen(true)
        return
      }

      handleFinishProduct()
    },
    [getValues, handleFinishProduct],
  )

  async function handleAddTaxe() {
    const error = await saveData()
    if (error === 'error') {
      return
    }
    const ncm = getValues('ncm')
    navigate(`${PATH_DASHBOARD.taxes.root}/${ncm}`)
    reset()
  }

  return (
    <>
      <ConfirmNcmNull
        title="Ncm não informado"
        message="O ncm não foi informado se você continuar esse produto não será gerado para o frente de caixa, deseja continuar?"
        open={dialogNcmNullOpen}
        onAccept={handleFinishProduct}
        onRecuse={() => {}}
        setOpen={setDialogNcmNullOpen}
      />
      <ConfirmTaxe
        title="Tributação não cadastrada"
        message="Tributação não cadastrada para o ncm informado, se você continuar esse item não sera enviado para o frente de caixa, deseja cadastrar a tributação agora?"
        open={dialogConfirmTaxeOpen}
        onAccept={handleAddTaxe}
        onRecuse={handleFinishProduct}
        setOpen={setDialogConfirmTaxeOpen}
      />
      <Card sx={{ p: 3 }}>
        {activeStep === 0 && <ProductEan />}
        {activeStep === 1 && <ProductBasicInfo />}
        {activeStep === 2 && (
          <ProductPrice onFinish={finishRegistration} loading={loading} />
        )}
      </Card>
    </>
  )
}
