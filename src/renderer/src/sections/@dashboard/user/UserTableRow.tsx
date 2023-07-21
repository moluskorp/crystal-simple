import { MenuItem, TableCell, TableRow, Typography } from '@mui/material'
import Iconify from '@renderer/components/Iconify'
import TableMoreMenu from '@renderer/components/table/TableMoreMenu'
import { MouseEvent, useState } from 'react'
import { User } from 'src/shared/types/user'

interface Props {
  row: User
  selected: boolean
  onEditRow: () => void
  onSelectRow: () => void
  onDeleteRow: () => void
}

export function UserTableRow({ row, selected, onEditRow, onDeleteRow }: Props) {
  const { name, username } = row

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
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {username}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow()
                  handleCloseMenu()
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon="eva:trash-2-outline" />
                Excluir
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow()
                  handleCloseMenu()
                }}
              >
                <Iconify icon="eva:edit-fill" />
                Editar
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  )
}
