import React, { useRef, useState } from 'react'
import DataTable from 'datatables.net-react'
import DT from 'datatables.net-dt'
import 'datatables.net-autofill-dt'
import 'datatables.net-buttons-dt'
import 'datatables.net-buttons/js/buttons.html5.min.js'
import 'datatables.net-buttons/js/buttons.colVis.mjs'
import 'datatables.net-buttons/js/buttons.html5.mjs'
import 'datatables.net-buttons/js/buttons.print.mjs'
import 'datatables.net-colreorder-dt'
import 'datatables.net-fixedcolumns-dt'
import 'datatables.net-fixedheader-dt'
import 'datatables.net-keytable-dt'
import 'datatables.net-responsive-dt'
import 'datatables.net-rowgroup-dt'
import 'datatables.net-rowreorder-dt'
import 'datatables.net-scroller-dt'
import 'datatables.net-searchbuilder-dt'
import 'datatables.net-searchpanes-dt'
import 'datatables.net-select-dt'
import 'datatables.net-staterestore-dt'
import 'cropperjs/dist/cropper.css'
import { CCard, CCardBody } from '@coreui/react'
import { ToastContainer } from 'react-toastify'
import { api } from 'src/components/SystemConfiguration'
import { useQuery } from '@tanstack/react-query'
import PageTitle from 'src/components/PageTitle'

DataTable.use(DT)

const Transmittal = ({ cardTitle }) => {
  const table = useRef()

  const comelec = useQuery({
    queryFn: async () =>
      await api.get('comelec').then((response) => {
        return response.data
      }),
    queryKey: ['comelec'],
    staleTime: Infinity,
  })
  const columns = [{ data: 'name' }, { data: 'precinct' }, { data: 'purok' }, { data: 'barangay' }]

  return (
    <>
      <ToastContainer />
      <PageTitle pageTitle={cardTitle} />

      <CCard>
        <CCardBody>
          <DataTable
            ref={table}
            data={comelec.isLoading ? [] : comelec.data}
            columns={columns}
            className="table display table-sm table-responsive"
            options={{
              processing: true,
              scrollX: true,
              scrollY: 450,
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Precinct</th>
                <th>Purok</th>
                <th>Barangay</th>
              </tr>
            </thead>
          </DataTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Transmittal
