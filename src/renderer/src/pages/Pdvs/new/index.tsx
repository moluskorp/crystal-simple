import { useAlert } from '@renderer/hooks/Alert'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Page } from '@renderer/components/Page'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { FormProvider } from '@renderer/components/hook-form'
import { LoadingButton } from '@mui/lab'
import Iconify from '@renderer/components/Iconify'
import { Box, Grid } from '@mui/material'
import { CardAddPdv } from './CardAddPdv'

const schema = z.object({
  number: z.string().min(1, 'Campo obrigatório'),
  serial: z.string(),
})

export type NewPdvFormData = z.infer<typeof schema>

export function NewPdv() {
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const methods = useForm<NewPdvFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      number: '0',
      serial: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  async function onSubmit(data: NewPdvFormData) {
    const newData = { ...data, number: Number(data.number) }
    try {
      const result = await window.api.pdv.create(newData)
      if (result.type === 'error') {
        throw new Error(result.message)
      }
      showAlert('Pdv cadastrado com sucesso')
      navigate(-1)
    } catch (err: any) {
      showAlert(err.message, 'error')
    }
  }

  return (
    <Page title="Pdv: Cadastro">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <HeaderBreadcrumbs
          heading="Cadastro de Pdv"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pdvs', href: PATH_DASHBOARD.pdv.root },
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
            <CardAddPdv />
          </Box>
        </Grid>
      </FormProvider>
    </Page>
  )
}
