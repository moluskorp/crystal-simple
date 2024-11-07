import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import Iconify from '@renderer/components/Iconify'
import { Page } from '@renderer/components/Page'
import { FormProvider } from '@renderer/components/hook-form'
import { useAlert } from '@renderer/hooks/Alert'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { CardAdvancedSettings } from './CardAdvancedSettings'

const schema = z.object({
  amountPdv: z.number().min(1, 'Campo obrigatório'),
  folderPdv: z.string().min(1, 'Campo obrigatório'),
  folderScale: z.string().min(1, 'Campo obrigatório'),
})

export type AdvancedSettingsFormData = z.infer<typeof schema>

export function AdvancedSettings() {
  const methods = useForm<AdvancedSettingsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountPdv: 0,
      folderPdv: '',
      folderScale: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const navigate = useNavigate()

  const { showAlert } = useAlert()

  async function onSubmit(data: AdvancedSettingsFormData) {
    showAlert('onSubmit')
  }

  return (
    <Page title="Loja: Configurações avançadas">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <HeaderBreadcrumbs
          heading="Configurações avançadas"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Cadastro de loja', href: PATH_DASHBOARD.store.root },
            {
              name: 'Configurações avançadas',
              href: PATH_DASHBOARD.store.settings,
            },
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
          <CardAdvancedSettings />
        </Grid>
      </FormProvider>
    </Page>
  )
}
