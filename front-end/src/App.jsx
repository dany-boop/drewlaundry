import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Login, NotFound } from './pages'
import { Dashboard, Member, Outlet, Package, Transaction, User } from './pages/admin'
import { Dashboard as DashboardCashier, Member as MemberCashier, Transaction as TransactionCashier } from './pages/cashier'
import { Dashboard as DashboardOwner } from './pages/owner'

// Outlet
import { AddOutlet, EditOutlet } from './components/admin/outlet'

// Package
import { AddPackage, EditPackage } from './components/admin/package'

// Member
import { AddMember, EditMember } from './components/admin/member'
import { AddMember as AddMemberCashier, EditMember as EditMemberCashier } from './components/cashier/member'

// User
import { EditAdmin, Register } from './components/admin/user'

// Transaction
import { EditTransaction } from './components/admin/transaction'
import { EditTransaction as EditTransactionCashier } from './components/cashier/transaction'
import { EditTransaction as EditTransactionOwner } from './components/owner/transaction'


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      {/* Admin Side Route */}
      <Route path='/admin/dashboard' element={<Dashboard />} />

      <Route path='/admin/outlet' element={<Outlet />} />
      <Route path='/admin/outlet/add' element={<AddOutlet />} />
      <Route path='/admin/outlet/edit/*' element={<EditOutlet />} />

      <Route path='/admin/package' element={<Package />} />
      <Route path='/admin/package/add' element={<AddPackage />} />
      <Route path='/admin/package/edit/*' element={<EditPackage />} />

      <Route path='/admin/member' element={<Member />} />
      <Route path='/admin/member/add' element={<AddMember />} />
      <Route path='/admin/member/edit/*' element={<EditMember />} />

      <Route path='/admin/transaction/add' element={<Transaction />} />
      <Route path='/admin/transaction/edit/*' element={<EditTransaction />} />

      <Route path='/admin/user' element={<User />} />
      <Route path='/admin/user/add' element={<Register />} />
      <Route path='/admin/user/edit/*' element={<EditAdmin />} />

      {/* Cashier Side Route */}
      <Route path='/cashier/dashboard' element={<DashboardCashier />} />

      <Route path='/cashier/member' element={<MemberCashier />} />
      <Route path='/cashier/member/add' element={<AddMemberCashier />} />
      <Route path='/cashier/member/edit/*' element={<EditMemberCashier />} />

      <Route path='/cashier/transaction/add' element={<TransactionCashier />} />
      <Route path='/cashier/transaction/edit/*' element={<EditTransactionCashier />} />

      {/* Owner Side Route */}
      <Route path='/owner/dashboard' element={<DashboardOwner />} />
      <Route path='/owner/transaction/detail/*' element={<EditTransactionOwner />} />

      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default App