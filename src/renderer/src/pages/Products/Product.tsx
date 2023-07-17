import { useAlert } from '@renderer/hooks/Alert'
import useSettings from '@renderer/hooks/useSettings'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Product as IProduct } from 'src/shared/types/product'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Page } from '@renderer/components/Page'
import {
  FormProvider,
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from '@renderer/components/hook-form'
import {
  Box,
  Card,
  Container,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { LoadingButton } from '@mui/lab'
import Iconify from '@renderer/components/Iconify'
import { Group } from 'src/shared/types/group'
import { Origin } from 'src/shared/types/orig'
import { Scrollbar } from '@renderer/components/Scrollbar'
import { ProductEan } from 'src/shared/types/productean'
import { GenerateEanDialog } from '@renderer/components/GenerateEanDialog'

// const eanInfoSchema = zod.object({
//   ean: zod.string(),
// })

const schema = zod.object({
  description: zod.string(),
  shortDescription: zod.string(),
  weightProduct: zod.boolean(),
  ncm: zod.string(),
  group_id: zod.number(),
  origin_id: zod.number(),
  price1: zod.string(),
  price2: zod.string(),
  coust: zod.string(),
})

type ProductFormData = zod.infer<typeof schema>

export function Product() {
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const [groups, setGroups] = useState<Group[]>([])
  const [origins, setOrigins] = useState<Origin[]>([])
  const [eans, setEans] = useState<ProductEan[]>([])
  const [generateEanDialogOpen, setGenerateEanDialogOpen] = useState(false)

  const { themeStretch } = useSettings()
  const theme = useTheme()
  const { showAlert } = useAlert()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const formMethods = useForm<ProductFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      shortDescription: '',
      ncm: '',
      origin_id: 0,
      group_id: 0,
      price1: '',
      price2: '',
      coust: '',
      weightProduct: false,
    },
  })

  const {
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = formMethods

  const weightProductInput = watch('weightProduct')

  function fillFields(data: IProduct) {
    const weightProduct = Boolean(data.weightProduct)
    setValue('weightProduct', weightProduct)
    setValue('ncm', data.ncm || '')
    setValue('description', data.description)
    setValue('shortDescription', data.shortDescription)
    setValue('origin_id', data.origin_id)
    setValue('group_id', data.group_id)
    setValue('price1', String(data.price1).replace('.', ','))
    setValue('price2', String(data.price2).replace('.', ','))
    setValue('coust', String(data.coust).replace('.', ','))
  }

  useEffect(() => {
    window.api.origin.fetchAll().then((result) => {
      setOrigins(result.data!)
    })
    window.api.group.fetchAllActive().then((result) => setGroups(result.data!))
    window.api.product.fetch({ id: Number(id) }).then((result) => {
      setProduct(result.data!)
      window.api.productEan
        .fetchByPrdId({ prd_id: Number(id) })
        .then((result2) => {
          setEans(result2.data!)
          fillFields(result.data!)
        })
    })
    // eslint-disable-next-line
  }, [id])

  function correctData(data: ProductFormData) {
    const price1 = Number(data.price1.replace(',', '.'))
    const price2 = Number(data.price2.replace(',', '.'))
    const coust = Number(data.coust.replace(',', '.'))
    return { ...data, id: product.id, price1, price2, coust }
  }

  async function onSubmit(data: ProductFormData) {
    try {
      const dataCorrect = correctData(data)
      console.log('dataCorrect', dataCorrect)
      await window.api.product.update(dataCorrect)
      navigate(-1)
    } catch (err: any) {
      showAlert(err.message, 'error')
    }
  }

  async function handleDeleteEan(id: number) {
    try {
      await window.api.productEan.delete({ id })
      const newEans = eans.filter((e) => e.pean_id !== id)
      setEans(newEans)
    } catch (err: any) {
      showAlert(err.message, 'error')
    }
  }

  function insertEan(ean: string, id: number) {
    const pean = {} as ProductEan
    const newPean = { ...pean, pean_ean: ean, pean_id: id }
    const newEans = [...eans, newPean]
    setEans(newEans)
  }

  return (
    <Page title={`Produto: ${product.description}`}>
      <GenerateEanDialog
        open={generateEanDialogOpen}
        setOpen={setGenerateEanDialogOpen}
        prd_id={product.id}
        weightProduct={weightProductInput}
        insertEan={insertEan}
      />
      <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={`Detalhes do produto: ${product.description}`}
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Produtos', href: PATH_DASHBOARD.product.root },
              { name: product.description },
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
          <Grid
            container
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: {
                md: 'repeat(1, 1fr)',
                lg: 'repeat(2, 1fr)',
              },
            }}
          >
            <Grid
              item
              xs={12}
              md={12}
              sx={{ gridColumn: { md: '1/4', lg: '1/3' } }}
            >
              <Typography variant="h4">Informações Básicas</Typography>

              <Card sx={{ p: 3, mt: 2 }}>
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
                  <RHFCheckbox
                    name="weightProduct"
                    label="Produto de balança"
                    sx={{ gridColumn: '1/4' }}
                  />
                  <RHFTextField
                    name="ncm"
                    label="NCM"
                    mask="00000000"
                    sx={{ gridColumn: '1/1' }}
                  />
                  <RHFTextField
                    name="description"
                    label="Descrição"
                    required
                    sx={{ gridColumn: '1/4' }}
                  />
                  <RHFTextField
                    name="shortDescription"
                    label="Descrição Reduzida"
                    required
                    sx={{ gridColumn: '1/4' }}
                  />
                  <RHFSelect
                    name="origin_id"
                    label="Origem"
                    required
                    sx={{ gridColumn: '1/4' }}
                  >
                    <MenuItem value={0}>
                      <em>Selecione uma origem</em>
                    </MenuItem>
                    {origins.map((origin) => (
                      <MenuItem key={origin.id} value={origin.id}>
                        {`${origin.code} - ${origin.description}`}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                  <RHFSelect
                    name="group_id"
                    label="Grupo"
                    required
                    sx={{ gridColumn: '1/4' }}
                  >
                    <MenuItem value={0}>
                      <em>Selecione um grupo</em>
                    </MenuItem>
                    {groups.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </Box>
              </Card>
            </Grid>
            <Box
              sx={{
                gridColumn: { md: '1/4', lg: '3/4' },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="h4">Códigos de barras</Typography>
                <Card
                  sx={{
                    p: 3,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '8rem',
                    }}
                  >
                    <Scrollbar>
                      <List sx={{ maxHeight: '7rem' }}>
                        {eans.map((ean) => (
                          <ListItem
                            key={ean.pean_id}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="deletar"
                                onClick={() => {
                                  handleDeleteEan(ean.pean_id)
                                }}
                              >
                                <Iconify icon="pajamas:remove" />
                              </IconButton>
                            }
                            sx={{
                              borderRadius: 1,
                              '&:hover': {
                                background: theme.palette.background.neutral,
                              },
                            }}
                          >
                            <ListItemText primary={ean.pean_ean} />
                          </ListItem>
                        ))}

                        <ListItem />
                        <ListItem />
                      </List>
                    </Scrollbar>
                    <Fab
                      size="small"
                      aria-label="adicionar código de barras"
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                      }}
                    >
                      <Iconify
                        icon="mingcute:add-fill"
                        sx={{ fontSize: '1.5rem' }}
                        onClick={() => {
                          setGenerateEanDialogOpen(true)
                        }}
                      />
                    </Fab>
                  </Box>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ gridColumn: { md: '1/4', lg: '3/4' } }}
              >
                <Typography variant="h4">Preços</Typography>
                <Card sx={{ p: 3, mt: 2 }}>
                  <Box
                    sx={{
                      display: 'grid',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: {
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(1, 1fr)',
                      },
                    }}
                  >
                    <RHFTextField
                      name="price1"
                      label="Preço 1"
                      required
                      mask={Number}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                        inputProps: {
                          style: { textAlign: 'end' },
                        },
                      }}
                      sx={{
                        gridColumn: {
                          sm: '1/1',
                          md: '1/1',
                          lg: '1/1',
                        },
                      }}
                    />
                    <RHFTextField
                      name="price2"
                      label="Preço 2"
                      mask={Number}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                        inputProps: {
                          style: { textAlign: 'end' },
                        },
                      }}
                      sx={{
                        gridColumn: {
                          sm: '2/2',
                          md: '2/2',
                          lg: '1/1',
                        },
                      }}
                    />
                    <RHFTextField
                      name="coust"
                      label="Custo"
                      mask={Number}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                        inputProps: {
                          style: { textAlign: 'end' },
                        },
                      }}
                      sx={{
                        gridColumn: {
                          sm: '3/3',
                          md: '3/3',
                          lg: '1/1',
                        },
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </FormProvider>
    </Page>
  )
}
