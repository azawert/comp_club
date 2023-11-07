import { Suspense } from 'react'
import { Loader } from '@mantine/core'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../../../../shared/config/route/route-config'

export const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map(({ element, path }) => (
          <Route element={element} path={path} key={path} />
        ))}
      </Routes>
    </Suspense>
  )
}
