import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCheckCircle, cilFile, cilHome, cilList, cilSpeedometer, cilUser } from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = (userInfo) => {
  let items = []

  // Super Admin
  if (userInfo.role_type === 'Super Admin') {
    items = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Verification',
        to: '/verification',
        icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Barangay Council',
        to: '/barangay_council',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Transmittal',
        to: '/transmittal',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Comelec 2023',
        to: '/comelec_2023',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },

      {
        component: CNavItem,
        name: 'User',
        to: '/user',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
    ]
  }
  //  Admin
  if (userInfo.role_type === 'Admin') {
    items = [
      {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Barangay Council',
        to: '/barangay_council',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Transmittal',
        to: '/transmittal',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Comelec 2023',
        to: '/comelec_2023',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ]
  }
  return items
}

export default _nav
