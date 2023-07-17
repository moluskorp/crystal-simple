import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material'
import { GroupManager } from '@renderer/@types/groupManager'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import Iconify from '@renderer/components/Iconify'
import { Link } from '@renderer/components/Link'
import { Page } from '@renderer/components/Page'
import { Scrollbar } from '@renderer/components/Scrollbar'
import TableEmptyRows from '@renderer/components/table/TableEmptyRows'
import TableHeadCustom from '@renderer/components/table/TableHeadCustom'
import TableNoData from '@renderer/components/table/TableNoData'
import TableSelectedActions from '@renderer/components/table/TableSelectedActions'
import { useAlert } from '@renderer/hooks/Alert'
import useSettings from '@renderer/hooks/useSettings'
import useTable, { emptyRows, getComparator } from '@renderer/hooks/useTable'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import GroupTableRow from '@renderer/sections/@dashboard/group/GroupTableRow'
import GroupTableToolbar from '@renderer/sections/@dashboard/group/GroupTableToolbar'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

const TABLE_HEAD = [
  {
    id: 'name',
    label: 'Nome',
    align: 'left',
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
  },

  {
    id: 'actions',
  },
]

function applySortFilter({
  tableData,
  comparator,
}: {
  tableData: GroupManager[]
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

export function Groups() {
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

  const [tableData, setTableData] = useState<GroupManager[]>([])
  const [filterName, setFilterName] = useState('')
  const [groupsFiltered] = useDebounce(filterName, 1000)

  const navigate = useNavigate()
  const { showAlert } = useAlert()

  useEffect(() => {
    const searchParams = {
      name: groupsFiltered || '*',
      page,
      rows: rowsPerPage,
    }
    window.api.group
      .fetchList(searchParams)
      .then((result) => setTableData(result.data))
  }, [page, rowsPerPage, groupsFiltered])

  const handleFilterName = (filteredName: string) => {
    setFilterName(filteredName)
  }

  async function handleDeleteGroup(id: number) {
    const newTableData = tableData.map((data) => {
      if (data.id === id) {
        return { ...data, active: false }
      }
      return data
    })
    await window.api.group.delete({ id })
    setTableData(newTableData)
    showAlert('Grupo deletado com sucesso', 'error')
  }

  async function handleRestoreGroup(id: number) {
    let updatedGroup = {} as GroupManager
    const newTableData = tableData.map((data) => {
      if (data.id === id) {
        updatedGroup = { ...data, active: true }
        return updatedGroup
      }
      return data
    })
    await window.api.group.update(updatedGroup)
    setTableData(newTableData)
    showAlert('Grupo restaurado com sucesso', 'warning')
  }

  function handleEditGroup(id: number) {
    navigate(PATH_DASHBOARD.group.root + `/${id}`)
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
  })

  const isNotFound = !dataFiltered.length && !!filterName

  const denseHeight = dense ? 52 : 72

  const { themeStretch } = useSettings()

  return (
    <Page title="Grupos: Lista">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Lista de Grupos"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Lista de Grupos' },
          ]}
          action={
            <Link to={PATH_DASHBOARD.group.new}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Novo grupo
              </Button>
            </Link>
          }
        />
        <Card>
          <GroupTableToolbar
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
                      <IconButton
                        color="primary"
                        onClick={() => alert('delete')}
                      >
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
                      <GroupTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(String(row.id))}
                        onSelectRow={() => alert(`Selecionado ${row.id}`)}
                        onDeleteRow={() => handleDeleteGroup(row.id)}
                        onEditRow={() => handleEditGroup(row.id)}
                        onRestoreRow={() => handleRestoreGroup(row.id)}
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
      </Container>
    </Page>
  )
}
