import { Stack, InputAdornment, TextField } from '@mui/material'
import Iconify from '../../../components/Iconify'

type Props = {
  filterName: string
  onFilterName: (value: string) => void
}

export default function GroupTableToolbar({ filterName, onFilterName }: Props) {
  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ py: 2.5, px: 1 }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Buscar grupo..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          ),
          /* endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  type="submit"
                >
                  Novo Cliente
                </Button>
              </InputAdornment>
            ), */
        }}
      />
    </Stack>
  )
}
