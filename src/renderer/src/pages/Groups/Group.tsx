import { Page } from '@renderer/components/Page'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Group as GroupType } from 'src/shared/types/group'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Card, Container, Grid } from '@mui/material'
import useSettings from '@renderer/hooks/useSettings'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import Iconify from '@renderer/components/Iconify'
import { RHFTextField } from '@renderer/components/hook-form'
import { useAlert } from '@renderer/hooks/Alert'
import { LoadingButton } from '@mui/lab'

const schema = zod.object({
  name: zod.string().min(1, 'Campo obrigatório'),
})

type EditGroupFormData = zod.infer<typeof schema>

export function Group() {
  const [group, setGroup] = useState<GroupType>({} as GroupType)
  const [loading, setLoading] = useState(false)

  const { themeStretch } = useSettings()
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  const formMethods = useForm<EditGroupFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
  })

  const { id } = useParams<{ id: string }>()
  const { setValue, handleSubmit } = formMethods

  useEffect(() => {
    window.api.group.select({ id: Number(id!) }).then(({ data }) => {
      setValue('name', data.name)
      setGroup(data)
    })
  }, [id, setValue])

  async function handleSaveGroup({ name }: EditGroupFormData) {
    try {
      setLoading(true)
      const updateGroup = {
        id: group.id,
        active: group.active,
        name,
      }
      await window.api.group.update(updateGroup)
      showAlert('Grupo editado com sucesso')
      navigate(-1)
    } catch (err: any) {
      showAlert(err, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page title={`Grupo: ${group.name}`}>
      <FormProvider {...formMethods}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <form onSubmit={handleSubmit(handleSaveGroup)}>
            <HeaderBreadcrumbs
              heading={`Detalhes do grupo: ${group.name}`}
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Grupos', href: PATH_DASHBOARD.group.root },
                { name: group.name },
              ]}
              action={
                <LoadingButton
                  variant="contained"
                  startIcon={<Iconify icon="eva:save-outline" />}
                  type="submit"
                  loading={loading}
                >
                  Salvar
                </LoadingButton>
              }
            />
            <Grid container>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                      },
                    }}
                  >
                    <RHFTextField name="name" label="Nome" required />
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </form>
        </Container>
      </FormProvider>
    </Page>
  )
}
