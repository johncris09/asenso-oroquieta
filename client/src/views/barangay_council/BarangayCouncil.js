import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
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
import { CCard, CCardBody, CCardHeader, CForm, CFormText } from '@coreui/react'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { DefaultLoading, api } from 'src/components/SystemConfiguration'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PageTitle from 'src/components/PageTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownload } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

DataTable.use(DT)

const BarangayCouncil = ({ cardTitle }) => {
  const queryClient = useQueryClient()
  const table = useRef()

  const barangayCouncil = useQuery({
    queryFn: async () =>
      await api.get('barangay_council').then((response) => {
        return response.data
      }),
    queryKey: ['barangayCouncil'],
    staleTime: Infinity,
  })

  const columns = [
    { data: 'position' },
    { data: 'lastname' },
    { data: 'firstname' },
    { data: 'middlename' },
    { data: 'extension' },
    { data: 'birthdate' },
    { data: 'barangay' },
  ]

  return (
    <>
      <ToastContainer />
      <PageTitle pageTitle={cardTitle} />

      <CCard>
        <CCardBody>
          <DataTable
            ref={table}
            data={barangayCouncil.isLoading ? [] : barangayCouncil.data}
            columns={columns}
            className="table display table-sm table-responsive"
            options={{
              processing: true,
              buttons: [
                {
                  extend: 'csvHtml5',
                  className: 'btn btn-primary btn-sm',
                  text: 'Export to CSV',
                },
              ],
              dom: '<"row"<"col-sm-6"B><"col-sm-3"f>>rt<"row"<"col-sm-5"i><"col-sm-7"p>>',
              // responsive: true,
              scrollX: true,
              scrollY: 450,
              // select: true,
              ordering: false,
            }}
          >
            <thead>
              <tr>
                <th>Position</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Extension</th>
                <th>Birthdate</th>
                <th>Barangay</th>
              </tr>
            </thead>
          </DataTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default BarangayCouncil
