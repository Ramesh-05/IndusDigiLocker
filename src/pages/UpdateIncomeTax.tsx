import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import incomeTaxService from '../services/incomeTaxService';
import UpdateForm from '../components/UpdateForm';
import { EditNote, Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
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

const UpdateIncomeTax = () => {
    const { id } = useParams<{ id: string }>();
    const [incomeTax, setIncomeTax] = useState<Record<string, any>>({});
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) {
            incomeTaxService.fetchIncomeTaxById(id).then((data) => {
                setIncomeTax(data.data);
            });
        }
    }, [id]);

    const handleUpdate = (formData: FormData) => {
        const cleanData: Record<string, any> = {};

        formData.forEach((value, key) => {
            if (value !== "null" && value !== "") {
                cleanData[key] = value;
            }
        });

        // delete cleanData.updatedDate;
        delete cleanData.company;
        delete cleanData.admin;

        incomeTaxService.updateIncomeTax(id, cleanData)
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate("/incometaxlist");
                }, 2000);
            })
            .catch(console.error);
    };

  return (
    <>
    <UpdateForm
        title="Update Income Tax"
        fields={[
            { label: "PAN Number", key: "panNumber", type: "text", required: true },
            { label: "Name", key: "name", type: "text", required: true },
            { label: "PAN Issued Date", key: "panIssuedDate", type: "date", required: true },
            { label: "Incorporation Date", key: "incorporationDate", type: "date", required: true },
            { label: "TDS (Tax Deduction At Source)", key: "tds", type: "text", required: true },
            { label: "Primary Mobile Number", key: "primaryMobile", type: "text", required: true },
            { label: "Secondary Mobile Number", key: "secondaryMobile", type: "text", required: true },
            { label: "Primary Email", key: "primaryEmail", type: "email", required: true },
            { label: "Secondary Email", key: "secondaryEmail", type: "email", required: true },
            { label: "User ID", key: "userid", type: "text", required: true },
            { label: "Password", key: "password", type: "password", required: true },
            { label: "Primary Signatory", key: "primarysignatory", type: "text" },
            { label: "Secondary Signatory", key: "secondarysignatory", type: "text" },
        ]}
        data={incomeTax}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
        backLink="/incometaxlist"
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

export default UpdateIncomeTax
