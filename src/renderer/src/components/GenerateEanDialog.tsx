import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { FormProvider, RHFTextField } from './hook-form'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAlert } from '@renderer/hooks/Alert'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { validateEAN13 } from '@renderer/utils/validateEAN13'

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  prd_id: number
  weightProduct: boolean
  insertEan: (ean: string, id: number) => void
}

const schema = zod.object({
  ean: zod.string(),
})

type EanFormData = zod.infer<typeof schema>

export function GenerateEanDialog({
  open,
  setOpen,
  prd_id,
  weightProduct,
  insertEan,
}: Props) {
  const [loading, setLoading] = useState(false)
  const { showAlert } = useAlert()

  function handleClose() {
    reset()
    setOpen(false)
  }

  const formMethods = useForm<EanFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ean: '',
    },
  })

  const { handleSubmit, reset } = formMethods

  async function handleGenerateEan() {
    try {
      setLoading(true)
      const generated = await window.api.productEan.generate({
        prd_id,
        weightProduct,
      })
      const { pean_ean, pean_id } = generated.data!
      insertEan(pean_ean, pean_id)
      showAlert('Códigod de barras gerado com sucesso')
      handleClose()
    } catch (err: any) {
      showAlert(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  function validate(ean: string): boolean {
    if (!weightProduct) {
      if (ean) {
        return validateEAN13(ean)
      }
    }
    return true
  }

  async function onSubmit({ ean }: EanFormData) {
    try {
      setLoading(true)
      const error = !validate(ean)
      if (error) {
        showAlert(`Código de barras incorreto`, 'error')
        return
      }
      const result = await window.api.productEan.create({
        ean,
        prd_id,
        generated: false,
        weightProduct,
      })
      if (result.type === 'error') {
        throw new Error(result.message)
      }
      const { pean_ean, pean_id } = result.data!
      insertEan(pean_ean, pean_id)
      showAlert('Código de barras cadastrado com sucesso')
      handleClose()
    } catch (err: any) {
      showAlert(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Cadastro de código de barras</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Insira o código de baras do produto, ou clique em gerar para o
            sistema gerar um automáticamente
          </DialogContentText>
          <RHFTextField
            name="ean"
            autoFocus
            margin="dense"
            id="ean"
            label="Código de barras"
            mask="0000000000000"
            required
            sx={{ mt: 4 }}
            InputProps={{
              inputProps: {
                style: { textAlign: 'center' },
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Box>
            <LoadingButton
              loading={loading}
              color="secondary"
              onClick={handleGenerateEan}
            >
              Gerar
            </LoadingButton>
            <LoadingButton loading={loading} type="submit">
              Aceitar
            </LoadingButton>
          </Box>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}
