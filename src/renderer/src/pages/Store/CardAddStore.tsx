import { Typography, Box, Card, Grid } from '@mui/material'

import { RHFTextField } from '@renderer/components/hook-form'

export function CardAddStore() {
  return (
    <Grid item xs={12} md={12}>
      <Typography variant="h4">Informações Básicas</Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
          }}
        >
          <RHFTextField
            name="name"
            label="Nome empresárial"
            required
            autoFocus
            sx={{ gridColumn: '1/5' }}
          />
          <RHFTextField
            name="storeAlias"
            label="Nome fantasia"
            required
            sx={{ gridColumn: '1/5' }}
          />
          <RHFTextField
            name="cnpj"
            label="CNPJ"
            required
            sx={{ gridColumn: '1/1' }}
          />
          <RHFTextField
            name="ie"
            mask={Number}
            label="Inscrição Estadual"
            required
          />
          <RHFTextField name="pis" label="Valor do PIS" required />
          <RHFTextField
            name="cofins"
            mask={Number}
            label="Valor do COFINS"
            required
          />
        </Box>
      </Card>
      <Typography variant="h4">Endereço</Typography>
      <Card sx={{ p: 3, mt: 2 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
            },
          }}
        >
          <RHFTextField
            name="postalcode"
            placeholder="CEP"
            required
            mask="00000-000"
          />
          <RHFTextField name="street" placeholder="Rua" required />
          <RHFTextField name="number" placeholder="Número" />
          <RHFTextField name="district" placeholder="Bairro" required />
          <RHFTextField name="city" placeholder="Cidade" required />
          <RHFTextField name="state" placeholder="Estado" required />
        </Box>
      </Card>
    </Grid>
  )
}
