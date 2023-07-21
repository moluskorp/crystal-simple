import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import { FormProvider } from '@renderer/components/hook-form'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardAddUser } from './CardAddUser'
import { useAlert } from '@renderer/hooks/Alert'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  username: z.string().min(1, 'Campo obrigatório'),
  password: z.string().min(1, 'Campo obrigatório'),
})

export type NewUserFormData = z.infer<typeof schema>

export function NewUser() {
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  })

  const { handleSubmit } = methods

  async function onSubmit(data: NewUserFormData) {
    try {
      const username = data.username.toLowerCase()
      const newData = { ...data, username }
      await window.api.user.create(newData)

      showAlert('Usuário cadastrado com sucesso')
      navigate(-1)
    } catch (err: any) {
      showAlert(err.message, 'error')
    }
  }

  return (
    <Page title="Usuário: Cadastro">
      <HeaderBreadcrumbs
        heading="Cadastro de Usuário"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Usuários', href: PATH_DASHBOARD.user.root },
          { name: 'Cadastro' },
        ]}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Box sx={{ display: 'flex', margin: 'auto' }}>
            <CardAddUser />
          </Box>
        </Grid>
      </FormProvider>
    </Page>
  )
}
