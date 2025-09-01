import React, { use, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import EpfService from '../services/EpfService';
import UpdateForm from '../components/UpdateForm';
import { EditNote, Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  estid: YUP.string()
    .required("Establishment ID is required")
    .matches(/^[0-9]{1,15}$/, "Enter a valid Establishment ID"),
  userid: YUP.string()
    .required("User ID is required")
    .matches(/^[a-zA-Z0-9]{1,15}$/, "Enter a valid User ID"),
  lin: YUP.string()
    .required("Labour Identification Number (LIN) is required"),
  password: YUP.string()
    .required("Password is required"),
  mobileNo: YUP.string()
    .required("Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  niccode: YUP.string()
    .required("National Industrial Classification Code (NIC) is required"),
  emailId: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  pfOfficeAddress: YUP.string()
    .required("PF Office Address is required"),
  signatory: YUP.string()
    .required("Signatory is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Signatory name"),
});

const UpdateEpf = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [epf, setEpf] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (id) {
            EpfService.fetchEpfById(id).then((data) => {
                setEpf(data.data);
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

        EpfService.updateEpf(id, cleanData)
            .then(() => {
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                    navigate('/epflist');
                }, 2000);
            })  
            .catch(console.error);
    }

  return (
    <>
    <UpdateForm
        title="Update EPF"
        fields={[
            { label: "Establishment ID", key: "estid", type: "text", required: true },
            { label: "User ID", key: "userid", type: "text", required: true },
            { label: "Password", key: "password", type: "password", required: true },
            { label: "Labour Identification Number(LIN)", key: "lin", type: "text", required: true },
            { label: "Mobile Number", key: "mobileNo", type: "text", required: true },
            { label: "National Industrial Classification Code(NIC)", key: "niccode", type: "text", required: true },
            { label: "Email", key: "emailId", type: "email", required: true },
            { label: "PF Office Address", key: "pfOfficeAddress", type: "text", required: true },
            { label: "Signatory", key: "signatory", type: "text", required: true },
        ]}
        data={epf}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
        backLink="/epflist"
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

export default UpdateEpf
