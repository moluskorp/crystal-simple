import { Box, Button, Typography } from '@mui/material'
import { CopyToClipboard } from '@renderer/components/CopyToClipboard'
import { useNavigate } from 'react-router-dom'
import { ProductEan } from 'src/shared/types/productean'

type Props = {
  product: ProductEan
}

export function ProductFinished({ product }: Props) {
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography variant="h4">Produto: {product.prd_description}</Typography>
      <Typography variant="subtitle1">Cadastrado com sucesso</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>Código Ean: </Typography>
        <CopyToClipboard textToCopy={product.pean_ean} />
      </Box>
      <Button variant="contained" color="warning" onClick={handleBack}>
        Voltar
      </Button>
    </Box>
  )
}
