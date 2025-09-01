import React from 'react'
import { useNavigate } from 'react-router-dom';
import directorService from '../services/directorService';
import DynamicForm from '../components/DynamicForm';
import { Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  name: YUP.string()
    .required("Director Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid name")
    .min(3, "Director Name should be at least 3 characters")
    .max(30, "Director Name should not exceed 30 characters"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  dinNo: YUP.string()
    .required("DIN Number is required")
    .matches(/^[0-9]{8}$/, "Enter a valid DIN Number")
    .min(8, "DIN Number should be exactly 8 characters")
    .max(10, "DIN Number should not exceed 10 characters"),
  panNo: YUP.string()
    .required("PAN Number is required")
    .matches(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, "Enter a valid PAN Number")
    .min(10, "PAN Number should be at least 10 characters")
    .max(15, "PAN Number should not exceed 15 characters"),
  passportNo: YUP.string()
    .required("Passport Number is required")
    .matches(/^[A-Za-z][0-9]{7}$/, "Enter a valid Passport Number")
    .min(6, "Passport Number should be at least 6 characters")
    .max(15, "Passport Number should not exceed 15 characters"),
  dateOfAppointment: YUP.date()
    .required("Date of Appointment is required"),
  address: YUP.string()
    .required("Address is required"),
  designation: YUP.string()
    .required("Designation is required")
    .matches(/^[A-Za-z]+$/, "Enter a valid Designation"),
  aadharNo: YUP.string()
    .required("Aadhar Number is required")
    .matches(/^[0-9]{12}$/, "Enter a valid 12-digit Aadhar Number")
    .min(12, "Aadhar Number should be exactly 12 characters")
    .max(12, "Aadhar Number should be exactly 12 characters"),
  image: YUP.mixed()
    .nullable(),
  mobileNo: YUP.string()
    .required("Phone Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Phone Number")
    .min(10, "Phone Number should be exactly 10 characters")
    .max(10, "Phone Number should be exactly 10 characters"),
});

const AddDirector = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleAdd = (formData: FormData) => {
        directorService.createDirector(formData)
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate("/directorlist")
                }, 2000)
            })
            .catch(console.error);
    };

  return (
    <>
    <DynamicForm
        title="Add Director"
        fields={[
            { label: "Director Name", key: "name", type: "text", required: true },
            { label: "Designation", key: "designation", type: "text", required: true },
            { label: "DIN Number", key: "dinNo", type: "text", required: true },
            { label: "Email", key: "email", type: "email", required: true },
            { label: "Phone Number", key: "mobileNo", type: "tel", required: true },
            { label: "Address", key: "address", type: "text" },
            { label: "Aadhar Number", key: "aadharNo", type: "text",required: true },
            { label: "PAN Number", key: "panNo", type: "text", required: true },
            { label: "Passport Number", key: "passportNo", type: "text", required: true },
            { label: "Date of Appointment", key: "dateOfAppointment", type: "date", required: true },
            { label: "Date of Resignation", key: "dateOfExit", type: "date" },
            { label: "Director Photo", key: "image", type: "file"},
        ]}
        onSubmit={handleAdd}
        validationSchema={validationSchema}
        backLink="-1"
    />
    <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <SnackbarContent
            message={
              <span style={{ display: "flex", alignItems: "center", fontWeight: 700 }}>
                <AddCircleIcon style={{ marginRight: 8 }} />
                Added successfully!
              </span>
            }
              action={
                <Button variant="text" sx={{color:"red"}} onClick={() => setOpen(false)}><Close /></Button>
              }
              style={{ backgroundColor: "#3cfa07", color: "#fff",borderRadius: 10, border: 'none' }}
            />
          </Snackbar>
            </>
  )
}

export default AddDirector;
