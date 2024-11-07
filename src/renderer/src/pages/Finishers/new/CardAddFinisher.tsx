import { Box, Card } from '@mui/material'
import { RHFTextField } from '@renderer/components/hook-form'

export function CardAddFinisher() {
  return (
    <Card sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          width: '20rem',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <RHFTextField
          name="code"
          label="Código da finalizadora"
          type="number"
          autoFocus
          required
        />
        <RHFTextField
          name="description"
          label="Nome da finalizadora"
          required
        />
      </Box>
    </Card>
  )
}
