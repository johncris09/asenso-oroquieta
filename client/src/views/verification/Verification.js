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

const Comelec2023 = ({ cardTitle }) => {
  const queryClient = useQueryClient()
  const table = useRef()

  const validation = useQuery({
    queryFn: async () =>
      await api.get('transmittal').then((response) => {
        return response.data
      }),
    queryKey: ['validation'],
    staleTime: Infinity,
  })

  const columns = [{ data: 'name' }, { data: 'claim_status' }]

  const validationFormValidationSchema = Yup.object().shape({
    name: Yup.array().required('Name is required'),
  })
  const validationForm = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationFormValidationSchema,
    onSubmit: async (values) => {},
  })

  const onDrop = useCallback((acceptedFiles) => {
    // Check if only one file is dropped
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0]
      if (file.type !== 'text/csv') {
        Swal.fire({
          text: 'Please upload specified file only.',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          icon: 'error',
        })
      } else {
        const reader = new FileReader()

        reader.onload = (event) => {
          const csvData = event.target.result
          const transformedData = transformData(csvData)
          isExist.mutate(transformedData)
        }

        reader.readAsText(file)
      }
    } else {
      Swal.fire({
        text: 'Please upload only one file.',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        icon: 'error',
      })
    }
  }, [])

  const transformData = (csvData) => {
    // Split the CSV data by new line
    const rows = csvData.split('\n')

    // isAlreadyExist.mutate(rows)

    // Initialize an empty array to store the final data
    const dataArray = []
    // Iterate over each row
    rows.forEach((row) => {
      if (row) {
        // Create an object for each row
        const dataObject = {
          name: formatName(row),
        }
        // Add the object to the data array
        dataArray.push(dataObject)
      }
    })

    return dataArray
  }

  const isExist = useMutation({
    mutationKey: 'isExist',
    mutationFn: (data) => {
      return api.post('transmittal/is_exist', data)
    },
    onSuccess: async (response) => {
      await queryClient.setQueryData(['validation'], response.data)
      return response.data
    },
    onError: (error) => {
      console.info(error)
      // toast.error(formatErrorMessage(error.response.data.message))
    },
  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.csv',
  })

  const formatName = (name) => {
    if (typeof name !== 'string') {
      return '' // Return an empty string if name is undefined or not a string
    }

    return name
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .replace(/\s,/, ',') // Remove space before the comma
      .trim() // Remove leading and trailing whitespace
  }
  return (
    <>
      <ToastContainer />
      <PageTitle pageTitle={cardTitle} />
      <CCard className="mb-4">
        <CCardHeader>Upload File</CCardHeader>
        <CCardBody>
          Instructions: <br />
          <ol>
            <li>CSV file only</li>
            <li>Format name to &apos;lastname, firstname middlename&apos;</li>
          </ol>
          <CForm onSubmit={validationForm.handleSubmit}>
            <div className="mb-3">
              <div
                {...getRootProps()}
                style={{
                  border:
                    validationForm.touched.name && validationForm.errors.name
                      ? '2px dashed red'
                      : '2px dashed blue',
                  borderRadius: '10px',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <input
                  {...getInputProps()}
                  accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                />
                {isDragActive ? (
                  <p>Drop the Excel file here...</p>
                ) : (
                  <>
                    <p>
                      <FontAwesomeIcon
                        style={
                          validationForm.touched.name && validationForm.errors.name
                            ? { color: 'red', fontSize: 70 }
                            : { color: 'blue', fontSize: 70 }
                        }
                        icon={faCloudDownload}
                      />
                    </p>
                    <p> Drag and drop an .csv file here, or click to select one </p>
                  </>
                )}
              </div>

              {validationForm.touched.name && validationForm.errors.name && (
                <CFormText className="text-danger">{validationForm.errors.name}</CFormText>
              )}
            </div>

            {isExist.isPending && <DefaultLoading />}
          </CForm>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <DataTable
            ref={table}
            data={validation.isLoading ? [] : validation.data}
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
              dom: '<"row"<"col-sm-6"B><"col-sm-6"f>>rt<"row"<"col-sm-5"i><"col-sm-7"p>>',
              // responsive: true,
              scrollX: true,
              scrollY: 450,
              // select: true,
              ordering: false,
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
          </DataTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Comelec2023
