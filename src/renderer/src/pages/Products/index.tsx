import {
  Button,
  Card,
  Container,
  IconButton,
  TableBody,
  TableContainer,
  Tooltip,
  Table,
} from '@mui/material'
import HeaderBreadcrumbs from '@renderer/components/HeaderBreadcrumbs'
import { Page } from '@renderer/components/Page'
import useSettings from '@renderer/hooks/useSettings'
import { PATH_DASHBOARD } from '@renderer/routes/paths'
import { Link } from '@renderer/components/Link'
import Iconify from '@renderer/components/Iconify'
import ProductTableToolbar from '@renderer/sections/@dashboard/product/ProductTableToolbar'
import { useState } from 'react'
import Scrollbar from '@renderer/components/Scrollbar'
import useTable, { getComparator } from '@renderer/hooks/useTable'
import TableSelectedActions from '@renderer/components/table/TableSelectedActions'

import TableHeadCustom from '@renderer/components/table/TableHeadCustom'

const TABLE_HEAD = [{ id: 'name', label: 'Nome', align: 'left' }]

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
  const [filterName, setFilterName] = useState('')
  const [tableData, setTableData] = useState<Product[]>([])

  const { themeStretch } = useSettings()

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
        {/* <Card>
          <ProductTableToolbar
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
                  {dataFiltered.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage).map(row => (
                    <
                  ))}
                </TableBody>
            </TableContainer>
          </Scrollbar>
        </Card> */}
      </Container>
    </Page>
  )
}
