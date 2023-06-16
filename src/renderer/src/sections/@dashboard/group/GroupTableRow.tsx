import { MouseEvent, useState } from 'react'
// @mui
import { useTheme } from '@mui/material/styles'
import { TableRow, TableCell, Typography, MenuItem } from '@mui/material'
// @types
import { GroupManager } from '../../../@types/groupManager'
// components
import Label from '../../../components/Label'
import Iconify from '../../../components/Iconify'
import TableMoreMenu from '../../../components/table/TableMoreMenu'

// ----------------------------------------------------------------------

type Props = {
  row: GroupManager
  selected: boolean
  onEditRow: () => void
  onSelectRow: () => void
  onDeleteRow: () => void
  onRestoreRow: () => void
}

export default function GroupTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
  onRestoreRow,
}: Props) {
  const theme = useTheme()

  const { name, active } = row

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null)

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {name}
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
              {active ? (
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
              ) : (
                <MenuItem
                  onClick={() => {
                    onRestoreRow()
                    handleCloseMenu()
                  }}
                  sx={{ color: active ? 'error.main' : 'warning.darker' }}
                >
                  <>
                    <Iconify icon="eva:backspace-outline" />
                    Restaurar
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
