import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gstService from "../services/gstService";
import {
  IconButton,
  Box,
  Typography,
  Container,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import {
  AddCircle,
  Close,
  Delete,
  Lock,
  RemoveCircle,
} from "@mui/icons-material";
import ConfirmDialog from "../components/ConfirmDialog";
import CustomTable from "../components/Table";

const GstList = () => {
  const navigate = useNavigate();
  const [gst, setGst] = useState<any[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedGstId, setSelectedGstId] = useState<number | null>(null);
  const [decryptedPassword, setDecryptedPassword] = useState<{
    [key: number]: string;
  }>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchGst = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await gstService.fetchGstByCompanyId(companyid);
          setGst(response.data.filter((gst: any) => gst.active));
        }
      } catch (error) {
        console.error("Error fetching gst list", error);
      }
    };
    fetchGst();
  }, []);

  const handleView = (id: number) => navigate(`/viewgst/${id}`);
  const handleEdit = (id: number) => navigate(`/updategst/${id}`);
  const handleDelete = async (id: number) => {
    setSelectedGstId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedGstId) {
      try {
        await gstService.deleteGst(selectedGstId);
        setGst(gst.filter((gst) => gst.id !== selectedGstId));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting gst", error);
      }
    }
    setOpenConfirmDialog(false);
  };

  const getPassword = async (id: number) => {
    try {
      const response = await gstService.decrypt(id);
      const decryptedPassword = response.decryptedPassword;
      setDecryptedPassword((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting password", error);
    }
  };

  const columns = [
    { label: "GST Number", id: "gstNumber" },
    { label: "State", id: "state" },
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
        <Typography variant="h4">GST List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addgst")}
        >
          Add New
        </Button>
      </Box>

      <CustomTable
        data={gst}
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
        title="Delete GST"
        message="Are you sure you want to delete this GST?"
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

export default GstList;
