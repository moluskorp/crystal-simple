import { Router, Route } from 'electron-router-dom'
import { DashboardLayout } from './pages/layouts/dashboard'
import { Home } from './pages/Home'
import { Taxes } from './pages/Taxes'
import { Login } from './pages/Login'
import { Groups } from './pages/Groups'

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
          </Route>
        </>
      }
    />
  )
}
