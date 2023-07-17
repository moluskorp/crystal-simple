import { Router, Route } from 'electron-router-dom'
import { DashboardLayout } from './pages/layouts/dashboard'
import { Home } from './pages/Home'
import { Taxes } from './pages/Taxes'
import { Login } from './pages/Login'
import { Groups } from './pages/Groups'
import { NewGroup } from './pages/Groups/new'
import { Group } from './pages/Groups/Group'
import { PATH_DASHBOARD } from './routes/paths'
import { Products } from './pages/Products'
import { NewProduct } from './pages/Products/new'
import { NcmAddTaxe } from './pages/Taxes/NcmAddTaxe'
import { Product } from './pages/Products/Product'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/taxes" element={<Taxes />} />
            <Route
              path={PATH_DASHBOARD.taxes.addByNcm}
              element={<NcmAddTaxe />}
            />
            <Route path="/dashboard/groups" element={<Groups />} />
            <Route path="/dashboard/groups/:id" element={<Group />} />
            <Route path="/dashboard/groups/new" element={<NewGroup />} />
            <Route path={PATH_DASHBOARD.product.root} element={<Products />} />
            <Route path={PATH_DASHBOARD.product.new} element={<NewProduct />} />
            <Route
              path={`${PATH_DASHBOARD.product.root}/:id`}
              element={<Product />}
            />
          </Route>
        </>
      }
    />
  )
}
