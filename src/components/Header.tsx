import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Bar from "../assets/bar.png";
import Icon from "../assets/icon.png";
import Orchasp from "../assets/orchasp_logo-removebg-preview.png";
import companyService from "../services/companyService";

// Define the Organization type
interface Organization {
  companyname: string;
}

const Header: React.FC = () => {
  const [company, setCompany] = useState<Organization | null>(null);
  const companyid = localStorage.getItem("companyid");
  useEffect(() => {
    const fetchCompany = async () => {
      try {
       
        const data = await companyService.fetchOrganizationById(companyid);
        setCompany(data.data);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };
    if(companyid){
    fetchCompany();
    }else{
      setCompany(null);
    }
  }, [companyid]);
  

  return (
    <AppBar position="relative">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:"#003366"
        }}
      >
        {/* Left Side Logos */}
        <Box display="flex" alignItems="center">
          <img src={Orchasp} alt="logo" style={{ height: "60px" }} />
          <img
            src={Bar}
            alt="logopipe"
            style={{ height: "60px", width: "30px" }}
          />
          <img src={Icon} alt="icon" style={{ height: "60px" }} />
          <Typography variant="h5" sx={{ marginLeft: "10px", color: "white" }}>
            Indus DigiLocker
          </Typography>
        </Box>

        {/* Company Name */}
        {company && (
          <Typography
            variant="h4"
            sx={{ marginRight: "10px", marginTop: "10px", color: "white" }}
          >
            <strong>{company.companyname}</strong>
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
