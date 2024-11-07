import { Page } from '@renderer/components/Page'
import { useAlert } from '@renderer/hooks/Alert'
import useTable, { emptyRows, getComparator } from '@renderer/hooks/useTable'
import { ConfirmationDialog as ConfirmDelete } from '@renderer/components/ConfirmationDialog'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Finisher } from 'src/shared/types/finisher'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Link } from '@renderer/components/Link'
import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material'
import Iconify from '@renderer/components/Iconify'
import { Scrollbar } from '@renderer/components/Scrollbar'
import TableHeadCustom from '@renderer/components/table/TableHeadCustom'
import { FinisherTableRow } from '@renderer/sections/@dashboard/finisher/FinisherTableRow'
import TableEmptyRows from '@renderer/components/table/TableEmptyRows'
import TableNoData from '@renderer/components/table/TableNoData'

const TABLE_HEAD = [
  {
    id: 'code',
    label: 'Código',
    align: 'left',
  },
  {
    id: 'description',
    label: 'Descrição',
    align: 'left',
  },
  {
    id: 'actions',
  },
]

function applySortFilter({
  tableData,
  comparator,
}: {
  tableData: Finisher[]
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

export function Finishers() {
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

  const [dialogConfirmDeleteOpen, setDialogConfirmDeleteOpen] = useState(false)
  const [tableData, setTableData] = useState<Finisher[]>([])
  const [finisherDelete, setFinisherDelete] = useState<Finisher>({} as Finisher)

  const navigate = useNavigate()
  const { showAlert } = useAlert()

  useEffect(() => {
    window.api.finisher.fetchAll({ rowsPerPage, page }).then((result) => {
      if (result.type === 'error') {
        showAlert(result.message!, 'error')
        return
      }
      setTableData(result.data!)
    })
  }, [showAlert, rowsPerPage, page])

  async function handleDeleteFinisher(id: number) {
    const result = await window.api.finisher.delete({ id })
    if (result.type === 'error') {
      showAlert(result.message!, 'error')
      return
    }
    const newTableData = tableData.filter((finisher) => finisher.id !== id)
    setTableData(newTableData)
    showAlert('Finalizadora deletada com sucesso')
  }

  async function handleEditFinisher(id: number) {
    navigate(PATH_DASHBOARD.finisher.root + `/${id}`)
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
  })

  const isNotFound = !dataFiltered.length

  const denseHeight = dense ? 52 : 72

  return (
    <Page title="Finalizadora: Lista">
      <ConfirmDelete
        title="Exclusão de Finalizadora"
        message={`Tem certeza que deseja deletar a finalizadora: ${finisherDelete.description}? Depois não será possível restaurarar! Deseja continuar ?`}
        open={dialogConfirmDeleteOpen}
        onAccept={() => {
          handleDeleteFinisher(finisherDelete.id)
          setFinisherDelete({} as Finisher)
        }}
        onRecuse={() => {
          setFinisherDelete({} as Finisher)
        }}
        setOpen={setDialogConfirmDeleteOpen}
      />
      <HeaderBreadcrumbs
        heading="Lista de finalizadoras"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Lista de finalizadoras' },
        ]}
        action={
          <Link to={PATH_DASHBOARD.finisher.new}>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Nova finalizadora
            </Button>
          </Link>
        }
      />
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                order={order}
                orderBy={orderBy}
                rowCount={tableData.length}
                onSort={onSort}
              />
              <TableBody>
                {tableData
                  .slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <FinisherTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(String(row.id))}
                      onSelectRow={() => alert(`Selecionado ${row.id}`)}
                      onDeleteRow={() => {
                        setFinisherDelete(row)
                        setDialogConfirmDeleteOpen(true)
                      }}
                      onEditRow={() => handleEditFinisher(row.id)}
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
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
