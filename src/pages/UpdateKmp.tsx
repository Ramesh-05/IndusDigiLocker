import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import kmpService from '../services/kmpService';
import UpdateForm from '../components/UpdateForm';
import { EditNote, Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  name: YUP.string()
    .required("KMP Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid name")
    .min(3, "KMP Name should be at least 3 characters")
    .max(30, "KMP Name should not exceed 30 characters"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  aadharNo: YUP.string()
    .required("Aadhar Number is required")
    .matches(/^[0-9]{12}$/, "Enter a valid 12-digit Aadhar Number")
    .min(12, "Aadhar Number should be exactly 12 characters")
    .max(12, "Aadhar Number should be exactly 12 characters"),
  passportNo: YUP.string()
    .required("Passport Number is required")
    .matches(/^[A-Za-z][0-9]{7}$/, "Enter a valid Passport Number")
    .min(8, "Passport Number should be at least 8 characters")
    .max(10, "Passport Number should not exceed 10 characters"),
  panNo: YUP.string()
    .required("PAN Number is required")
    .matches(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, "Enter a valid PAN Number")
    .min(10, "PAN Number should be at least 10 characters")
    .max(15, "PAN Number should not exceed 15 characters"),
  resume: YUP.mixed()
    .nullable(),
  image: YUP.mixed()
    .nullable(),
  designation: YUP.string()
    .required("Designation is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Designation"),
  address: YUP.string()
    .required("Address is required"),
  state: YUP.string()
    .required("State is required")
    .matches(/^[A-Za-z]+$/, "Enter a valid State"),
  mobileNo: YUP.string()
    .required("Phone Number is required")
    .matches(/^[6-9]{1}[0-9]{9}$/, "Enter a valid 10-digit Phone Number")
    .min(10, "Phone Number should be exactly 10 characters")
    .max(10, "Phone Number should be exactly 10 characters"),
});

const UpdateKmp = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [kmp, setKmp] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      kmpService.fetchKmpById(id).then(data => 
        setKmp(data.data)
      )
      .catch(console.error);
    }
  }
  , [id]);

  const handleUpdate = (formData: FormData) => {
    const updatedFormData = new FormData();

    formData.forEach((value, key) => {
      if (key !== "image") {
        updatedFormData.append(key, value);
      }
    });

    // Add the image file if it exists
    const photoFile = formData.get("image") as File | null;
    if (photoFile && photoFile instanceof File) {
      updatedFormData.set("image", photoFile); // Replace the existing image field
    } else {
      console.warn("No new image selected");
    }

    // Add company ID manually if it exists
    if (kmp.company?.companyid) {
      updatedFormData.set("companyid", kmp.company.companyid);
    } else {
      console.error("Company ID is missing");
      return;
    }

    console.log("Updated FormData:", Array.from(updatedFormData.entries()));

    // Call the service to update the kmp
    kmpService.updateKmp(id, updatedFormData)
        .then(() => {
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
            navigate("/kmplist");
          }, 2000);
        })
        .catch(console.error);
  };
  return (
    <>
    <UpdateForm
        title="Update KMP"
        fields={[
            { label: "KMP Name", key: "name", type: "text", required: true },
            { label: "Designation", key: "designation", type: "text", required: true },
            { label: "Email ID", key: "email", type: "email" },
            { label: "Phone Number", key: "mobileNo", type: "text" },
            { label: "Address", key: "address", type: "text" },
            { label: "Aadhar Number", key: "aadharNo", type: "text" },
            { label: "PAN Number", key: "panNo", type: "text" },
            { label: "Passport Number", key: "passportNo", type: "text" },
            { label: "State", key: "state", type: "text" },
            { label: "KMP Photo", key: "image", type: "file"},
            { label: "Resume", key: "resume", type: "file"},
        ]}
        data={kmp}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
        backLink="/kmplist"
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

export default UpdateKmp;
