import { Box, Button, Card, Grid } from '@mui/material'
import Iconify from '@renderer/components/Iconify'
import { RHFTextField } from '@renderer/components/hook-form'

export function CardAdvancedSettings() {
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 3, mt: 2 }}>
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
          <RHFTextField
            name="amountPdv"
            label="Quantidade de PDVS"
            required
            // mask={Number}
            sx={{ gridColumn: '1/1' }}
          />
          <RHFTextField name="folderPdv" disabled sx={{ gridColumn: '1/3' }} />
          <Button>
            <Iconify icon={'material-symbols:folder-outline'} />
          </Button>
        </Box>
      </Card>
    </Grid>
  )
}
