import {RouterProvider, createBrowserRouter, useRouteError} from 'react-router-dom'

import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import AccessDenied from './Pages/AccessDenied.jsx'
import Profil from './Pages/Profil.jsx'
import Register from './Pages/Register.jsx'
import Wishlist from './Pages/Wishlist.jsx'
import Collection from './Pages/Collection.jsx'

import PrivateRoute from './PrivateRoute.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home />, errorElement: <PageError /> },
  { path: '/accessdenied', element: <AccessDenied /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/wishlist', element: <PrivateRoute element={<Wishlist />} /> },
  { path: '/collection', element: <PrivateRoute element={<Collection />} /> },
  { path: '/profil', element: <PrivateRoute element={<Profil />} /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

// --------- Page d'annonce d'url incorrect --------------
function PageError() {
  const error = useRouteError()
  return (
    <>
      <h1>Désolé, la page auquel vous essayez d'accéder est indisponible ou n'existe pas</h1>
      <p>
        {error?.error?.toString() ?? error?.toString()}
      </p>
    </>
  )
}

export default App
