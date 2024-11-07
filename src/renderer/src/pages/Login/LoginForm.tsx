import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material'
import Iconify from '@renderer/components/Iconify'
import { FormProvider, RHFTextField } from '@renderer/components/hook-form'
import { useAuth } from '@renderer/hooks/useAuth'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as zod from 'zod'

const loginFormValidationSchema = zod.object({
  username: zod.string().min(1, 'Usuário obrigatório'),
  password: zod.string().min(1, 'Senha obrigatório'),
})

type LoginFormData = zod.infer<typeof loginFormValidationSchema> & {
  afterSubmit: string
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const { signIn } = useAuth()

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const {
    setError,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods

  useEffect(() => {
    window.api.is.dev().then((dev) => {
      if (dev) {
        setValue('username', 'moluskorp')
        setValue('password', 'Moluskete')
      }
    })
    // eslint-disable-next-line
  }, [])

  async function onSubmit({ username, password }: LoginFormData) {
    try {
      await signIn({ username, password })
      navigate(PATH_DASHBOARD.root)
    } catch (err: any) {
      setError('afterSubmit', { ...err, message: err.message })
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="username" label="Usuário" />
        <RHFTextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ mt: 2 }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  )
}
