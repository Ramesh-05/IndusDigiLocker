import React, { use, useEffect, useState } from 'react'
import ptService from '../services/ptService';
import { useParams, useNavigate } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';
import { EditNote, Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  ptinSal: YUP.string()
    .required("PTIN Salary is required")
    .matches(/^[0-9]+$/, "PTIN Salary must contain only numbers")
    .min(5, "PTIN Salary should be at least 5 characters")
    .max(10, "PTIN Salary should not exceed 10 characters"),
  ptinCom: YUP.string()
    .required("PTIN Company is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid PTIN Company name")
    .min(3, "PTIN Company should be at least 3 characters")
    .max(20, "PTIN Company should not exceed 20 characters"),
  taxDivision: YUP.string()
    .required("Tax Division is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Tax Division"),
  taxCircle: YUP.string()
    .required("Tax Circle is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Tax Circle"),
  mobileNo: YUP.string()
    .required("Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  dateOfEnrollment: YUP.date()
    .required("Date of Enrollment is required"),
  userid: YUP.string()
    .required("User ID is required")
    .min(6, "User ID should be at least 6 characters")
    .max(30, "User ID should not exceed 30 characters"),
  signatory: YUP.string()
    .required("Signatory is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Signatory name"),
  password: YUP.string()
    .required("Password is required"),
});

const UpdatePt = () => {
    const { id } = useParams<{ id: string }>();
    const [pt, setPt] = useState<Record<string, any>>({});
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) {
            ptService.fetchPtById(id).then((data) => {
                setPt(data.data);
            });
        }
    }, [id]);

    const handleUpdate = (formData: FormData) => {
        const cleanData: Record<string, any> = {};

        formData.forEach((value, key) => {
            if (value !== 'null' && value !== '') {
                cleanData[key] = value;
            }
        });

        delete cleanData.company;
        delete cleanData.admin;

        ptService.updatePt(id, cleanData)
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate('/ptlist');
                }, 2000);
            })
            .catch(console.error);
    }
    
  return (
    <>
    <UpdateForm
        title="Update PT"
        fields={[
            { label: "PTIN Salary", key: "ptinSal", type: "text", required: true },
            { label: "Signatory", key: "signatory", type: "text", required: true },
            { label: "PTIN Company", key: "ptinCom", type: "text", required: true },
            { label: "Email", key: "email", type: "email", required: true },
            { label: "Tax Division", key: "taxDivision", type: "text", required: true },
            { label: "Mobile Number", key: "mobileNo", type: "text", required: true },
            { label: "Tax Circle", key: "taxCircle", type: "text", required: true },
            { label: "Date of Enrollment", key: "dateOfEnrollment", type: "date", required: true },
            { label: "User ID", key: "userid", type: "text", required: true },
            { label: "Password", key: "password", type: "password", required: true },
        ]}
        data={pt}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
        backLink="/ptlist"
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
                    <EditNote style={{ marginRight: 8 }} />
                    Edited successfully!
                  </span>
                }
                  action={
                    <Button variant="text" sx={{color:"red"}} onClick={() => setOpen(false)}><Close /></Button>
                  }
                  style={{ backgroundColor: "#8000FF", color: "#fff",borderRadius: 10, border: 'none' }}
                />
              </Snackbar>
                </>
  )
}

export default UpdatePt;
