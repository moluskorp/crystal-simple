import { zodResolver } from '@hookform/resolvers/zod'
import { Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import { Stepper } from '@renderer/components/Stepper'
import { PagesProvider } from '@renderer/contexts/PagesContext'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CardAddProduct } from './CardAddProduct'

const steps = ['Código de barra', 'Informações básicas', 'Preços']

const schema = zod.object({
  weightProduct: zod.boolean(),
  ean: zod.string().min(1, 'Campo obrigatório'),
  description: zod.string(),
  shortDescription: zod.string(),
  ncm: zod.string(),
  group_id: zod.number().min(1, 'Campo obrigatório'),
  origin_id: zod.number(),
  price1: zod.number(),
  price2: zod.number(),
  coust: zod.number(),
})

export type NewProductFormData = zod.infer<typeof schema>

export function NewProduct() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      group_id: 0,
      origin_id: 1,
      weightProduct: false,
      description: '',
      shortDescription: '',
      ncm: '',
      price1: '1',
      price2: '0',
      coust: '0',
    },
  })

  return (
    <Page title="Produto: Cadastro">
      <HeaderBreadcrumbs
        heading="Cadastro de Produto"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Produtos', href: PATH_DASHBOARD.product.root },
          { name: 'Cadastro' },
        ]}
      />
      <PagesProvider totalPages={1}>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 5, margin: '0 auto 2rem' }}>
            <Stepper steps={steps} />
          </Grid>
        </Grid>
        <FormProvider {...methods}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <CardAddProduct />
            </Grid>
          </Grid>
        </FormProvider>
      </PagesProvider>
    </Page>
  )
}
