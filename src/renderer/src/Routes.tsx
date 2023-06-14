import { Router, Route } from 'electron-router-dom'
import { DashboardLayout } from './pages/layouts/dashboard'
import { Home } from './pages/Home'
import { Taxes } from './pages/Taxes'

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/taxes" element={<Taxes />} />
        </Route>
      }
    />
  )
}
