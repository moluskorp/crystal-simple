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
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  function onSubmit(data: EditStoreFormData) {
    console.log(data)
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
