import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import About from './pages/About'
import Home from './pages/Home'
import Store from './pages/Store'
import NotFound from './pages/NotFound'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginPage from './pages/LoginPage'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import DetailsOrder from './pages/DetailsOrder'
import { Provider } from 'react-redux'
import store from './store'
import PrivateRoutes from './components/PrivateRoutes'
import Services from './pages/Services'
import ProductListAdmin from './pages/admin/ProductListAdmin'
import AdminPrivateRoutes from './components/AdminPrivateRoutes'
import OrderListAdmin from './pages/admin/OrderListAdmin'
import EditProductScreen from './pages/admin/EditProductScreen'
import UsersAdminScreen from './pages/admin/UsersAdminScreen'
import UserListAdmin from './pages/admin/UserListAdmin'
import ContactAdmin from './pages/ContactAdmin'
import ComponentScreen from './pages/ComponentScreen'
import ComponentAdmin from './pages/admin/ComponentAdmin'

// Create a router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/Contact',
        element: <ContactAdmin />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/components',
        element: <ComponentScreen />,
      },
      {
        path: '/store',
        element: <Store />,
      },
      {
        path: '/search/:keyword',
        element: <Store />,
      },
      {
        path: '/store/page/:pageNumber',
        element: <Store />,
      },
      {
        path: '/search/:keyword/page/:pageNumber',
        element: <Store />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },

      {
        path: '',
        element: <PrivateRoutes />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/shipping',
            element: <Shipping />,
          },
          {
            path: '/payment',
            element: <Payment />,
          },
          {
            path: '/placeorder',
            element: <PlaceOrder />,
          },
          {
            path: '/order/:id',
            element: <DetailsOrder />,
          },
        ],
      },
      {
        path: '',
        element: <AdminPrivateRoutes />,
        children: [
          {
            path: 'admin/orderlistadmin',
            element: <OrderListAdmin />,
          },
          {
            path: 'admin/orderlist',
            element: <OrderListAdmin />,
          },
          {
            path: 'admin/orders',
            element: <OrderListAdmin />,
          },
          {
            path: 'admin/productlistadmin',
            element: <ProductListAdmin />,
          },
          {
            path: 'admin/products',
            element: <ProductListAdmin />,
          },
          {
            path: 'admin/product/:id/edit',
            element: <EditProductScreen />,
          },
          {
            path: 'admin/users',
            element: <UsersAdminScreen />,
          },
          {
            path: 'admin/userlist',
            element: <UsersAdminScreen />,
          },
          {
            path: 'admin/user/:id/edit',
            element: <UserListAdmin />,
          },
          {
            path: 'admin/components',
            element: <ComponentAdmin />,
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
)