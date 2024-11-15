import React, { useState } from 'react'
import Swal from 'sweetalert2'
import 'cropperjs/dist/cropper.css'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import MaterialReactTable from 'material-react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import { ToastContainer, toast } from 'react-toastify'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import { DeleteOutline, EditSharp } from '@mui/icons-material'
import {
  DefaultLoading,
  RequiredFieldNote,
  api,
  requiredField,
  validationPrompt,
} from 'src/components/SystemConfiguration'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import PageTitle from 'src/components/PageTitle'

const AsensoList = ({ cardTitle }) => {
  const queryClient = useQueryClient()
  const [modalVisible, setModalVisible] = useState(false)
  const column = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'birthday',
      header: 'Birthday',
    },
    {
      accessorKey: 'purok',
      header: 'Purok',
    },
    {
      accessorKey: 'precinct',
      header: 'Precinct',
    },
    {
      accessorKey: 'occupation',
      header: 'Occupation',
    },
    {
      accessorKey: 'remarks',
      header: 'Remarks',
    },
    {
      accessorKey: 'barangay',
      header: 'Barangay',
    },
  ]

  const asensoList = useQuery({
    queryFn: async () =>
      await api.get('asenso').then((response) => {
        return response.data
      }),
    queryKey: ['asensoList'],
    staleTime: Infinity,
  })

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
  })
  const form = useFormik({
    initialValues: {
      id: '',
      first_name: '',
      last_name: '',
      middle_name: '',
      suffix: '',
      contact_number: '',
      job_description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.id) {
        await updateDriver.mutate(values)
      } else {
        await insertDriver.mutate(values)
      }
    },
  })

  const insertDriver = useMutation({
    mutationFn: async (values) => {
      return await api.post('driver/insert', values)
    },
    onSuccess: async (response) => {
      if (response.data.status) {
        toast.success(response.data.message)
      }
      form.resetForm()
      await queryClient.invalidateQueries(['driver'])
    },
    onError: (error) => {
      toast.error('Duplicate Entry!')
    },
  })
  const updateDriver = useMutation({
    mutationFn: async (values) => {
      return await api.put('driver/update/' + values.id, values)
    },
    onSuccess: async (response) => {
      if (response.data.status) {
        toast.success(response.data.message)
      }
      form.resetForm()
      setModalVisible(false)
      await queryClient.invalidateQueries(['driver'])
    },
    onError: (error) => {
      console.info(error.response.data)
      // toast.error(error.response.data.message)
    },
  })

  const handleInputChange = (e) => {
    form.handleChange(e)
    const { name, value } = e.target
    form.setFieldValue(name, value)
  }

  return (
    <>
      <ToastContainer />
      <PageTitle pageTitle={cardTitle} />
      <MaterialReactTable
        columns={column}
        data={!asensoList.isLoading && asensoList.data}
        state={{
          isLoading: asensoList.isLoading,
          isSaving: asensoList.isLoading,
          showLoadingOverlay: asensoList.isLoading,
          showProgressBars: asensoList.isLoading,
          showSkeletons: asensoList.isLoading,
        }}
        muiCircularProgressProps={{
          color: 'secondary',
          thickness: 5,
          size: 55,
        }}
        muiSkeletonProps={{
          animation: 'pulse',
          height: 28,
        }}
        columnFilterDisplayMode="popover"
        paginationDisplayMode="pages"
        positionToolbarAlertBanner="bottom"
        enableStickyHeader
        enableStickyFooter
        initialState={{
          density: 'compact',
          columnPinning: { left: ['mrt-row-actions'] },
        }}
      />
    </>
  )
}

export default AsensoList
