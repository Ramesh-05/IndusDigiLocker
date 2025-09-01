import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import incomeTaxService from "../services/incomeTaxService";
import {
  Box,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { Typography, Container } from "@mui/material";
import {
  AddCircle,
  Close,
  Delete,
  Lock,
  RemoveCircle,
} from "@mui/icons-material";
import CustomTable from "../components/Table";
import ConfirmDialog from "../components/ConfirmDialog";

const IncomeTaxList = () => {
  const [incomeTax, setIncomeTax] = useState<any[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedIncomeTaxId, setSelectedIncomeTaxId] = useState<number | null>(
    null
  );
  const [decryptedPassword, setDecryptedPassword] = useState<{
    [key: number]: string;
  }>({});
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchIncomeTax = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await incomeTaxService.fetchIncomeTaxByCompanyId(
            companyid
          );
          setIncomeTax(
            response.data.filter((incomeTax: any) => incomeTax.active)
          );
        }
      } catch (error) {
        console.error("Error fetching income tax list", error);
      }
    };
    fetchIncomeTax();
  }, []);

  const handleView = (id: number) => navigate(`/viewIncomeTax/${id}`);
  const handleEdit = (id: number) => navigate(`/updateIncomeTax/${id}`);
  const handleDelete = async (id: number) => {
    setSelectedIncomeTaxId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedIncomeTaxId) {
      try {
        await incomeTaxService.deleteIncomeTax(selectedIncomeTaxId);
        setIncomeTax(
          incomeTax.filter((incomeTax) => incomeTax.id !== selectedIncomeTaxId)
        );
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting income tax", error);
      }
    }
    setOpenConfirmDialog(false);
  };

  const getPassword = async (id: number) => {
    try {
      const response = await incomeTaxService.decrypt(id);
      const decryptedPassword = response.decryptedPassword; // Extract the decrypted password
      setDecryptedPassword((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting password", error);
    }
  };

  const columns = [
    { label: "PAN Number", id: "panNumber" },
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
        <Typography variant="h4">Income Tax List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addIncomeTax")}
        >
          Add Income Tax
        </Button>
      </Box>
      <CustomTable
        columns={columns}
        data={incomeTax}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idKey="id"
      />

      <ConfirmDialog
        open={openConfirmDialog}
        title="Delete Income Tax"
        message="Are you sure you want to delete this income tax?"
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={confirmDelete}
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

export default IncomeTaxList;
