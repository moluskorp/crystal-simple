import { Card, Container, Typography } from '@mui/material'
import { Page } from '@renderer/components/Page'
import { useAlert } from '@renderer/hooks/Alert'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export function Home() {
  const { themeStretch } = useSettings()
  const navigate = useNavigate()
  const { showAlert } = useAlert()

  const data = [
    { year: 2010, valor: 10 },
    { year: 2011, valor: 15 },
    { year: 2012, valor: 20 },
    { year: 2013, valor: 25 },
    { year: 2014, valor: 30 },
    { year: 2015, valor: 35 },
    { year: 2016, valor: 40 },
  ]

  useEffect(() => {
    window.api.store.checkStoreExists().then((result) => {
      if (result.type === 'error') {
        showAlert(result.message!, 'error')
        return
      }
      if (!result.exists) {
        navigate(PATH_DASHBOARD.store.root)
      }
    })
  }, [])

  return (
    <Page
      title="Home"
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        margin: 'auto',
      }}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Container
          sx={{ display: 'flex', flex: 1, flexDirection: 'row', gap: 3 }}
        >
          <Card
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: 260,
            }}
          >
            <Typography variant="subtitle1">Quantidade de vendas</Typography>
            <Typography mt={0.5}>10</Typography>
          </Card>
          <Card
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: 260,
            }}
          >
            <Typography variant="subtitle1">Valor de vendas</Typography>
            <Typography mt={0.5}>R$ 100.000,00</Typography>
          </Card>
          <Card
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: 260,
            }}
          >
            <Typography variant="subtitle1">
              Quantidade Cancelamentos
            </Typography>
            <Typography mt={0.5}>10</Typography>
          </Card>
        </Container>
        <Container
          sx={{ display: 'flex', flex: 1, flexDirection: 'row', gap: 3, mt: 3 }}
        >
          <Card
            sx={{
              p: 3,
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="subtitle1">Vendas</Typography>
            <ResponsiveContainer
              width="100%"
              height={300}
              style={{ marginTop: '8px' }}
            >
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="valor" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Container>
      </Container>
    </Page>
  )
}
