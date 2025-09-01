import React from "react";
import { Box, Card, CardContent, Typography, Grid, Paper, Avatar, Button, Link } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface ViewDetailsProps {
  title: string;
  fields: { label: string; key: string }[];
  data: Record<string, any>;
  imageUrl?: string;
  resumeUrl?: string;
  backLink: string;
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ title, fields, data, imageUrl, resumeUrl, backLink }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ maxWidth: 900, margin: "auto", mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {title}
          </Typography>

          <Grid container spacing={3}>
            {fields.map((field, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {field.label}
                  </Typography>
                  <Typography variant="body1">{data[field.key] || "N/A"}</Typography>
                </Paper>
              </Grid>
            ))}
            {/* Image */}
            {imageUrl && (
              <Grid item xs={12} textAlign="center">
                <Avatar src={imageUrl} sx={{ width: 100, height: 100, mx: "auto" }} />
              </Grid>
            )}

            {/* Resume */}
            {resumeUrl && (
              <Grid item xs={12} textAlign="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Resume
                </Typography>
                <Link href={resumeUrl} target="_blank" rel="noopener noreferrer" download>
                  <Button variant="contained" color="primary">
                    Download Resume
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>

          <Box textAlign="center" mt={3}>
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate(backLink)}>
              Back
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewDetails;
