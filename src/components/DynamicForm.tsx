import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';


interface Field {
  label: string;
  key: string;
  type: "text" | "email" | "tel" | "date" | "file" | "password";
  required?: boolean;
}

interface DynamicFormProps {
  title: string;
  fields: Field[];
  onSubmit: (formData: FormData) => void;
  backLink: string;
  validationSchema?: any; // Optional validation schema
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields,
  onSubmit,
  backLink,
  validationSchema
}) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const {register,formState,handleSubmit}=useForm({
    defaultValues: formValues,
    mode: "onBlur",
    resolver:validationSchema?yupResolver(validationSchema):undefined,
  })
  const { errors, } = formState;
  const handleChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setSelectedFile(file)
      setFormValues((prev) => ({ ...prev, [key]: file }));
  
      if (key === "image") {
        setPreviewImage(URL.createObjectURL(file));
      }
      if (key === "logoName") {
        setPreviewImage(URL.createObjectURL(file));
      }
    }
  };

  const submit = (data:Record<string, any>) => {
    // event.preventDefault();
    const formData = new FormData();
  
    const adminId = localStorage.getItem("adminId");
    const companyid = localStorage.getItem("companyid");
    if (adminId) {
      formData.append("adminId", adminId);
    }
  
    if (companyid) {
      formData.append("companyid", companyid);
    }
  
    for (const key in data) {
      if (key === "resume" || key === "image") {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
  
    if (selectedFile) {
      if ("logoName" in formValues && formValues["logoName"]) {
        formData.append("logoName", selectedFile);
      } else {
        formData.append("image", selectedFile);
      }
    }
  
    onSubmit(formData);
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container spacing={3}>
            {fields.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
              {field.type === "file" ? (
                <>
                  <Typography variant="subtitle1">{field.label}</Typography>
                  <input
                    type="file"
                    accept={field.key === "resume" ? ".pdf, .doc, .docx" : ".png, .jpg, .jpeg"}
                    onChange={(e) => handleFileChange(e, field.key)}
                  />
                  {(field.key === "image" || field.key === "logoName") && previewImage && (
                    <Avatar
                      src={previewImage}
                      sx={{ width: 100, height: 100, mt: 1 }}
                    />
                  )}
                  
                </>
              ) : (
                <TextField
                  fullWidth
                  label={field.label}
                  type={field.type}
                  // value={formValues[field.key] || ""}
                  // onChange={(e) => handleChange(field.key, e.target.value)}
                  {...register(field.key)}
                  // required={field.required}
                  error={!!errors[field.key]}
                  helperText={errors[field.key]?.message ? String(errors[field.key]?.message) : undefined}
                />
              )}
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Save />}
              sx={{ mr: 2 }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default DynamicForm;


