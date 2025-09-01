import React, { useEffect, useState } from "react";
import kmpService from "../services/kmpService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import ConfirmDialog from "../components/ConfirmDialog";
import CustomTable from "../components/Table";
import { AddCircle, Close, RemoveCircle } from "@mui/icons-material";

const KmpList = () => {
  const navigate = useNavigate();
  const [kmp, setKmp] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchKmps = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await kmpService.fetchKmpByCompanyId(companyid);
          setKmp(response.data.filter((kmp: any) => kmp.active));
        }
      } catch (error) {
        console.error("Error fetching kmps list", error);
      }
    };
    fetchKmps();
  }, []);

  const handleView = (id: number) => navigate(`/viewkmp/${id}`);
  const handleEdit = (id: number) => navigate(`/updatekmp/${id}`);
  const handleDelete = async (id: number) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await kmpService.deleteKmp(deleteId);
        setKmp(kmp.filter((kmp) => kmp.id !== deleteId));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting kmp", error);
      }
    }
    setIsDialogOpen(false);
  };

  const columns = [
    { id: "name", label: "Name" },
    { id: "designation", label: "Designation" },
    { id: "email", label: "Email Id" },
  ];

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
        <Typography variant="h4">KMP's List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addkmp")}
        >
          Add KMP
        </Button>
      </Box>
      <CustomTable
        data={kmp}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idKey="id"
        columns={columns}
      />
      <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete KMP"
        message="Are you sure you want to delete this KMP?"
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
              <RemoveCircle style={{ marginRight: 8 }} />
              deleted successfully!
            </span>
          }
          action={
            <Button
              variant="text"
              sx={{ color: "#fff" }}
              onClick={() => setOpen(false)}
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

export default KmpList;
