import { Box, Button } from '@mui/material'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
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
      <Link to={PATH_DASHBOARD.product.root}>
        <Button variant="contained" size="large">
          Produtos
        </Button>
      </Link>
    </Box>
  )
}
