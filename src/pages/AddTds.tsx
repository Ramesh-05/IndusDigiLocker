import React from "react";
import { useNavigate } from "react-router-dom";
import tdsService from "../services/tdsService";
import DynamicForm from "../components/DynamicForm";
import { Close } from "@mui/icons-material";
import { Snackbar, SnackbarContent, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  tanNo: YUP.string()
    .required("TAN Number is required")
    .matches(/^[A-Za-z]{4}[0-9]{5}[A-Za-z]{1}$/, "Enter a valid TAN Number")
    .min(10, "TAN Number should be exactly 10 characters")
    .max(12, "TAN Number should not exceed 12 characters"),
  userid: YUP.string()
    .required("User ID is required")
    .min(6, "User ID should be at least 6 characters")
    .max(36, "User ID should not exceed 36 characters"),
  password: YUP.string()
    .required("Password is required"),
  phoneNumber: YUP.string()
    .required("Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
  surrendered: YUP.string()
    .required("Surrendered is required"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[A-Za-z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  signatory: YUP.string()
    .required("Signatory is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Signatory name"),
});

const AddTds = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleAdd = (formData: FormData) => {
    tdsService
      .createTds(formData)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/tdslist");
        }, 2000);
      })
      .catch(console.error);
  };

  return (
    <>
    <DynamicForm
      title="Add TDS"
      fields={[
        {
          label: "TAN Number",
          key: "tanNo",
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
          label: "Surendered",
          key: "surrendered",
          type: "text",
          required: true,
        },

        {
          label: "Mobile Number",
          key: "phoneNumber",
          type: "text",
          required: true,
        },
        {
          label: "Email",
          key: "email",
          type: "email",
          required: true,
        },
        {
          label: "Signatory",
          key: "signatory",
          type: "text",
          required: true,
        },
      ]}
      onSubmit={handleAdd}
      validationSchema={validationSchema}
      backLink="/tdslist"
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

export default AddTds;
