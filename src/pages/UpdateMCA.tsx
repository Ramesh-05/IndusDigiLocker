import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import McaService from "../services/McaService";
import UpdateForm from "../components/UpdateForm";
import { EditNote, Close } from "@mui/icons-material";
import { Snackbar, SnackbarContent, Button } from "@mui/material";
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  authorisedCapital: YUP.string()
    .required("Authorised Capital is required"),
  cin: YUP.string()
    .required("Company Identification Number (CIN) is required")
    .min(20, "CIN should be at least 20 characters")
    .max(30, "CIN should not exceed 30 characters"),
  classOfCompany: YUP.string()
    .required("Class of Company is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Class of Company")
    .min(6, "Class of Company should be at least 6 characters")
    .max(30, "Class of Company should not exceed 30 characters"),
  dateOfIncorporation: YUP.date()
    .required("Date of Incorporation is required"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  mobileNo: YUP.string()
    .required("Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  paidUpCapital: YUP.string()
    .required("Paid Up Capital is required"),
  registeredAddress: YUP.string()
    .required("Registered Address is required"),
  registrationNo: YUP.string()
    .required("Registration Number is required"),
  rocName: YUP.string()
    .required("Registrar of Company Name is required"),
  stockExchanges: YUP.string()
    .required("Stock Exchanges is required")
    .matches(/^[A-Za-z]+$/, "Enter a valid Stock Exchange name"),
  telephone: YUP.string()
    .required("Telephone Number is required")
    .matches(/^[0-9]{11,18}$/, "Enter a valid Telephone Number")
    .min(11, "Telephone Number should be at least 11 characters")
    .max(18, "Telephone Number should not exceed 18 characters"),
  v2emailId: YUP.string()
    .email("Invalid email format")
    .required("V2 Email ID is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  v2loginid: YUP.string()
    .required("V2 Login ID is required")
    .min(6, "V2 Login ID should be at least 6 characters")
    .max(30, "V2 Login ID should not exceed 30 characters"),
  v2password: YUP.string()
    .required("V2 Password is required"),
  v3emailId: YUP.string()
    .email("Invalid email format")
    .required("V3 Email ID is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  v3loginid: YUP.string()
    .required("V3 Login ID is required")
    .min(6, "V3 Login ID should be at least 6 characters")
    .max(30, "V3 Login ID should not exceed 30 characters"),
  v3password: YUP.string()
    .required("V3 Password is required"),
});

const UpdateMCA = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mca, setMca] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      McaService.fetchMcaById(id)
        .then((data) => setMca(data.data))
        .catch(console.error);
    }
  }, [id]);

  const handleUpdate = (formData: FormData) => {
    
    const cleanData: Record<string, any> = {};

    formData.forEach((value, key) => {
      if (value !== "null" && value !== "") {
        cleanData[key] = value;
      }
    });
    
    delete cleanData.updatedDate;
    delete cleanData.company;
    delete cleanData.admin;

    McaService.updateMca(id, cleanData)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/mcalist");
        }, 2000);
      })
      .catch(console.error);
  };

  return (
    <>
    <UpdateForm
      title="Update MCA"
      fields={[
        {
          label: "Company Identification Number",
          key: "cin",
          type: "text",
          required: true,
        },
        {
          label: "Registrar Of Company Name",
          key: "rocName",
          type: "text",
          required: true,
        },
        {
          label: "Registration Number",
          key: "registrationNo",
          type: "text",
          required: true,
        },
        {
          label: "Date Of Incorporation",
          key: "dateOfIncorporation",
          type: "date",
          required: true,
        },
        {
          label: "Registered Address",
          key: "registeredAddress",
          type: "text",
          required: true,
        },
        {
          label: "Stock Exchanges",
          key: "stockExchanges",
          type: "text",
          required: true,
        },
        {
          label: "Class Of Company",
          key: "classOfCompany",
          type: "text",
          required: true,
        },
        {
          label: "Authorised Capital",
          key: "authorisedCapital",
          type: "text",
          required: true,
        },
        {
          label: "Paid Up Capital",
          key: "paidUpCapital",
          type: "text",
          required: true,
        },
        { label: "Email", key: "email", type: "email", required: true },
        {
          label: "Mobile Number",
          key: "mobileNo",
          type: "tel",
          required: true,
        },
        {
          label: "Tele Phone Number",
          key: "telephone",
          type: "tel",
          required: true,
        },
        {
          label: "V2 Login ID",
          key: "v2loginid",
          type: "text",
          required: true,
        },
        {
          label: "V3 Login ID",
          key: "v3loginid",
          type: "text",
          required: true,
        },
        {
          label: "V2 Email Id",
          key: "v2emailId",
          type: "email",
          required: true,
        },
        {
          label: "V3 Email Id",
          key: "v3emailId",
          type: "email",
          required: true,
        },
        {
          label: "V2 Password",
          key: "v2password",
          type: "password",
          required: true,
        },
        {
          label: "V3 Password",
          key: "v3password",
          type: "password",
          required: true,
        },
      ]}
      data={mca}
      onSubmit={handleUpdate}
      validationSchema={validationSchema}
      backLink="/mcalist"
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
  );
};

export default UpdateMCA;
