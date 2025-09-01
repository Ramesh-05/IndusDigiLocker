import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import tdsService from "../services/tdsService";
import {
  Box,
  IconButton,
  Container,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { Typography } from "@mui/material";
import {
  Security,
  Delete,
  AddCircle,
  Close,
  RemoveCircle,
} from "@mui/icons-material";
import ConfirmDialog from "../components/ConfirmDialog";
import CustomTable from "../components/Table";

const TdsList = () => {
  const navigate = useNavigate();
  const [tds, setTds] = useState<any[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedTdsId, setSelectedTdsId] = useState<number | null>(null);
  const [decrytedPassword, setDecryptedPassword] = useState<{
    [key: number]: string;
  }>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTds = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await tdsService.fetchTdsByCompanyId(companyid);
          setTds(response.data.filter((tds: any) => tds.active));
        }
      } catch (error) {
        console.error("Error fetching tds list", error);
      }
    };
    fetchTds();
  }, []);

  const handleView = (id: number) => navigate(`/viewtds/${id}`);
  const handleEdit = (id: number) => navigate(`/updatetds/${id}`);
  const handleDelete = async (id: number) => {
    setSelectedTdsId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedTdsId) {
      try {
        await tdsService.deleteTds(selectedTdsId);
        setTds(tds.filter((tds) => tds.id !== selectedTdsId));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting tds", error);
      }
    }
    setOpenConfirmDialog(false);
  };

  const getPassword = async (id: number) => {
    try {
      const response = await tdsService.decrypt(id);
      const decryptedPassword = response.decryptedPassword; // Extract the decrypted password
      setDecryptedPassword((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting v2 password", error);
    }
  };

  const columns = [
    { id: "tanNo", label: "TAN Number" },
    { id: "userid", label: "User ID" },
    {
      id: "password",
      label: "Password",
      render: (row: any) => (
        <>
          {decrytedPassword[row.id] ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>{decrytedPassword[row.id]}</Typography>
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
        <Typography variant="h4">TDS List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addtds")}
        >
          Add New
        </Button>
      </Box>

      <CustomTable
        data={tds}
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
        title="Delete TDS"
        message="Are you sure you want to delete this TDS?"
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

export default TdsList;
