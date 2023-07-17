import { Box, Button, Card, Container, Typography } from '@mui/material'
import { Page } from '@renderer/components/Page'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const { themeStretch } = useSettings()
  const navigate = useNavigate()

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
                window.api.testCrypt.create()
              }}
            >
              Teste Crypt
            </Button>
          </Box>
        </Card>
      </Container>
    </Page>
  )
}
