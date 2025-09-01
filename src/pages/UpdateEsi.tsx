import React, { use, useEffect, useState } from 'react'
import esiService from '../services/esiService';
import { useParams, useNavigate } from 'react-router-dom';
import UpdateForm from '../components/UpdateForm';
import { EditNote, Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  employerCodeNo: YUP.string()
    .required("Employer's Code is required")
    .matches(/^[0-9]+$/, "Employer's Code must contain only numbers")
    .min(15, "Employer's Code should be at least 15 characters")
    .max(20, "Employer's Code should not exceed 20 characters"),
  employerName: YUP.string()
    .required("Employer's Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Employer's Name")
    .min(3, "Employer's Name should be at least 3 characters")
    .max(25, "Employer's Name should not exceed 25 characters"),
  ro: YUP.string()
    .required("State/RO is required")
    .max(25, "State/RO should not exceed 25 characters"),
  lin: YUP.string()
    .required("Labour Identification Number (LIN) is required")
    .min(10, "LIN should be exactly 10 characters")
    .max(10, "LIN should be exactly 10 characters"),
  userid: YUP.string()
    .required("User ID is required")
    .min(6, "User ID should be at least 6 characters")
    .max(15, "User ID should not exceed 15 characters"),
  password: YUP.string()
    .required("Password is required"),
  emailId: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  mobileNo: YUP.string()
    .required("Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  signatory: YUP.string()
    .required("Signatory is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Signatory name"),
});

const UpdateEsi = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [esi, setEsi] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) {
            esiService.fetchEsiById(id).then((data) => {
                setEsi(data.data);
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

        esiService.updateEsi(id, cleanData)
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate('/esilist');
                }, 2000);
            })
            .catch(console.error);
    }
    
  return (
    <>
    <UpdateForm
        title="Update ESI"
        fields={[
            { label: "Employer's Code", key: "employerCodeNo", type: "text", required: true },
            { label: "User ID", key: "userid", type: "text", required: true },
            { label: "Password", key: "password", type: "password", required: true },
            { label: "Labour Identification Number(LIN)", key: "lin", type: "text", required: true },
            { label: "Mobile Number", key: "mobileNo", type: "text", required: true },
            { label: "Employer's Name", key: "employerName", type: "text", required: true },
            { label: "Email", key: "emailId", type: "email", required: true },
            { label: "State/RO", key: "ro", type: "text", required: true },
            { label: "Signatory", key: "signatory", type: "text", required: true },
        ]}
        data={esi}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
        backLink="/esilist"
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

export default UpdateEsi;
