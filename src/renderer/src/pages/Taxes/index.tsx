import { Container, Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import { PagesProvider } from '@renderer/contexts/PagesContext'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import * as zod from 'zod'
import { CardAddTaxe } from './CardAddTaxe'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Stepper } from '@renderer/components/Stepper'

const steps = ['Informe o NCM', 'Informe a Tributação']

const schema = zod.object({
  ncm: zod.string(),
  icmsNature: zod.string(),
  description: zod.string(),
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

export function Taxes() {
  const methods = useForm<NewTaxeFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ncm: '',
      icmsNature: 'substitution',
      icmsPercentage: '',
      icmsReduction: '',
      ipiCst: '53',
      ipiPercentage: '',
      pisCofinsCst: '01',
      pisPercentage: '',
      cofinsPercentage: '',
      fcpPercentage: '',
    },
  })

  const { themeStretch } = useSettings()

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
          <Grid container>
            <Grid item xs={12} md={8} sx={{ mb: 5, margin: '0 auto 2rem' }}>
              <Stepper steps={steps} />
            </Grid>
          </Grid>
          <FormProvider {...methods}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <CardAddTaxe />
              </Grid>
            </Grid>
          </FormProvider>
        </PagesProvider>
      </Container>
    </Page>
  )
}
