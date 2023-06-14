import { Box, Button } from '@mui/material'
import { FormEvent, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { RHFTextField } from '../../../components/hook-form'
import { usePages } from '../../../contexts/PagesContext'

interface Props {
  setNcm: (value: string) => void
}

export function TaxeNcm({ setNcm }: Props) {
  const { nextPage } = usePages()
  const { getValues, setError, clearErrors } = useFormContext()

  const handleNextPage = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      clearErrors()
      const ncm = getValues('ncm')
      if (ncm.length !== 8) {
        setError('ncm', { message: 'Ncm em formato incorreto' })
        return
      }

      setNcm(ncm)
      nextPage()
    },
    [nextPage, getValues, setNcm, setError, clearErrors],
  )

  return (
    <form onSubmit={handleNextPage}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RHFTextField
          name="ncm"
          label="NCM"
          mask="00000000"
          required
          autoFocus
          fullWidth={false}
          sx={{ width: '20rem' }}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Button
          variant="contained"
          type="submit"
          color="success"
          sx={{ ml: 'auto', mt: '2rem' }}
        >
          Next
        </Button>
      </Box>
    </form>
  )
}
