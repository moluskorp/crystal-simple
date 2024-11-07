import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Page } from '@renderer/components/Page'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { FormProvider } from '@renderer/components/hook-form'
import { Box, Button, Grid } from '@mui/material'
import { CardAddStore } from './CardAddStore'
import { LoadingButton } from '@mui/lab'
import Iconify from '@renderer/components/Iconify'
import { useAlert } from '@renderer/hooks/Alert'
import { useNavigate } from 'react-router-dom'
import { checkCpfCnpj } from '@renderer/utils/checkCpfCnpj'

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatóri'),
  storeAlias: z.string().min(1, 'Campo obrigatóri'),
  cnpj: z.string().min(1, 'Campo obrigatório'),
  street: z.string(),
  number: z.string(),
  ie: z.string(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  isent: z.boolean(),
  pis: z.string(),
  cofins: z.string(),
  postalcode: z.string(),
  create: z.boolean(),
  id: z.number(),
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
      ie: '',
      name: '',
      number: '',
      pis: '',
      state: '',
      storeAlias: '',
      street: '',
      postalcode: '',
      isent: false,
      create: false,
      id: 0,
    },
  })

  const {
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting },
  } = methods

  const navigate = useNavigate()
  const isent = watch('isent')

  const { showAlert } = useAlert()

  async function onSubmit(data: EditStoreFormData) {
    const cnpj = data.cnpj
      .replaceAll('.', '')
      .replaceAll('-', '')
      .replaceAll('/', '')
    const checkCnpj = checkCpfCnpj(cnpj)

    if (!checkCnpj.isValid && checkCnpj.tipoPessoa !== 'PJ') {
      setError('cnpj', { message: 'Cnpj incorreto' })
      return
    }
    const newData = {
      ...data,
      cnpj,
      ie: isent ? 'ISENTO' : data.ie,
      pis: Number(data.pis.replaceAll(',', '.')),
      cofins: Number(data.cofins.replaceAll(',', '.')),
    }
    console.log('newData', newData)
    if (data.create) {
      await window.api.store.create(newData)
      showAlert('Loja criada com sucesso')
      navigate(PATH_DASHBOARD.root)
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
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="info"
                variant="contained"
                startIcon={<Iconify icon="clarity:settings-line" />}
                onClick={() => {
                  navigate(PATH_DASHBOARD.store.settings)
                }}
              >
                Configurações avançadas
              </Button>
              <LoadingButton
                variant="contained"
                startIcon={<Iconify icon="eva:save-outline" />}
                type="submit"
                loading={isSubmitting}
              >
                Salvar
              </LoadingButton>
            </Box>
          }
        />
        <Grid container>
          <CardAddStore />
        </Grid>
      </FormProvider>
    </Page>
  )
}
