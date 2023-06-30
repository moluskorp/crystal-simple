import { Card, Container, Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import { PagesProvider } from '@renderer/contexts/PagesContext'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { TaxeDetails } from '@renderer/sections/@dashboard/taxe/TaxeDetails'
import { useCallback, useState } from 'react'
import { useAlert } from '@renderer/hooks/Alert'
import { useNavigate, useParams } from 'react-router-dom'

const schema = zod.object({
  ncm: zod.string(),
  icmsNature: zod.string(),
  icmsPercentage: zod.string(),
  icmsReduction: zod.string(),
  ipiCst: zod.string(),
  ipiPercentage: zod.string(),
  pisCofinsCst: zod.string(),
  pisPercentage: zod.string(),
  cofinsPercentage: zod.string(),
  fcpPercentage: zod.string(),
})

export type NewTaxeFormData = zod.infer<typeof schema>

export function NcmAddTaxe() {
  const [loading, setLoading] = useState(false)

  const { ncm } = useParams<{ ncm: string }>()
  const { showAlert } = useAlert()

  const navigate = useNavigate()

  const methods = useForm<NewTaxeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ncm: '',
      icmsNature: 'substitution',
      icmsPercentage: '',
      icmsReduction: '',
      ipiCst: '50',
      ipiPercentage: '',
      pisCofinsCst: '0',
      pisPercentage: '',
      cofinsPercentage: '',
      fcpPercentage: '',
    },
  })

  const { reset, clearErrors, setError } = methods

  const { themeStretch } = useSettings()

  const handleReset = useCallback(() => {
    reset()
    navigate(PATH_DASHBOARD.product.root)
  }, [reset, navigate])

  const resolveErrors = useCallback(
    (data: NewTaxeFormData) => {
      const icmsPercentageIsEmpty = !data.icmsPercentage
      const ipiPercentageIsEmpty = !data.ipiPercentage
      const pisPercentageIsEmpty = !data.pisPercentage
      const cofinsPercentageIsEmpty = !data.cofinsPercentage
      let error = false
      if (data.icmsNature === 'taxed' && icmsPercentageIsEmpty) {
        setError('icmsPercentage', {
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
    async (data: NewTaxeFormData) => {
      try {
        setLoading(true)
        clearErrors()
        const haveErrors = resolveErrors(data)
        if (haveErrors) {
          return
        }
        const newData = {
          ...data,
          ncm: ncm!,
        }
        const response = await window.api.taxe.create(newData)
        if (response.type === 'error') {
          showAlert(response.message!, 'error')
          return
        }
        showAlert(`Tributação cadastrada com sucesso!`, 'success')
        handleReset()
      } catch (err: any) {
        showAlert(err.message, 'error')
      } finally {
        setLoading(false)
      }
    },
    [showAlert, clearErrors, resolveErrors, handleReset, ncm],
  )

  return (
    <Page title="Tributação: Cadastro">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastro de tributação"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Tributação' },
          ]}
        />
        <PagesProvider totalPages={2}>
          <FormProvider {...methods}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <TaxeDetails
                    ncm={ncm!}
                    finishRegistration={finishRegistration}
                    loading={loading}
                  />
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </PagesProvider>
      </Container>
    </Page>
  )
}
