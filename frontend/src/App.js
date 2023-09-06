import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './layout/Home'
import Error from './layout/Error'
import Dashboard from './layout/Dashboard'
import AddInvoice from './components/AddInvoice'
import Login from './layout/Login'
import AllInvoices from './components/AllInvoices'
import UpdateStatus from './components/admin/UpdateStatus'
import ManageUser from './components/ManageUser'
import Reports from './components/Reports'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './redux/reducers/AuthReducer'
import jwt_decode from 'jwt-decode'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (document.cookie !== '') {
      const data = jwt_decode(document.cookie.split('=')[1])
      dispatch(
        authActions.storeAuth({
          username: data.username,
          role: data.role,
          isLogged: true
        })
      )
      console.log(data)
    }
  }, [dispatch])

  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/dashboard' element={<Dashboard />} />
      <Route exact path='/dashboard/create' element={<AddInvoice />} />
      <Route exact path='/dashboard/invoices' element={<AllInvoices />} />
      <Route exact path='/dashboard/manage' element={<ManageUser />} />
      <Route exact path='/dashboard/reports' element={<Reports />} />
      <Route
        exact
        path='/dashboard/invoices/status/:id'
        element={<UpdateStatus />}
      />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='*' element={<Error />} />
    </Routes>
  )
}

export default App
