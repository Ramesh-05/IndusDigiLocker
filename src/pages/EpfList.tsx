import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EpfService from "../services/EpfService";
import {
  Box,
  Button,
  Container,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import {
  AddCircle,
  Close,
  Delete,
  Lock,
  RemoveCircle,
} from "@mui/icons-material";
import CustomTable from "../components/Table";
import ConfirmDialog from "../components/ConfirmDialog";

const EpfList = () => {
  const navigate = useNavigate();
  const [epf, setEpf] = useState<any[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedEpfId, setSelectedEpfId] = useState<number | null>(null);
  const [decryptedPassword, setDecryptedPassword] = useState<{
    [key: number]: string;
  }>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchEpf = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await EpfService.fetchEpfByCompanyId(companyid);
          setEpf(response.data.filter((epf: any) => epf.active));
        }
      } catch (error) {
        console.error("Error fetching epf list", error);
      }
    };
    fetchEpf();
  }, []);

  const handleView = (id: number) => navigate(`/viewepf/${id}`);
  const handleEdit = (id: number) => navigate(`/updateepf/${id}`);
  const handleDelete = async (id: number) => {
    setSelectedEpfId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedEpfId) {
      try {
        await EpfService.deleteEpf(selectedEpfId);
        setEpf(epf.filter((epf) => epf.id !== selectedEpfId));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting epf", error);
      }
    }
    setOpenConfirmDialog(false);
  };

  const getPassword = async (id: number) => {
    try {
      const response = await EpfService.decrypt(id);
      const decryptedPassword = response.decryptedPassword;
      setDecryptedPassword((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting password", error);
    }
  };

  const columns = [
    { label: "EST Id", id: "estid" },
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
              <Lock />
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
        <Typography variant="h4">EPF List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addepf")}
        >
          Add New
        </Button>
      </Box>

      <CustomTable
        data={epf}
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
        title="Delete EPF"
        message="Are you sure you want to delete this EPF?"
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

export default EpfList;
