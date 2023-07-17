import {
  Box,
  Card,
  Container,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material'
import Image from '@renderer/components/Image'
import Logo from '@renderer/components/Logo'
import { Page } from '@renderer/components/Page'
import useResponsive from '@renderer/hooks/useResponsive'
import { LoginForm } from './LoginForm'

/// ---------------------------------------------------------------
// STYLES

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}))

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

export function Login() {
  const smUp = useResponsive('up', 'sm')

  const mdUp = useResponsive('up', 'md')

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Não tem uma conta?{' '}
              <Typography variant="subtitle2">Comece agora</Typography>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Oi, Bem vindo de volta!
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              src="/assets/illustrations/illustration_login.png"
              alt="login"
            />
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Molter
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Insira seus detalhes abaixo para continuar
                </Typography>
              </Box>

              <Tooltip
                /* title={capitalCase(method)} */ title="oie"
                placement="right"
              >
                <Image
                  disabledEffect
                  alt="method"
                  src={`https://minimal-assets-api-dev.vercel.app/assets/icons/auth/ic_${'method'}.png`}
                  sx={{ width: 32, height: 32 }}
                />
              </Tooltip>
            </Stack>
            <LoginForm />
            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Não tem uma conta?{' '}
                <Typography variant="subtitle2">Registre-se agora</Typography>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  )
}
