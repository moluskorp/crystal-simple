import { LoadingButton } from '@mui/lab'
import { Button, Box } from '@mui/material'
import { RHFTextField } from '@renderer/components/hook-form'
import { usePages } from '@renderer/contexts/PagesContext'
import { FormEvent } from 'react'

interface Props {
  onFinish: (event: FormEvent) => void
  loading: boolean
}

export function ProductPrice({ onFinish, loading }: Props) {
  const { previousPage } = usePages()

  return (
    <>
      <form onSubmit={onFinish}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
          }}
        >
          <RHFTextField
            name="price1"
            label="Preço 1"
            required
            mask={Number}
            autoFocus
          />
          <RHFTextField name="price2" label="Preço 2" mask={Number} />
          <RHFTextField name="coust" label="Preço de custo" mask={Number} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={previousPage}
            variant="contained"
            color="warning"
            sx={{ mt: '2rem' }}
          >
            Voltar
          </Button>
          <LoadingButton
            variant="contained"
            color="success"
            loading={loading}
            type="submit"
            sx={{ mt: '2rem' }}
          >
            Finalizar
          </LoadingButton>
        </Box>
      </form>
    </>
  )
}
