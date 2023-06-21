import { Router, Route } from 'electron-router-dom'
import { DashboardLayout } from './pages/layouts/dashboard'
import { Home } from './pages/Home'
import { Taxes } from './pages/Taxes'
import { Login } from './pages/Login'
import { Groups } from './pages/Groups'
import { NewGroup } from './pages/Groups/new'
import { Group } from './pages/Groups/Group'

export function Routes() {
  return (
    <Router
      main={
        <>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/dashboard/taxes" element={<Taxes />} />
            <Route path="/dashboard/groups" element={<Groups />} />
            <Route path="/dashboard/groups/:id" element={<Group />} />
            <Route path="/dashboard/groups/new" element={<NewGroup />} />
          </Route>
        </>
      }
    />
  )
}
