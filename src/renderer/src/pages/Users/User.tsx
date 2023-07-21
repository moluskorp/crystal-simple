import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import { useAlert } from '@renderer/hooks/Alert'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { User as IUser } from 'src/shared/types/user'
import { z } from 'zod'
import { CardAddUser } from './new/CardAddUser'
import { FormProvider } from '@renderer/components/hook-form'

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  username: z.string().min(1, 'Campo obrigatório'),
  password: z.string().min(1, 'Campo obrigatório'),
})

export type EditUserFormData = z.infer<typeof schema>

export function User() {
  const [user, setUser] = useState<IUser>({} as IUser)

  const { showAlert } = useAlert()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  })

  const { handleSubmit, setValue } = methods

  const fillFields = useCallback(
    (data: EditUserFormData) => {
      setValue('name', data.name)
      setValue('username', data.username)
      setValue('password', data.password)
    },
    [setValue],
  )

  useEffect(() => {
    window.api.user.fetch({ id: Number(id) }).then((result) => {
      setUser(result.data!)
      fillFields(result.data!)
    })
  }, [id, fillFields])

  async function onSubmit(data: EditUserFormData) {
    try {
      const username = data.username.toLowerCase()
      const newData = { ...data, username, id: user.id, active: user.active }
      await window.api.user.update(newData)

      showAlert('Usuário editado com sucesso')
      navigate(-1)
    } catch (err: any) {
      showAlert(err.message, 'error')
    }
  }

  return (
    <Page title={`Usuário: ${user.name}`}>
      <HeaderBreadcrumbs
        heading={`Usuário: ${user.name}`}
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Usuários', href: PATH_DASHBOARD.user.root },
          { name: user.name },
        ]}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <CardAddUser />
        </Grid>
      </FormProvider>
    </Page>
  )
}
