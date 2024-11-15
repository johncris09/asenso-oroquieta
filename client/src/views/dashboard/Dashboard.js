import { CCard, CCardBody } from '@coreui/react'
import { jwtDecode } from 'jwt-decode'
import React from 'react'

function Dashboard() {
  const user = jwtDecode(localStorage.getItem('asensoOroquietaToken'))

  return (
    <>
      <CCard>
        <CCardBody>Welcome {user.name}</CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
