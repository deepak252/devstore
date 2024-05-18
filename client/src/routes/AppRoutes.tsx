import DefaultLayout from '@/components/layout/DefaultLayout'
import HomePage from '@/pages/Home'
import { Route, Routes } from 'react-router-dom'

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
