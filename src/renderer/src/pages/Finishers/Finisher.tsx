import { zodResolver } from '@hookform/resolvers/zod'
import { useAlert } from '@renderer/hooks/Alert'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Finisher as IFinisher } from 'src/shared/types/finisher'
import { Page } from '@renderer/components/Page'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { LoadingButton } from '@mui/lab'
import Iconify from '@renderer/components/Iconify'
import { Box, Grid } from '@mui/material'
import { CardAddFinisher } from './new/CardAddFinisher'
import { FormProvider } from '@renderer/components/hook-form'

const schema = z.object({
  code: z.string().min(1, 'Campo obrigatório'),
  description: z.string().min(1, 'Campo obrigatório'),
})

type EditFinisherFormdata = z.infer<typeof schema>

export function Finisher() {
  const [finisher, setFinisher] = useState<IFinisher>({} as IFinisher)

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { showAlert } = useAlert()

  const formMethods = useForm<EditFinisherFormdata>({
    resolver: zodResolver(schema),
    defaultValues: {
      code: '',
      description: '',
    },
  })

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = formMethods

  const fillFields = useCallback(
    (data: IFinisher) => {
      setValue('code', String(data.code))
      setValue('description', data.description)
    },
    [setValue],
  )

  useEffect(() => {
    window.api.finisher.fetch({ id: Number(id) }).then((result) => {
      if (result.type === 'error') {
        showAlert(result.message!, 'error')
        return
      }
      setFinisher(result.data!)
      fillFields(result.data!)
    })
  }, [id, showAlert, fillFields])

  async function onSubmit(data: EditFinisherFormdata) {
    try {
      const newData = {
        ...finisher,
        ...data,
        description: data.description,
        code: Number(data.code),
      }
      const result = await window.api.finisher.update(newData)
      if (result.type === 'error') {
        throw new Error(result.message)
      }
      showAlert('Finalizadora atualizda com sucesso')
      navigate(-1)
    } catch (e: any) {
      showAlert(e.message, 'error')
    }
  }

  return (
    <Page title={`Finalizadora: ${finisher.description}`}>
      <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
        <HeaderBreadcrumbs
          heading={`Finalizadora: ${finisher.description}`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Finalizadoras', href: PATH_DASHBOARD.finisher.root },
            { name: finisher.description },
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
            <CardAddFinisher />
          </Box>
        </Grid>
      </FormProvider>
    </Page>
  )
}
