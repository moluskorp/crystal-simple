import { zodResolver } from '@hookform/resolvers/zod'
import { useAlert } from '@renderer/hooks/Alert'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Pdv as IPdv } from 'src/shared/types/pdv'
import { z } from 'zod'
import { Page } from '@renderer/components/Page'
import { FormProvider } from '@renderer/components/hook-form'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { LoadingButton } from '@mui/lab'
import Iconify from '@renderer/components/Iconify'
import { Box, Grid } from '@mui/material'
import { CardAddPdv } from './new/CardAddPdv'

const schema = z.object({
  number: z.string().min(1, 'Campo obrigatório'),
  serial: z.string(),
})

type EditPdvFormdata = z.infer<typeof schema>

export function Pdv() {
  const [pdv, setPdv] = useState<IPdv>({} as IPdv)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { showAlert } = useAlert()

  const formMethods = useForm<EditPdvFormdata>({
    resolver: zodResolver(schema),
    defaultValues: {
      number: '',
      serial: '',
    },
  })

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = formMethods

  const fillFields = useCallback(
    (data: IPdv) => {
      setValue('number', String(data.number))
      setValue('serial', data.serial || '')
    },
    [setValue],
  )

  useEffect(() => {
    window.api.pdv.fetch({ id: Number(id) }).then((result) => {
      setPdv(result.data!)
      fillFields(result.data!)
    })
  }, [fillFields, id])

  async function onSubmit(data: EditPdvFormdata) {
    try {
      const newData = {
        ...pdv,
        ...data,
        number: Number(data.number),
      }
      const result = await window.api.pdv.update(newData)
      if (result.type === 'error') {
        throw new Error(result.message)
      }
      showAlert('Pdv atualizado com sucesso')
      navigate(-1)
    } catch (e: any) {
      showAlert(e.message, 'error')
    }
  }

  return (
    <Page title={`PDV: ${pdv.number}`}>
      <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
        <HeaderBreadcrumbs
          heading={`Pdv: ${pdv.number}`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pdvs', href: PATH_DASHBOARD.pdv.root },
            { name: String(pdv.number) },
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
          <Box sx={{ display: 'flex', margin: 'auto' }}>
            <CardAddPdv />
          </Box>
        </Grid>
      </FormProvider>
    </Page>
  )
}
