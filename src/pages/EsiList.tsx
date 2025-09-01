import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import esiService from "../services/esiService";
import {
  Security,
  Delete,
  AddCircle,
  Close,
  RemoveCircle,
} from "@mui/icons-material";
import {
  IconButton,
  Box,
  Typography,
  Container,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import ConfirmDialog from "../components/ConfirmDialog";
import CustomTable from "../components/Table";

const EsiList = () => {
  const navigate = useNavigate();
  const [esi, setEsi] = useState<any[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedEsiId, setSelectedEsiId] = useState<number | null>(null);
  const [decryptedPassword, setDecryptedPassword] = useState<{
    [key: number]: string;
  }>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEsi = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await esiService.fetchEsiByCompanyId(companyid);
          setEsi(response.data.filter((esi: any) => esi.active));
        }
      } catch (error) {
        console.error("Error fetching esi list", error);
      }
    };
    fetchEsi();
  }, []);

  const handleView = (id: number) => navigate(`/viewesi/${id}`);
  const handleEdit = (id: number) => navigate(`/updateesi/${id}`);
  const handleDelete = async (id: number) => {
    setSelectedEsiId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedEsiId) {
      try {
        await esiService.deleteEsi(selectedEsiId);
        setEsi(esi.filter((esi) => esi.id !== selectedEsiId));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting esi", error);
      }
    }
    setOpenConfirmDialog(false);
  };

  const getPassword = async (id: number) => {
    try {
      const response = await esiService.decryptEsi(id);
      const decryptedPassword = response.decryptedPassword;
      setDecryptedPassword((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting password", error);
    }
  };

  const columns = [
    { label: "Employer's Code", id: "employerCodeNo" },
    { label: "Employer's Name", id: "employerName" },
    { label: "State/RO", id: "ro" },
    { label: "User ID", id: "userid" },
    {
      label: "Password",
      id: "password",
      render: (row: any) => (
        <>
          {decryptedPassword[row.id] ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>
                {decryptedPassword[row.id]}
              </Typography>
              <IconButton
                onClick={() =>
                  setDecryptedPassword((prev) => ({ ...prev, [row.id]: "" }))
                }
                color="error"
              >
                <Delete />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={() => getPassword(row.id)} color="primary">
              <Security />
            </IconButton>
          )}
        </>
      ),
    },
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
        <Typography variant="h4">ESI List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addesi")}
        >
          Add New
        </Button>
      </Box>

      <CustomTable
        data={esi}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idKey="id"
        columns={columns}
      />

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={confirmDelete}
        title="Delete ESI"
        message="Are you sure you want to delete this ESI?"
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

export default EsiList;
