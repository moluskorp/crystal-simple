import { Box, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/dashboard')}
      >
        Logar
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/dashboard/groups')}
      >
        Grupo
      </Button>
      <Link to="/dashboard">Oie</Link>
    </Box>
  )
}
