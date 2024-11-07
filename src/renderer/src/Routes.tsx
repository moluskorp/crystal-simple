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
import { Users } from './pages/Users'
import { NewUser } from './pages/Users/new'
import { User } from './pages/Users/User'
import { Store } from './pages/Store'
import { AdvancedSettings } from './pages/Store/AdvancedSettings'
import { Pdvs } from './pages/Pdvs'
import { NewPdv } from './pages/Pdvs/new'
import { Finishers } from './pages/Finishers'
import { NewFinisher } from './pages/Finishers/new'
import { Finisher } from './pages/Finishers/Finisher'
import { Pdv } from './pages/Pdvs/Pdv'
import { Loading } from './pages/Loading'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Loading />} />
          <Route path="/login" element={<Login />} />
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
            <Route path={PATH_DASHBOARD.user.root} element={<Users />} />
            <Route path={PATH_DASHBOARD.user.new} element={<NewUser />} />
            <Route
              path={`${PATH_DASHBOARD.user.root}/:id`}
              element={<User />}
            />
            <Route path={PATH_DASHBOARD.store.root} element={<Store />} />
            <Route
              path={PATH_DASHBOARD.store.settings}
              element={<AdvancedSettings />}
            />
            <Route path={PATH_DASHBOARD.pdv.root} element={<Pdvs />} />
            <Route path={PATH_DASHBOARD.pdv.new} element={<NewPdv />} />
            <Route path={`${PATH_DASHBOARD.pdv.root}/:id`} element={<Pdv />} />
            <Route
              path={PATH_DASHBOARD.finisher.root}
              element={<Finishers />}
            />
            <Route
              path={PATH_DASHBOARD.finisher.new}
              element={<NewFinisher />}
            />
            <Route
              path={`${PATH_DASHBOARD.finisher.root}/:id`}
              element={<Finisher />}
            />
          </Route>
        </>
      }
    />
  )
}
