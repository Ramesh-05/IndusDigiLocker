import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, data } from 'react-router-dom';
import bankService from '../services/bankService';
import UpdateForm from '../components/UpdateForm';
import { EditNote, Close } from '@mui/icons-material';
import { Snackbar, SnackbarContent, Button } from '@mui/material';
import * as YUP from "yup";

const validationSchema = YUP.object().shape({
  accountHolderName: YUP.string()
    .required("Account Holder Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid name")
    .min(3, "Account Holder Name should be at least 3 characters")
    .max(30, "Account Holder Name should not exceed 30 characters"),
  accountType: YUP.string()
    .required("Account Type is required"),
  bankAccountNumber: YUP.string()
    .required("Bank Account Number is required")
    .matches(/^[0-9]{9,18}$/, "Enter a valid Bank Account Number")
    .min(10, "Bank Account Number should be at least 10 characters")
    .max(18, "Bank Account Number should not exceed 18 characters"),
  ifccode: YUP.string()
    .required("IFSC Code is required")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Enter a valid IFSC Code")
    .min(11, "IFSC Code should be at least 11 characters")
    .max(15, "IFSC Code should not exceed 15 characters"),
  bankName: YUP.string()
    .required("Bank Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Bank Name")
    .min(3, "Bank Name should be at least 3 characters")
    .max(30, "Bank Name should not exceed 30 characters"),
  branch: YUP.string()
    .required("Branch Name is required")
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Branch Name")
    .min(3, "Branch Name should be at least 3 characters")
    .max(30, "Branch Name should not exceed 30 characters"),
  mcircode: YUP.string()
    .required("MCIR Code is required")
    .matches(/^[0-9]{9,16}$/, "Enter a valid MCIR Code")
    .min(9, "MCIR Code should be at least 9 characters")
    .max(16, "MCIR Code should not exceed 16 characters"),
  loginid: YUP.string()
    .required("Login ID is required")
    .min(6, "Login ID should be at least 6 characters")
    .max(30, "Login ID should not exceed 30 characters"),
  loginpassword: YUP.string()
    .required("Login Password is required"),
  transpassword: YUP.string()
    .required("Transaction Password is required"),
  primarysignatory: YUP.string()
    .nullable()
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Primary Signatory name"),
  secondarysignatory: YUP.string()
    .nullable()
    .matches(/^[A-Za-z\s]+$/, "Enter a valid Secondary Signatory name"),
  email: YUP.string()
    .email("Invalid email format")
    .required("Email is required")
    .matches(/^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[c][o][m]$/, "Email must end with '.com'"),
  mobileNo: YUP.string()
    .required("Mobile Number is required")
    .matches(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit Mobile Number")
    .min(10, "Mobile Number should be exactly 10 characters")
    .max(10, "Mobile Number should be exactly 10 characters"),
});

const UpdateBank = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [bank, setBank] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      bankService.fetchBankById(id).then(data=>
        setBank(data.data)          
      ).catch(console.error);      
    }     
  }, [id]);

  const handleUpdate = (formData: FormData) => {
    const cleanData: Record<string, any> = {};
  
    formData.forEach((value, key) => {
      if (value !== "null" && value !== "") {
        cleanData[key] = value;
      }
    });
  
    delete cleanData.updatedBy;
    delete cleanData.updatedDate;
    delete cleanData.active;
    delete cleanData.company; 
    delete cleanData.admin;   
  
    bankService.updateBank(id, cleanData)
      .then(() => {
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
          navigate("/banklist");
        }, 2000);
      })
      .catch(console.error);
  };
  

  return (
    <>
    <UpdateForm
      title="Update Bank"
      fields={[
        {
          label: "Account Holder Name",
          key: "accountHolderName",
          type: "text",
          required: true,
        },
        {
          label: "Account Number",
          key: "bankAccountNumber",
          type: "text",
          required: true,
        },
        { label: "Bank Name", key: "bankName", type: "text", required: true },
        { label: "IFSC Code", key: "ifccode", type: "text", required: true },
        { label: "Branch Name", key: "branch", type: "text", required: true },
        {
          label: "Account Type",
          key: "accountType",
          type: "text",
          required: true,
        },
        { label: "MCIR Code", key: "mcircode", type: "text", required: true },
        { label: "Email", key: "email", type: "email", required: true },
        {
          label: "Mobile Number",
          key: "mobileNo",
          type: "text",
          required: true,
        },
        { label: "Login ID", key: "loginid", type: "text", required: true },
        {
          label: "Login Password",
          key: "loginpassword",
          type: "password",
          required: true,
        },
        {
          label: "Transaction Password",
          key: "transpassword",
          type: "password",
          required: true,
        },
        {
          label: "Primary Signatory",
          key: "primarysignatory",
          type: "text",
        },
        {
          label: "Secondary Signatory",
          key: "secondarysignatory",
          type: "text",
        },
      ]}
      data={bank}
      onSubmit={handleUpdate}
      validationSchema={validationSchema}
      backLink="/banklist"
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

export default UpdateBank
