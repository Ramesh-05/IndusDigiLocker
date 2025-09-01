import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import companyService from '../services/companyService';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import mainimg from '../assets/Main.png'

interface Organization {
  companyname: string;
}

const Home: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Organization | null>(null);

  useEffect(() => {
    if (id) {
      companyService.fetchOrganizationById(id).then(setCompany).catch(console.error);
    }
  }, [id]);

  return (
    <Box sx={{ display: 'flex', mb: 6 }}>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, transition: 'margin-left 0.3s' }}>

        {/* Main Content */}
        <Container sx={{ mt: 4 }}>
          <Box textAlign="center" sx={{ color: 'rgba(57, 63, 129, 1)' }}>
            {company && <Typography variant="h4" fontWeight="bold">{company.companyname}</Typography>}
          </Box>

          {/* Image Section */}
          <Grid container alignItems="center" spacing={4}>
            <Grid item xs={12} sm={6} textAlign="center">
              <img src={ mainimg } alt="Contact Information" style={{ maxWidth: '100%' }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" color="textSecondary" mb={2}>
                Safeguarding Your Digital Identity.
              </Typography>
              <Typography variant="h2" sx={{ fontFamily: 'Iceberg, sans-serif', color: 'red' }}>
                Indus Digilocker
              </Typography>
            </Grid>
          </Grid>

          {/* Welcome Section */}
          <Box textAlign="center" mt={5}>
            <Typography variant="h4" fontWeight="bold">Welcome to IndusDigilocker</Typography>
            <Typography variant="body1" color="textSecondary">
              The one-stop solution for securely storing and managing your critical user IDs, passwords, and important documents.
            </Typography>
          </Box>

          {/* Features Section */}
          <Box mt={5}>
            <Typography variant="h5" textAlign="center" color="primary" fontWeight="bold">
              What You Can Store with IndusDigilocker
            </Typography>
            <Grid container spacing={3} mt={2}>
              {featureData.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={cardStyles}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" color="primary">{feature.icon}</Typography>
                      <Typography variant="h6" fontWeight="bold">{feature.title}</Typography>
                      <Typography variant="body2">{feature.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Why Choose Us Section */}
          <Box mt={5}>
            <Typography variant="h5" textAlign="center" color="primary" fontWeight="bold">
              Why Choose Us?
            </Typography>
            <Grid container spacing={3} mt={2}>
              {whyChooseUsData.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Card sx={cardStyles}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" color="primary">{feature.icon}</Typography>
                      <Typography variant="h6" fontWeight="bold">{feature.title}</Typography>
                      <Typography variant="body2">{feature.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

// Feature Data
const featureData = [
  { icon: '🏦', title: 'Banking Details', description: 'Securely save account credentials, statements, and banking documents.' },
  { icon: '📂', title: 'Corporate Documents', description: 'Centralize storage for MCA filings, Director, KMP records, and compliance docs.' },
  { icon: '📑', title: 'Tax Records', description: 'Safeguard Income Tax, TDS, GST, EPF, ESI, and Professional Tax details.' },
  { icon: '🆔', title: 'Personal Information', description: 'Manage ID proofs, licenses, and personal records and data.' },
  { icon: '📸', title: 'Photos & Files', description: 'Upload and store digital copies of key images and documents.' },
];

// Why Choose Us Data
const whyChooseUsData = [
  { icon: '🔒', title: 'End-to-End Encryption', description: 'Ensure ultimate data security for all your sensitive information.' },
  { icon: '📁', title: 'Easy Categorization', description: 'Organize and retrieve your documents with ease.' },
];

// Styles
const cardStyles = {
  borderRadius: '10px',
  background: '#f8f9fa',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  }
};


export default Home;
