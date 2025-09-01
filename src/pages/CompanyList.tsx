import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardActionArea, Typography, Box, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import companyService from "../services/companyService";
import defaultimg from "../assets/default_img.png";

interface Company {
  companyid: number;
  companyname: string;
  image?: string;
  active: boolean;
}

const getImageUrl = (imagePath: string) => {
  return `${process.env.REACT_APP_RESOURCE_IMAGE_URL}/files/get/${imagePath}`;
};

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const adminId = localStorage.getItem("adminId");
        const data = await companyService.getCompByAdmin(adminId);
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleCompanyClick = (id: number) => {
    localStorage.setItem("companyid", id.toString());
    navigate('/home');
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>
        Company List
      </Typography>
      <Grid container spacing={3} mb={4} justifyContent="center">
        {companies.map((company) =>
          company.active ? (
            <Grid item key={company.companyid} xs={12} sm={6} md={4} lg={3}>
              <CardActionArea onClick={() => handleCompanyClick(company.companyid)}
              sx={{
                borderRadius: "50%",
                overflow: "hidden",
                width: 180,
                height: 180,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                "&:hover .overlay": { opacity: 1 }
              }}
              >
                <Card
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: 180,
                    height: 180,
                    backgroundImage: `url(${company.image ? getImageUrl(company.image) : defaultimg})`,
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 3,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                    "&:hover .overlay": { opacity: 1 }
                  }}
                >
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.6)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      p: 1
                    }}
                  >
                    <Typography variant="h6">{company.companyname}</Typography>
                  </Box>
                </Card>
              </CardActionArea>
            </Grid>
          ) : null
        )}
        {/* Add New Company Button */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              borderRadius: "50%",
              width: 180,
              height: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
              backgroundColor: "#f5f5f5",
              cursor: "pointer",
              "&:hover": { backgroundColor: "#ddd" }
            }}
            onClick={() => navigate("/addcompany")}
          >
            <IconButton size="large">
              <AddCircleOutline sx={{ fontSize: 60, color: "#333" }} />
            </IconButton>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyList;
