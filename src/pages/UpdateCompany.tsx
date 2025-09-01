import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import companyService from "../services/companyService";
import UpdateForm from "../components/UpdateForm";
import { Close, EditNote } from "@mui/icons-material";
import { Snackbar, SnackbarContent, Button } from "@mui/material";
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  companyname: YUP.string()
    .required("Company Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid company name")
    .min(6, "Company name should be at least 6 characters")
    .max(50, "Company name should not exceed 50 characters"),
  cin: YUP.string()
    .required("Corporate Identification Number is required")
    .min(21, "CIN should be at least 21 characters")
    .max(25, "CIN should not exceed 25 characters"),
  dateOfIncorporation: YUP.date()
    .required("Date of Incorporation is required"),
  companyCode: YUP.string()
    .required("Company Code is required")
    .min(4, "Company Code should be at least 4 characters")
    .max(6, "Company Code should not exceed 6 characters"),
  registerNo: YUP.string()
    .required("Registration Number is required")
    .min(6, "Registration Number should be at least 6 characters")
    .max(10, "Registration Number should not exceed 10 characters")
    .matches(/^[0-9]+$/, "Registration Number must contain only numbers"),
  phoneNo: YUP.string()
    .required("Phone Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit phone number"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'")
    .max(30, "Email should not exceed 30 characters"),
  address: YUP.string()
    .required("Address is required"),
  website: YUP.string()
    .required("Website is required")
    .max(30, "Website should not exceed 30 characters"),
  telephoneNo: YUP.string()
    .required("Telephone Number is required")
    .min(10, "Telephone Number should be at least 10 characters")
    .max(15, "Telephone Number should not exceed 15 characters")
    .matches(/^[0-9]+$/, "Telephone Number must contain only numbers"),
  faxNo: YUP.string()
    .required("Fax Number is required")
    .min(10, "Fax Number should be at least 10 characters")
    .max(20, "Fax Number should not exceed 20 characters"),
  city: YUP.string()
    .required("City is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid city name")
    .max(20, "City name should not exceed 20 characters"),
  state: YUP.string()
    .required("State is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid state name")
    .max(20, "State name should not exceed 20 characters"),
  pincode: YUP.string()
    .required("PIN Code is required")
    .min(6, "PIN Code should be exactly 6 characters")
    .max(6, "PIN Code should be exactly 6 characters")
    .matches(/^[0-9]{6}$/, "PIN Code must contain only numbers"),
  logoName: YUP.mixed()
    .nullable(),
});

const UpdateCompany: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      companyService.fetchOrganizationById(id).then(data=>setCompany(data.data)).catch(console.error);
    }
  }, [id]);

  const handleUpdate = (formData: FormData) => {
    const logoFile = formData.get("logoName") as File | null;
  

    const orgData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== "logoName") {
        orgData[key] = value;
      }
    });

    companyService.updateOrganization(id, orgData, logoFile).then(() => {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        navigate("/orglist");
      }, 2000);
    }).catch(console.error);
  };
  
  
  return (
    <>
    <UpdateForm
      title="Update Company"
      fields={[
        { label: "Company Name", key: "companyname", type: "text", required: true },
        { label: "Corporate Identification Number", key: "cin", type: "text", required: true },
        { label: "Date of Incorporation", key: "dateOfIncorporation", type: "date", required: true },
        { label: "Company Code", key: "companyCode", type: "text", required: true },
        { label: "Registration Number", key: "registerNo", type: "text", required: true },
        { label: "Email", key: "email", type: "email", required: true },
        { label: "Phone Number", key: "phoneNo", type: "tel", required: true },
        { label: "Telephone Number", key: "telephoneNo", type: "tel", required: true },
        { label: "Address", key: "address", type: "text", required: true },
        { label: "City", key: "city", type: "text", required: true },
        { label: "State", key: "state", type: "text", required: true },
        { label: "PIN Code", key: "pincode", type: "text", required: true },
        { label: "Fax Number", key: "faxNo", type: "text", required: true },
        { label: "Website", key: "website", type: "text", required: true },
        { label: "Company Logo", key: "logoName", type: "file" },
      ]}
      data={company}
      onSubmit={handleUpdate}
      validationSchema={validationSchema}
      backLink="/orglist"
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

export default UpdateCompany;
