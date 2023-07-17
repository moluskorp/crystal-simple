import { MenuItem, TableCell, TableRow, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Iconify from '@renderer/components/Iconify'
import Label from '@renderer/components/Label'
import TableMoreMenu from '@renderer/components/table/TableMoreMenu'
import { fCurrency } from '@renderer/utils/formatNumber'
import { MouseEvent, useMemo, useState } from 'react'
import { Product } from 'src/shared/types/product'

type Props = {
  row: Product
  selected: boolean
  onEditRow: () => void
  onSelectRow: () => void
  onDeleteRow: () => void
}

export default function ProductTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
}: Props) {
  const theme = useTheme()

  const newRow = useMemo(() => {
    return {
      ...row,
      price1: fCurrency(row.price1),
    }
  }, [row])

  const { description, ncm, price1, active } = newRow

  const [openMenu, setOPenMenuActions] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setOPenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOPenMenuActions(null)
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {description}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {ncm}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {price1}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={active ? 'success' : 'error'}
          sx={{ textTransform: 'capitalize' }}
        >
          {active ? 'Ativo' : 'Inativo'}
        </Label>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              {active && (
                <MenuItem
                  onClick={() => {
                    onDeleteRow()
                    handleCloseMenu()
                  }}
                  sx={{ color: active ? 'error.main' : 'warning.darker' }}
                >
                  <>
                    <Iconify icon="eva:trash-2-outline" />
                    Excluir
                  </>
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  onEditRow()
                  handleCloseMenu()
                }}
              >
                {active && (
                  <>
                    <Iconify icon="eva:edit-fill" />
                    Editar
                  </>
                )}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
