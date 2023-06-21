import { zodResolver } from '@hookform/resolvers/zod'
import { Container, Grid } from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import { Stepper } from '@renderer/components/Stepper'
import { PagesProvider } from '@renderer/contexts/PagesContext'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { CardAddGroup } from './CardAddGroup'

const steps = ['Informe o nome do grupo']

const schema = zod.object({
  name: zod.string(),
})

export function NewGroup() {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '' },
  })

  const { themeStretch } = useSettings()

  return (
    <Page title="Grupo: Cadastro">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Cadastro de Grupo"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Grupos', href: PATH_DASHBOARD.group.root },
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
                <CardAddGroup />
              </Grid>
            </Grid>
          </FormProvider>
        </PagesProvider>
      </Container>
    </Page>
  )
}
