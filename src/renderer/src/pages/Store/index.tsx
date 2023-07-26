import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Page } from '@renderer/components/Page'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { FormProvider } from '@renderer/components/hook-form'
import { Grid } from '@mui/material'
import { CardAddStore } from './CardAddStore'
import { LoadingButton } from '@mui/lab'
import Iconify from '@renderer/components/Iconify'
import { useAlert } from '@renderer/hooks/Alert'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatóri'),
  storeAlias: z.string().min(1, 'Campo obrigatóri'),
  cnpj: z.string().min(1, 'Campo obrigatório'),
  street: z.string(),
  number: z.string(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  pis: z.string(),
  cofins: z.string(),
  postalcode: z.string(),
  create: z.boolean(),
  id: z.number()
})

export type EditStoreFormData = z.infer<typeof schema>

export function Store() {
  const methods = useForm<EditStoreFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      city: '',
      cnpj: '',
      cofins: '',
      district: '',
      name: '',
      number: '',
      pis: '',
      state: '',
      storeAlias: '',
      street: '',
      postalcode: '',
      create: false,
      id: 0,
    },
  })

  const navigate = useNavigate()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods
  const {showAlert} = useAlert()

  async function onSubmit(data: EditStoreFormData) {
    const newData = {
      ...data,
      pis: Number(data.pis.replaceAll(',','.')),
      cofins: Number(data.cofins.replaceAll(',','.'))
    }
    if(data.create) {
      await window.api.store.create(newData)
      showAlert('Loja criada com sucesso')
      navigate(-1)
      return
    }
    await window.api.store.update(newData)
    showAlert('Loja atualizada com sucesso')
    navigate(-1)
  }

  return (
    <Page title="Loja: Cadastro">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <HeaderBreadcrumbs
          heading="Cadastro de loja"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Cadastro de loja' },
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
          <CardAddStore />
        </Grid>
      </FormProvider>
    </Page>
  )
}
