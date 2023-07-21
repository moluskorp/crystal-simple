import {
  Box,
  Button,
  Card,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { ConfirmationDialog as ConfirmDelete } from '@renderer/components/ConfirmationDialog'
import Iconify from '@renderer/components/Iconify'
import { Link } from '@renderer/components/Link'
import { Page } from '@renderer/components/Page'
import TableEmptyRows from '@renderer/components/table/TableEmptyRows'
import TableHeadCustom from '@renderer/components/table/TableHeadCustom'
import TableNoData from '@renderer/components/table/TableNoData'
import TableSelectedActions from '@renderer/components/table/TableSelectedActions'
import useTable, { emptyRows, getComparator } from '@renderer/hooks/useTable'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { UserTableRow } from '@renderer/sections/@dashboard/user/UserTableRow'
import { UserTableToolbar } from '@renderer/sections/@dashboard/user/UserTableToolbar'
import { useEffect, useState } from 'react'
import { User } from 'src/shared/types/user'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-dom'
import { Scrollbar } from '@renderer/components/Scrollbar'

const TABLE_HEAD = [
  { id: 'name', label: 'Nome', align: 'left' },
  { id: 'user', label: 'Usuário', align: 'left' },
  { id: 'menu', align: 'center' },
]

function applySortFilter({
  tableData,
  comparator,
}: {
  tableData: User[]
  comparator: (a: any, b: any) => number
}) {
  const stabilizedThis = tableData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  const tableDataStabilized = stabilizedThis.map((el) => el[0])

  return tableDataStabilized
}

export function Users() {
  const [dialogConfirmDeleteOpen, setDialogConfirmDeleteOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [tableData, setTableData] = useState<User[]>([])
  const [usersFiltered] = useDebounce(filterName, 1000)
  const [userDelete, setUserDelete] = useState<User>({} as User)

  const {
    dense,
    order,
    orderBy,
    rowsPerPage,
    page,
    selected,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable()
  const navigate = useNavigate()

  useEffect(() => {
    const searchParams = {
      name: usersFiltered || '*',
      page,
      rows: rowsPerPage,
    }
    window.api.user.fetchList(searchParams).then((result) => {
      setTableData(result.data!)
    })
  }, [page, usersFiltered, rowsPerPage])

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
  })

  function handleFilterName(filteredName: string) {
    setFilterName(filteredName)
  }

  async function handleDeleteUser(id: number) {
    await window.api.user.delete({ id })
    const searchParams = {
      name: usersFiltered || '*',
      page,
      rows: rowsPerPage,
    }
    const users = await window.api.user.fetchList(searchParams)
    setTableData(users.data!)
  }

  function handleEditUser(id: number) {
    navigate(PATH_DASHBOARD.user.root + `/${id}`)
  }

  const isNotFound = !dataFiltered.length && !!filterName

  const denseHeight = dense ? 52 : 72

  return (
    <Page title="Usuários: Lista">
      <ConfirmDelete
        title="Exclusão de Usuário"
        message={`Tem certeza que deseja deletar o usuário ${userDelete.name} ? Depois não será possível restaurar ele! Deseja continuar ?`}
        open={dialogConfirmDeleteOpen}
        onAccept={() => {
          handleDeleteUser(userDelete.id)
        }}
        onRecuse={() => {}}
        setOpen={setDialogConfirmDeleteOpen}
      />
      <HeaderBreadcrumbs
        heading="Lista de Usuários"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Lista de Usuários' },
        ]}
        action={
          <Link to={PATH_DASHBOARD.user.new}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Novo usuário
            </Button>
          </Link>
        }
      />
      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterName}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData.length}
                onSelectAllRows={() => {}}
                actions={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={() => alert('delete')}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}
            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                order={order}
                orderBy={orderBy}
                rowCount={tableData.length}
                onSort={onSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(String(row.id))}
                      onSelectRow={() => alert(`Selecionado ${row.id}`)}
                      onDeleteRow={() => {
                        setUserDelete(row)
                        setDialogConfirmDeleteOpen(true)
                      }}
                      onEditRow={() => handleEditUser(row.id)}
                    />
                  ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(0, rowsPerPage, tableData.length)}
                />
                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Box sx={{ position: 'relative' }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              tableData.length === rowsPerPage
                ? -1
                : page * rowsPerPage + tableData.length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
          />
        </Box>
      </Card>
    </Page>
  )
}
