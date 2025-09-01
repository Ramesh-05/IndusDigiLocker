import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import directorService from "../services/directorService";
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

const DirectorList = () => {
  const navigate = useNavigate();
  const [directors, setDirectors] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await directorService.fetchDirectorsByCompanyId(
            companyid
          );
          setDirectors(
            response.data.filter((directors: any) => directors.active)
          );
        }
      } catch (error) {
        console.error("Error fetching directors list", error);
      }
    };
    fetchDirectors();
  }, []);

  const handleView = (id: number) => navigate(`/viewdirector/${id}`);
  const handleEdit = (id: number) => navigate(`/updatedirector/${id}`);
  const handleDelete = async (id: number) => {
    setDeleteId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        await directorService.deleteDirector(deleteId);
        setDirectors(directors.filter((director) => director.id !== deleteId));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting director", error);
      }
    }
    setIsDialogOpen(false);
  };

  const columns = [
    { id: "name", label: "Director Name" },
    { id: "designation", label: "Designation" },
    { id: "dinNo", label: "	DIN Number" },
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
        <Typography variant="h4">Director's List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/adddirector")}
        >
          Add Director
        </Button>
      </Box>
      <CustomTable
        data={directors}
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
        title="Delete Director"
        message="Are you sure you want to delete this Director?"
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

export default DirectorList;
