import React from "react";
import { useNavigate } from "react-router-dom";
import EpfService from "../services/EpfService";
import DynamicForm from "../components/DynamicForm";
import { Close } from "@mui/icons-material";
import { Snackbar, SnackbarContent, Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  estid: YUP.string()
    .required("Establishment ID is required"),
  userid: YUP.string()
    .required("User ID is required"),
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

const AddEPF = () => {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleAdd = (formData: FormData) => {
    EpfService.createEpf(formData)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/epflist")
        }, 2000)
      })
      .catch(console.error);
  };

  return (
    <>
    <DynamicForm
      title="Add EPF"
      fields={[
        {
          label: "Establishment ID",
          key: "estid",
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
          label: "Labour Identification Number(LIN)",
          key: "lin",
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
          label: "Mobile Number",
          key: "mobileNo",
          type: "text",
          required: true,
        },
        {
          label: "National Industrial Classification Code(NIC)",
          key: "niccode",
          type: "text",
          required: true,
        },
        {
          label: "Email",
          key: "emailId",
          type: "email",
          required: true,
        },
        {
          label: "PF Office",
          key: "pfOfficeAddress",
          type: "text",
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

export default AddEPF;
