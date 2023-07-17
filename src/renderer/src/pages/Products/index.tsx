import {
  Button,
  Card,
  Container,
  IconButton,
  TableBody,
  TableContainer,
  Tooltip,
  Table,
  FormControlLabel,
  Box,
  TablePagination,
  Switch,
} from '@mui/material'
import { ConfirmationDialog as ConfirmDelete } from '@renderer/components/ConfirmationDialog'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { Link } from '@renderer/components/Link'
import Iconify from '@renderer/components/Iconify'
import ProductTableToolbar from '@renderer/sections/@dashboard/product/ProductTableToolbar'
import { useEffect, useState } from 'react'
import { Scrollbar } from '@renderer/components/Scrollbar'
import useTable, { emptyRows, getComparator } from '@renderer/hooks/useTable'
import TableSelectedActions from '@renderer/components/table/TableSelectedActions'

import TableHeadCustom from '@renderer/components/table/TableHeadCustom'
import ProductTableRow from '@renderer/sections/@dashboard/product/ProductTableRow'
import TableEmptyRows from '@renderer/components/table/TableEmptyRows'
import TableNoData from '@renderer/components/table/TableNoData'
import { Product } from 'src/shared/types/product'
import { useDebounce } from 'use-debounce'
import { useNavigate } from 'react-router-dom'

const TABLE_HEAD = [
  { id: 'name', label: 'Nome', align: 'left' },
  {
    id: 'ncm',
    label: 'NCM',
    align: 'left',
  },
  {
    id: 'price1',
    label: 'Preço',
    align: 'left',
  },
  {
    id: 'active',
    label: 'Ativo',
    align: 'center',
  },
  {
    id: 'menu',
    align: 'center',
  },
]

function applySortFilter({
  tableData,
  comparator,
}: {
  tableData: Product[]
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

export function Products() {
  const [dialogConfirmDeleteOpen, setDialogConfirmDeleteOpen] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [tableData, setTableData] = useState<Product[]>([])
  const [productsFiltered] = useDebounce(filterName, 1000)
  const [productDelete, setProductDelete] = useState<Product>({} as Product)

  const { themeStretch } = useSettings()
  const navigate = useNavigate()

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

  useEffect(() => {
    const searchParams = {
      name: productsFiltered || '*',
      page,
      rows: rowsPerPage,
    }
    window.api.product.fetchList(searchParams).then((result) => {
      setTableData(result.data!)
    })
  }, [page, productsFiltered, rowsPerPage])

  async function handleDeleteProduct(id: number) {
    await window.api.product.delete({ id })
    const searchParams = {
      name: productsFiltered || '*',
      page,
      rows: rowsPerPage,
    }
    const products = await window.api.product.fetchList(searchParams)
    setTableData(products.data!)
  }

  function handleEditProduct(id: number) {
    navigate(PATH_DASHBOARD.product.root + `/${id}`)
  }

  const handleFilterName = (filteredName: string) => {
    setFilterName(filteredName)
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
  })

  const isNotFound = !dataFiltered.length && !!filterName

  const denseHeight = dense ? 52 : 72

  return (
    <Page title="Produtos: Lista">
      <ConfirmDelete
        title="Exclusão de Produto"
        message={`Tem certeza que deseja deletar o produto ${productDelete.description} ? Depois não será possível restaurar ele! Deseja continuar ?`}
        open={dialogConfirmDeleteOpen}
        onAccept={() => {
          handleDeleteProduct(productDelete.id)
        }}
        onRecuse={() => {}}
        setOpen={setDialogConfirmDeleteOpen}
      />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Lista de Produtos"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Lista de Produtos' },
          ]}
          action={
            <Link to={PATH_DASHBOARD.product.new}>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                Novo produto
              </Button>
            </Link>
          }
        />
        <Card>
          <ProductTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
          />
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
                    <ProductTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(String(row.id))}
                      onSelectRow={() => alert(`Selecionado ${row.id}`)}
                      onDeleteRow={() => {
                        setProductDelete(row)
                        setDialogConfirmDeleteOpen(true)
                      }}
                      onEditRow={() => handleEditProduct(row.id)}
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
