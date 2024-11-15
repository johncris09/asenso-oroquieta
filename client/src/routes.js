import React from 'react'

const Profile = React.lazy(() => import('./views/profile/Profile'))
const Barangay = React.lazy(() => import('./views/barangay/Barangay'))
const User = React.lazy(() => import('./views/user/User'))
const AsensoList = React.lazy(() => import('./views/asenso_list/AsensoList'))

////////////////////////////////////////////////////////////////////////
////
////
////////////////////////////////////////////////////////////////////////

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Comelec2023 = React.lazy(() => import('./views/comelec_2023/Comelec2023'))
const Transmittal = React.lazy(() => import('./views/transmittal/Transmittal'))
const Verification = React.lazy(() => import('./views/verification/Verification'))
const BarangayCouncil = React.lazy(() => import('./views/barangay_council/BarangayCouncil'))

const routes = [
  {
    path: '/dashboard',
    user: ['Super Admin'],
    exact: true,
    name: 'Dashboard',
    element: Dashboard,
  },
  {
    path: '/verification',
    user: ['Super Admin'],
    exact: true,
    name: 'Verification',
    element: Verification,
  },
  {
    path: '/barangay_council',
    user: ['Super Admin'],
    exact: true,
    name: 'Barangay Council',
    element: BarangayCouncil,
  },
  {
    path: '/comelec_2023',
    user: ['Super Admin'],
    exact: true,
    name: 'Comelec 2023',
    element: Comelec2023,
  },
  {
    path: '/transmittal',
    user: ['Super Admin'],
    exact: true,
    name: 'Transmittal',
    element: Transmittal,
  },
  {
    path: '/list',
    user: ['Super Admin'],
    exact: true,
    name: 'Asenso List',
    element: AsensoList,
  },
  {
    path: '/Barangay',
    user: ['Super Admin'],
    exact: true,
    name: 'Barangay',
    element: Barangay,
  },
  { path: '/user', user: ['Super Admin'], name: 'User', element: User },
  { path: '/profile', user: ['Super Admin'], name: 'Profile', element: Profile },
]

export default routes
