import { Box, Typography } from '@mui/material'
import { useAlert } from '@renderer/hooks/Alert'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Loading() {
  const { showAlert } = useAlert()
  const navigate = useNavigate()

  useEffect(() => {
    window.api.migration.run().then((result) => {
      if (result.type === 'error') {
        showAlert(result.message!)
        return
      }
      navigate('/login')
    })
    // eslint-disable-next-line
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        margin: 'auto',
        gap: 2,
      }}
    >
      <Typography variant="h2">Carregando banco de dados</Typography>
      <Typography variant="h3">
        Talves essa ação demore pouco mais que 2 minutos
      </Typography>
    </Box>
  )
}
