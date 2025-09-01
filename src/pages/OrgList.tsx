import React, { useEffect, useState } from "react";
import { useNavigate, data } from "react-router-dom";
import companyService from "../services/companyService";
import CustomTable from "../components/Table";
import {
  Box,
  Button,
  Container,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ConfirmDialog from "../components/ConfirmDialog";
import { Close, RemoveCircle, SyncAlt } from "@mui/icons-material";

const OrganizationList: React.FC = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      companyService
        .getCompByAdmin(adminId)
        .then(setOrganizations)
        .catch(console.error);
    } else {
      console.error("Admin ID not found in local storage.");
    }
  }, []);
  const activeData = organizations.filter((org) => org.active === true);

  const handleView = (companyid: number) => navigate(`/vieworg/${companyid}`);
  const handleEdit = (companyid: number) => navigate(`/updateorg/${companyid}`);

  const handleDeleteClick = (companyid: number) => {
    setDeleteId(companyid);
    setIsDialogOpen(true);
  };
  const handleChangeCompany = (companyid: number) => {
    localStorage.setItem("companyid", companyid.toString());
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      window.location.reload();
    }, 2000);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await companyService.deleteOrganization(deleteId);
        setOrganizations((prev) =>
          prev.filter((org) => org.companyid !== deleteId)
        );
        setSnack(true);
        setTimeout(() => {
          setSnack(false);
        }
        , 2000);
      } catch (error) {
        console.error("Error deleting organization:", error);
      }
    }
    setIsDialogOpen(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Organization List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => navigate("/addcompany")}
        >
          Add New
        </Button>
      </Box>

      <CustomTable
        columns={[
          { id: "cin", label: "Corporate ID", align: "left" },
          { id: "companyname", label: "Company Name", align: "left" },
          { id: "email", label: "Email ID", align: "left" },
        ]}
        data={activeData}
        idKey="companyid"
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onChange={handleChangeCompany}
      />

      <ConfirmDialog
        open={isDialogOpen}
        title="Delete Organization"
        message="Are you sure you want to delete this organization? This action cannot be undone."
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={
            <span
              style={{ display: "flex", alignItems: "center", fontWeight: 700 }}
            >
              <SyncAlt style={{ marginRight: 8 }} />
              Company Changed....!
            </span>
          }
          action={
            <Button
              variant="text"
              sx={{ color: "red" }}
              onClick={() => setOpen(false)}
            >
              <Close />
            </Button>
          }
          style={{
            backgroundColor: "#edcf0c",
            color: "#000",
            borderRadius: 10,
            border: "none",
          }}
        />
      </Snackbar>

      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarContent
          message={
            <span
              style={{ display: "flex", alignItems: "center", fontWeight: 700 }}
            >
              <RemoveCircle style={{ marginRight: 8 }} />
              deleted successfully!
            </span>
          }
          action={
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={() => setSnack(false)}
            >
              <Close />
            </Button>
          }
          style={{
            backgroundColor: "#f01405",
            color: "#fff",
            borderRadius: 10,
            border: "none",
          }}
        />
      </Snackbar>
    </Container>
  );
};

export default OrganizationList;
