import { Box, Card } from '@mui/material'
import { RHFTextField } from '@renderer/components/hook-form'

export function CardAddPdv() {
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
          name="number"
          label="Número do PDV"
          type="number"
          autoFocus
          required
        />
        <RHFTextField name="serial" label="Número de serie fiscal" />
      </Box>
    </Card>
  )
}
