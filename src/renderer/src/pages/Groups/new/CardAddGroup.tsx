import { LoadingButton } from '@mui/lab'
import { Box, Card } from '@mui/material'
import { RHFTextField } from '@renderer/components/hook-form'
import { useAlert } from '@renderer/hooks/Alert'
import { FormEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export function CardAddGroup() {
  const { showAlert } = useAlert()
  const { reset, getValues } = useFormContext<{ name: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function handleReset() {
    reset()
    navigate(-1)
  }

  async function finishRegistratio(event: FormEvent) {
    try {
      event.preventDefault()
      setLoading(true)
      const values = getValues()
      const response = await window.api.group.create(values)
      if (response.type === 'error') {
        showAlert(response.message!, 'error')
        return
      }
      showAlert('Grupo cadastrado com sucesso')
      handleReset()
    } catch (err: any) {
      showAlert(err, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card sx={{ p: 3 }}>
      <form onSubmit={finishRegistratio}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RHFTextField
            name="name"
            label="Nome"
            required
            autoFocus
            fullWidth={false}
            sx={{ width: '30rem' }}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <LoadingButton
            loading={loading}
            variant="contained"
            type="submit"
            color="success"
            sx={{ ml: 'auto', mt: '2rem' }}
          >
            Cadastrar
          </LoadingButton>
        </Box>
      </form>
    </Card>
  )
}
