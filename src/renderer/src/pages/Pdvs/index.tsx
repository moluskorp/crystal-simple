import { Page } from '@renderer/components/Page'
import useTable, { emptyRows } from '@renderer/hooks/useTable'
import { ConfirmationDialog as ConfirmDelete } from '@renderer/components/ConfirmationDialog'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pdv as IPdv } from 'src/shared/types/pdv'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
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
import Iconify from '@renderer/components/Iconify'
import { Scrollbar } from '@renderer/components/Scrollbar'
import TableSelectedActions from '@renderer/components/table/TableSelectedActions'
import TableHeadCustom from '@renderer/components/table/TableHeadCustom'
import TableEmptyRows from '@renderer/components/table/TableEmptyRows'
import TableNoData from '@renderer/components/table/TableNoData'
import { PdvTableRow } from '@renderer/sections/@dashboard/pdv/PdvTableRow'
import { Link } from '@renderer/components/Link'
import { useAlert } from '@renderer/hooks/Alert'
import { LoadingButton } from '@mui/lab'

const TABLE_HEAD = [
  { id: 'number', name: 'Número', align: 'left' },
  { id: 'serial', name: 'Número de Série', align: 'left' },
  { id: 'menu', align: 'center' },
]

export function Pdvs() {
  const [dialogConfirmDeleteOpen, setDialogConfirmDeleteOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tableData, setTableData] = useState<IPdv[]>([])
  const [pdvDelete, setPdvDelete] = useState<IPdv>({} as IPdv)
  const { showAlert } = useAlert()

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
    window.api.pdv.fetchAll().then((result) => {
      setTableData(result.data!)
    })
  }, [])

  async function handleDeletePdv(id: number) {
    try {
      await window.api.pdv.delete({ id })
      const newTable = tableData.filter((row) => row.id !== id)
      setTableData(newTable)
    } catch (e: any) {
      showAlert(e.message, 'error')
    }
  }

  async function handleEditPdv(id: number) {
    navigate(PATH_DASHBOARD.pdv.root + `/${id}`)
  }

  async function generateFile() {
    try {
      setLoading(true)
      const result = await window.api.fx.generate()
      if (result.type === 'error') {
        showAlert(result.message!, 'error')
        return
      }
      showAlert('Carga gerada com sucesso')
    } catch (e: any) {
      showAlert(e.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const isNotFound = !tableData.length

  const denseHeight = dense ? 52 : 72

  return (
    <Page title="Pdvs: Lista">
      <ConfirmDelete
        title="Exclusão de PDV"
        message={`Tem certeza que deseja deletar o pdv ${pdvDelete.number} ? Depois não será possível restarurar ele! Deseja continuar ?`}
        open={dialogConfirmDeleteOpen}
        onAccept={() => {
          handleDeletePdv(pdvDelete.id)
        }}
        onRecuse={() => {}}
        setOpen={setDialogConfirmDeleteOpen}
      />
      <HeaderBreadcrumbs
        heading="Lista de PDVS"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Lista de Pdvs' },
        ]}
        action={
          <Box sx={{ display: 'flex', gap: 2 }}>
            <LoadingButton
              variant="contained"
              startIcon={<Iconify icon="tabler:12-hours" />}
              loading={loading}
              onClick={generateFile}
            >
              Gerar carga
            </LoadingButton>
            <Link to={PATH_DASHBOARD.pdv.new}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Novo PDV
              </Button>
            </Link>
          </Box>
        }
      />
      <Card>
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
                    <IconButton color="primary" onClick={() => alert('Delete')}>
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
                {tableData
                  .slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PdvTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(String(row.id))}
                      onSelectRow={() => alert(`Selecionado ${row.id}`)}
                      onDeleteRow={() => {
                        setPdvDelete(row)
                        setDialogConfirmDeleteOpen(true)
                      }}
                      onEditRow={() => handleEditPdv(row.id)}
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
