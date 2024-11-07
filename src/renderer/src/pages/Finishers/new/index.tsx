import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Box, Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import Iconify from '@renderer/components/Iconify'
import { Page } from '@renderer/components/Page'
import { FormProvider } from '@renderer/components/hook-form'
import { useAlert } from '@renderer/hooks/Alert'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { CardAddFinisher } from './CardAddFinisher'

const schema = z.object({
  code: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
})

export type NewFinisherFormData = z.infer<typeof schema>

export function NewFinisher() {
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const methods = useForm<NewFinisherFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '0',
      description: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  async function onSubmit(data: NewFinisherFormData) {
    try {
      const newData = { ...data, code: Number(data.code) }
      const result = await window.api.finisher.create(newData)
      if (result.type === 'error') {
        throw new Error(result.message)
      }
      showAlert('Finalizadora cadastrada com sucesso')
      navigate(-1)
    } catch (err: any) {
      showAlert(err.message, 'error')
    }
  }

  return (
    <Page title="Finalizadora: Cadastro">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <HeaderBreadcrumbs
          heading="Cadatro de finalizadora"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Finalizadoras', href: PATH_DASHBOARD.finisher.root },
            { name: 'Cadastro' },
          ]}
          action={
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="eva:save-outline" />}
              type="submit"
              loading={isSubmitting}
            >
              Salvar
            </LoadingButton>
          }
        />
        <Grid container>
          <Box sx={{ display: 'flex', margin: 'auto' }}>
            <CardAddFinisher />
          </Box>
        </Grid>
      </FormProvider>
    </Page>
  )
}
