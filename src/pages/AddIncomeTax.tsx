import React from 'react'
import { useNavigate } from 'react-router-dom';
import incomeTaxService from '../services/incomeTaxService';
import DynamicForm from '../components/DynamicForm';
import { Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  panNumber: YUP.string()
    .required("PAN Number is required")
    .matches(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, "Enter a valid PAN Number")
    .min(10, "PAN Number should be exactly 10 characters")
    .max(10, "PAN Number should be exactly 10 characters"),
  name: YUP.string()
    .required("Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid name")
    .min(3, "Name should be at least 3 characters")
    .max(30, "Name should not exceed 30 characters"),
  panIssuedDate: YUP.date()
    .required("PAN Issued Date is required"),
  primaryMobile: YUP.string()
    .required("Primary Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  secondaryMobile: YUP.string()
    .nullable()
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  primaryEmail: YUP.string()
    .email("Invalid email format")
    .required("Primary Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  secondaryEmail: YUP.string()
    .nullable()
    .email("Invalid email format")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  userid: YUP.string()
    .required("User ID is required")
    .min(6, "User ID should be at least 6 characters")
    .max(30, "User ID should not exceed 30 characters"),
  password: YUP.string()
    .required("Password is required"),
  tds: YUP.string()
    .nullable(),
  primarysignatory: YUP.string()
    .nullable()
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Primary Signatory name"),
  secondarysignatory: YUP.string()
    .nullable()
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Secondary Signatory name"),
  incorporationDate: YUP.date()
    .required("Incorporation Date is required"),
});

const AddIncomeTax = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    
    const handleAdd = (formData: FormData) => {
        incomeTaxService.createIncomeTax(formData)
        .then(() => {
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                navigate("/incometaxlist")
            }, 2000)
        })
        .catch(console.error);
    }

  return (
    <>
    <DynamicForm
        title="Add Income Tax"
        fields={[
            {
                label: "Name",
                key: "name",
                type: "text",
                required: true,
            },
            {
                label: "PAN Number",
                key: "panNumber",
                type: "text",
                required: true,
            },
            {
                label: "PAN Issued Date",
                key: "panIssuedDate",
                type: "date",
                required: true,
            },
            {
                label: "Incorporation Date",
                key: "incorporationDate",
                type: "date",
                required: true,
            },
            {
                label: "Primary Mobile Number",
                key: "primaryMobile",
                type: "text",
                required: true,
            },
            {
                label: "Secondary Mobile",
                key: "secondaryMobile",
                type: "text",
                required: true,
            },
            {
                label: "Primary Email",
                key: "primaryEmail",
                type: "email",
                required: true,
            },
            {
                label: "Secondary Email",
                key: "secondaryEmail",
                type: "email",
                required: true,
            },
            {
                label: "TDS (Tax Deduction At Source)",
                key: "tds",
                type: "text",
                required: true,
            },
            {
                label: "User ID",
                key: "userid",
                type: "text",
                required: true,
            },
            {
                label: "Password",
                key: "password",
                type: "password",
                required: true,
            },
            {
                label: "Primary Signatory",
                key: "primarysignatory",
                type: "text",
            },
            {
                label: "Secondary Signatory",
                key: "secondarysignatory",
                type: "text",
            },
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
  );
};

export default AddIncomeTax
