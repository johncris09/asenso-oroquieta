import React, { useEffect, useRef, useState } from 'react'
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
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { DefaultLoading, RequiredFieldNote, api } from 'src/components/SystemConfiguration'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PageTitle from 'src/components/PageTitle'
import { jwtDecode } from 'jwt-decode'

DataTable.use(DT)

const Transmittal = ({ cardTitle }) => {
  const user = jwtDecode(localStorage.getItem('asensoOroquietaToken'))

  const queryClient = useQueryClient()
  const [modalVisible, setModalVisible] = useState(false)
  const table = useRef()

  const transmittal = useQuery({
    queryFn: async () =>
      await api.get('transmittal').then((response) => {
        return response.data
      }),
    queryKey: ['transmittal'],
    staleTime: Infinity,
  })

  const validationSchema = Yup.object().shape({
    // first_name: Yup.string().required('First Name is required'),
    // last_name: Yup.string().required('Last Name is required'),
  })
  const form = useFormik({
    initialValues: {
      id: '',
      name: '',
      birthdate: '',
      purok: '',
      precinct: '',
      occupation: '',
      remarks: '',
      barangay: '',
      status: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.id) {
        await updateDetails.mutate(values)
      }
    },
  })

  const updateDetails = useMutation({
    mutationFn: async (data) => {
      return await api.put('transmittal/update/' + data.id, data)
    },
    onSuccess: async (response) => {
      if (response.data.status) {
        toast.success(response.data.message)
      }
      form.resetForm()
      setModalVisible(false)
      await queryClient.invalidateQueries(['transmittal'])
    },
    onError: (error) => {
      console.info(error.response.data)
      // toast.error(error.response.data.message)
    },
  })

  const handleInputChange = (e) => {
    form.handleChange(e)
    filterForm.handleChange(e)
    const { name, value } = e.target
    form.setFieldValue(name, value)
    filterForm.setFieldValue(name, value)
  }

  const columns = [
    { data: 'name' },
    { data: 'birthday' },
    { data: 'purok' },
    { data: 'precinct' },
    { data: 'occupation' },
    { data: 'remarks' },
    { data: 'barangay' },
    { data: 'claim_status' },
  ]

  const modifiedColumns = [
    {
      data: null,
      render: (data, type, row) => {
        return `<button class="btn btn-sm btn-warning edit-button" data-id="${row.id}">Edit</button>`
      },
      orderable: false,
    },
    ...columns,
  ]

  // Add an event listener to handle edit button clicks
  useEffect(() => {
    const handleEditClick = (event) => {
      const id = event.target.getAttribute('data-id')
      handleEdit(id)
    }

    // Attach the event listener to all edit buttons
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-button')) {
        handleEditClick(event)
      }
    })

    // Clean up the event listener
    return () => {
      document.removeEventListener('click', handleEditClick)
    }
  }, [])

  const handleEdit = (id) => {
    getDetails.mutate(id)
  }

  const getDetails = useMutation({
    mutationFn: async (values) => {
      return await api.get('transmittal/get/' + values)
    },
    onSuccess: async (response) => {
      console.info(response.data.name)
      form.setValues({
        id: response.data.id,
        name: response.data.name,
        birthdate: response.data.birthday,
        purok: response.data.purok,
        precinct: response.data.precinct,
        occupation: response.data.occupation,
        remarks: response.data.remarks,
        barangay: response.data.barangay,
        status: response.data.claim_status,
      })
      setModalVisible(true)

      console.info(response.data)
    },
  })

  const barangay = [
    { barangay: 'Apil' },
    { barangay: 'BINUANGAN' },
    { barangay: 'Bolibol' },
    { barangay: 'Buenavista' },
    { barangay: 'Bunga' },
    { barangay: 'BUNTAWAN' },
    { barangay: 'BURGOS' },
    { barangay: 'CANUBAY' },
    { barangay: 'Ciriaco Pastrano' },
    { barangay: 'CLARIN SETTLEMENT' },
    { barangay: 'DOLIPOS ALTO' },
    { barangay: 'DOLIPOS BAJO' },
    { barangay: 'DULAPO' },
    { barangay: 'DULLAN NORTE' },
    { barangay: 'Dullan Sur' },
    { barangay: 'LAMAC UPPER' },
    { barangay: 'LANGCANGAN PROPER' },
    { barangay: 'LAYAWAN' },
    { barangay: 'LOBOC LOWER' },
    { barangay: 'LOWER LAMAC' },
    { barangay: 'LOWER LANGCANGAN' },
    { barangay: 'LOWER RIZAL' },
    { barangay: 'MALINDANG' },
    { barangay: 'MIALEN' },
    { barangay: 'MOBOD' },
    { barangay: 'PAYPAYAN' },
    { barangay: 'Pines' },
    { barangay: 'POBLACION 1' },
    { barangay: 'POBLACION 2' },
    { barangay: 'San Vicente Alto' },
    { barangay: 'San Vicente Bajo' },
    { barangay: 'SEBUCAL' },
    { barangay: 'Senote' },
    { barangay: 'TABOC NORTE' },
    { barangay: 'TABOC SUR' },
    { barangay: 'Talairon' },
    { barangay: 'Talic' },
    { barangay: 'Tipan' },
    { barangay: 'Toliyok' },
    { barangay: 'TUYABANG ALTO' },
    { barangay: 'Tuyabang Bajo' },
    { barangay: 'TUYABANG PROPER' },
    { barangay: 'UPPER LANGCANGAN' },
    { barangay: 'UPPER LOBOC' },
    { barangay: 'UPPER RIZAL' },
    { barangay: 'Victoria' },
    { barangay: 'VILLAFLOR' },
  ]

  const filterForm = useFormik({
    initialValues: {
      barangay: '',
      status: '',
    },
    onSubmit: async (values) => {
      await filterData.mutate(values)
    },
  })

  const filterData = useMutation({
    mutationFn: async (data) => {
      return await api.get('transmittal/filter', { params: data })
    },
    onSuccess: async (response) => {
      await queryClient.setQueryData(['transmittal'], response.data)
    },
  })
  return (
    <>
      <ToastContainer />
      <PageTitle pageTitle={cardTitle} />
      <CAccordion activeItemKey={1} className="mb-4">
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>Filter</CAccordionHeader>
          <CAccordionBody>
            <CForm className="row g-3   mt-1" onSubmit={filterForm.handleSubmit}>
              <CRow>
                <CCol md={12}>
                  <CFormSelect
                    label="Barangay"
                    name="barangay"
                    onChange={handleInputChange}
                    value={filterForm.values.barangay}
                  >
                    <option value={''}>Select</option>

                    {barangay.map((item, index) => (
                      <>
                        <option key={index} value={item.barangay}>
                          {item.barangay}
                        </option>
                      </>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={12}>
                  <CFormSelect
                    label="Claim Status"
                    name="status"
                    onChange={handleInputChange}
                    value={filterForm.values.status}
                  >
                    <option value={''}>Select</option>
                    <option value="UNCLAIMED">UNCLAIMED</option>
                    <option value="CLAIMED">CLAIMED</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              <hr />

              <CRow>
                <CCol xs={12}>
                  <CButton color="primary" type="submit" className="float-end">
                    Filter
                  </CButton>
                  <CButton
                    color="danger"
                    onClick={() => queryClient.invalidateQueries(['transmittal'])}
                    className="float-end me-md-2"
                  >
                    Clear
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>

      <CCard>
        <CCardBody>
          <DataTable
            ref={table}
            data={transmittal.isLoading ? [] : transmittal.data}
            columns={user.role_type === 'Admin' ? columns : modifiedColumns}
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
              // dom: '<"row"<"col-sm-6"B><"col-sm-6"f>>rt<"row"<"col-sm-5"i><"col-sm-7"p>>',
              // responsive: true,
              scrollX: true,
              scrollY: 450,
              // select: true,
            }}
          >
            <thead>
              <tr>
                {user.role_type !== 'Admin' && <th>Action</th>}
                <th>Name</th>
                <th>Birthday</th>
                <th>Purok</th>
                <th>Precinct</th>
                <th>Occupation</th>
                <th>Remarks</th>
                <th>Barangay</th>
                <th>Status</th>
              </tr>
            </thead>
          </DataTable>
        </CCardBody>
      </CCard>

      <CModal
        alignment="center"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>{form.values.id ? `Edit ${cardTitle}` : `Add ${cardTitle}`}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <RequiredFieldNote />
          <CForm className="row g-3   mt-4" onSubmit={form.handleSubmit}>
            <CRow>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Name"
                  name="name"
                  onChange={handleInputChange}
                  value={form.values.name}
                  placeholder="Name"
                  invalid={form.touched.name && form.errors.name}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Birthdate"
                  name="birthdate"
                  onChange={handleInputChange}
                  value={form.values.birthdate}
                  placeholder="Birthdate"
                  invalid={form.touched.birthdate && form.errors.birthdate}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Purok"
                  name="purok"
                  onChange={handleInputChange}
                  value={form.values.purok}
                  placeholder="Purok"
                  invalid={form.touched.purok && form.errors.purok}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Precinct"
                  name="precinct"
                  onChange={handleInputChange}
                  value={form.values.precinct}
                  placeholder="Precinct"
                  invalid={form.touched.precinct && form.errors.precinct}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Occupation"
                  name="occupation"
                  onChange={handleInputChange}
                  value={form.values.occupation}
                  placeholder="Occupation"
                  invalid={form.touched.occupation && form.errors.occupation}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Remarks"
                  name="remarks"
                  onChange={handleInputChange}
                  value={form.values.remarks}
                  placeholder="Remarks"
                  invalid={form.touched.remarks && form.errors.remarks}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  type="text"
                  label="Barangay"
                  name="barangay"
                  onChange={handleInputChange}
                  value={form.values.barangay}
                  placeholder="Barangay"
                  invalid={form.touched.barangay && form.errors.barangay}
                />
              </CCol>
              <CCol md={12}>
                <CFormSelect
                  label={'Claim Status'}
                  name="status"
                  onChange={handleInputChange}
                  value={form.values.status}
                  required
                >
                  <option value="UNCLAIMED">UNCLAIMED</option>
                  <option value="CLAIMED">CLAIMED</option>
                </CFormSelect>
              </CCol>
            </CRow>

            <hr />
            <CRow>
              <CCol xs={12}>
                <CButton color="primary" type="submit" className="float-end">
                  {form.values.id ? 'Update' : 'Submit'}
                </CButton>
              </CCol>
            </CRow>
          </CForm>
          {updateDetails.isPending && <DefaultLoading />}
        </CModalBody>
      </CModal>
    </>
  )
}

export default Transmittal
