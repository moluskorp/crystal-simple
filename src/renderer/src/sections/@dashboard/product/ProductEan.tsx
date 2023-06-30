import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import { RHFCheckbox, RHFTextField } from '@renderer/components/hook-form'
import { usePages } from '@renderer/contexts/PagesContext'
import { useAlert } from '@renderer/hooks/Alert'
import { NewProductFormData } from '@renderer/pages/Products/new'
import { validateEAN13 } from '@renderer/utils/validateEAN13'
import { FormEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export function ProductEan() {
  const [loading, setLoading] = useState(false)
  const { showAlert } = useAlert()
  const { nextPage } = usePages()
  const { getValues, watch } = useFormContext<NewProductFormData>()

  const weightProduct = watch('weightProduct')

  function validate(ean: string): boolean {
    if (!weightProduct) {
      if (ean) {
        return validateEAN13(ean)
      }
    }
    return true
  }

  function handleNextPage(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    try {
      const ean = getValues('ean')
      const error = !validate(ean)
      if (error) {
        showAlert(`Código de barras incorreto`, 'error')
        return
      }
      nextPage()
    } catch (err: any) {
      showAlert(err, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleNextPage}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <RHFCheckbox label="Produto Pesável" name="weightProduct" />
        <RHFTextField
          name="ean"
          label="Código Barras"
          autoFocus
          fullWidth={false}
          sx={{ width: '10rem' }}
          disabled={weightProduct}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          color="success"
          sx={{ ml: 'auto', mt: '2rem' }}
        >
          Próximo
        </LoadingButton>
      </Box>
    </form>
  )
}
