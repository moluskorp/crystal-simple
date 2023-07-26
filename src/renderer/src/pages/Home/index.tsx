import { Box, Button, Card, Container, Typography } from '@mui/material'
import { Page } from '@renderer/components/Page'
import { useAlert } from '@renderer/hooks/Alert'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const { themeStretch } = useSettings()
  const navigate = useNavigate()
  const {showAlert} = useAlert()

  useEffect(() => {
    window.api.store.checkStoreExists().then(result => {
      if (result.type === 'error'){
        showAlert(result.message!, 'error')
        return
      }
      if (!result.exists) {
        navigate(PATH_DASHBOARD.store.root)
      }
    })
  },[])

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              },
            }}
          >
            <Typography variant="h1"> Hello Electron</Typography>
            <Button
              variant="contained"
              onClick={() => {
                navigate(PATH_DASHBOARD.taxes.root)
              }}
            >
              Abrir Tributação
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate(PATH_DASHBOARD.product.root)
              }}
            >
              Abrir Produtos
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate(PATH_DASHBOARD.user.root)
              }}
            >
              Abrir Usuários
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate(PATH_DASHBOARD.store.root)
              }}
            >
              Abrir Loja
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log('Gerando...')
              }}
            >
              Gerar Carga
            </Button>

          </Box>
        </Card>
      </Container>
    </Page>
  )
}
