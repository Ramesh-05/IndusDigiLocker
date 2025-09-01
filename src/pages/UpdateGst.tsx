import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import gstService from '../services/gstService';
import UpdateForm from '../components/UpdateForm';
import { EditNote, Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  gstNumber: YUP.string()
    .required("GST Number is required")
    .max(15, "GST Number should not exceed 15 characters"),
  userid: YUP.string()
    .required("User ID is required")
    .min(6, "User ID should be at least 6 characters")
    .max(25, "User ID should not exceed 25 characters"),
  password: YUP.string()
    .required("Password is required"),
  address: YUP.string()
    .required("Address is required"),
  state: YUP.string()
    .required("State is required"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  mobileno: YUP.string()
    .required("Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  signatory: YUP.string()
    .required("Signatory is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Signatory name"),
});

const UpdateGst = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [gst, setGst] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) {
            gstService.fetchGstById(id).then((data) => {
                setGst(data.data);
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

        gstService.updateGst(id, cleanData)
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate('/gstlist');
                }, 2000);
            })
            .catch(console.error);
    }


  return (
    <>
    <UpdateForm
        title="Update GST"
        fields={[
            { label: "GST Number", key: "gstNumber", type: "text", required: true },
            { label: "User ID", key: "userid", type: "text", required: true },
            { label: "Password", key: "password", type: "password", required: true },
            { label: "Address", key: "address", type: "text", required: true },
            { label: "Mobile Number", key: "mobileno", type: "text", required: true },
            { label: "Email", key: "email", type: "email", required: true },
            { label: "Signatory", key: "signatory", type: "text", required: true },
            { label: "State", key: "state", type: "text", required: true },
        ]}
        data={gst}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
        backLink="/gstlist" 
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

export default UpdateGst
