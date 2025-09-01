import React, { useState ,useEffect} from "react";
import { TextField, Button, Grid, Paper, Typography, Box, Avatar } from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import { useNavigate, data } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { log } from "console";
import { yupResolver } from "@hookform/resolvers/yup";

interface Field {
  label: string;
  key: string;
  type: "text" | "email" | "tel" | "date" | "file" | "password" ;
  required?: boolean;
}

interface UpdateFormProps {
  title: string;
  fields: Field[];
  data: Record<string, any>;
  onSubmit: (formData: FormData) => void;
  backLink: string;
  validationSchema?: any;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ title, fields, data, onSubmit, backLink,validationSchema }) => {
  // console.log(data);
  
  const [formValues, setFormValues] = useState<Record<string, any>>(data);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(data.image || null);
  const [resumeFile, setResumeFile] = useState<File | null>(null); // State for resume file
  const [resumeUrl, setResumeUrl] = useState<string | null>(data.resume || null); // State for resume URL
  const navigate = useNavigate();
  const{register,handleSubmit,formState,setValue}=useForm({
    defaultValues:data ,
    resolver:yupResolver(validationSchema)
  })
  const { errors,defaultValues } = formState;
  console.log(defaultValues);

  useEffect(() => {
    if (data) {
      setFormValues(data);
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
      if (data.image) {
        setPreviewImage(`${process.env.REACT_APP_RESOURCE_IMAGE_URL}${data.image}`);
      }
      if (data.resume) {
        setResumeUrl(`${process.env.REACT_APP_RESOURCE_IMAGE_URL}${data.resume}`);
      }
    }
  }, [data]);
  // console.log(formValues);
  
  
  const handleChange = (key: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (event.target.files?.[0]) {
        const file = event.target.files[0];
        // setFormValues((prev) => ({ ...prev, [key]: file }));
        if (key === "image") {
          setPreviewImage(URL.createObjectURL(file));
          setSelectedFile(file);
        }else if (key === "logoName") {
          setPreviewImage(URL.createObjectURL(file));
          setSelectedFile(file);
        } else if (key === "resume") {
          setResumeFile(file);
          setResumeUrl(file.name);
        }
    }
};
  console.log(selectedFile);
  

  const submitData = (data:Record<string, any>) => {

    console.log(data);
    
   
    const formData = new FormData();
  
    Object.keys(data).forEach((key) => {
      if(key==="logoName" || key==="image"){
       if(selectedFile){
        formData.append("logoName", selectedFile);
       }
      }
      if(key==="resume"){
        if(resumeFile){
          formData.append("resume", resumeFile);
        }
      }
      formData.append(key, data[key]);
    });
  
  
  
    onSubmit(formData);
  };
  
  
  
  
  return (
    <Box sx={{ maxWidth: 900, margin: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        <form onSubmit={handleSubmit(submitData)}>
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
                    {field.key === "image" && previewImage && (
                      <Avatar
                        src={previewImage}
                        sx={{ width: 100, height: 100, mt: 1 }}
                      />

                    )}
                    {field.key === "logoName" && previewImage && (
                      <Avatar
                        src={previewImage}
                        sx={{ width: 100, height: 100, mt: 1 }}
                      />

                    )}
                    
                    {field.key === "resume" && resumeUrl && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Current Resume:{" "}
                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                          {resumeUrl.split("/").pop()}
                        </a>
                      </Typography>
                    )}
                  </>
                ) : (
                  <TextField
                    fullWidth
                    label={field.label}
                    type={field.type}
                   error={!!errors[field.key]}
                   helperText={errors[field.key]?.message?.toString()}
                   {...register(field.key)}
                   slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  />
                )}
              </Grid>
              
            ))}
          </Grid>

          <Box textAlign="center" mt={3}>
            <Button type="submit" variant="contained" color="primary" startIcon={<Save />} sx={{ mr: 2 }}>
              Update
            </Button>
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate(backLink)}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateForm;
