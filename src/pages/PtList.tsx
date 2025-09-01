import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ptService from "../services/ptService";
import {
  Box,
  Container,
  Button,
  Typography,
  IconButton,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import ConfirmDialog from "../components/ConfirmDialog";
import CustomTable from "../components/Table";
import {
  Lock,
  Delete,
  AddCircle,
  Close,
  RemoveCircle,
} from "@mui/icons-material";

const PtList = () => {
  const navigate = useNavigate();
  const [pt, setPt] = useState<any[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedPtId, setSelectedPtId] = useState<number | null>(null);
  const [decryptedPassword, setDecryptedPassword] = useState<{
    [key: number]: string;
  }>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPt = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await ptService.fetchPtByCompanyId(companyid);
          setPt(response.data.filter((pt: any) => pt.active));
        }
      } catch (error) {
        console.error("Error fetching pt list", error);
      }
    };
    fetchPt();
  }, []);

  const handleView = (id: number) => navigate(`/viewpt/${id}`);
  const handleEdit = (id: number) => navigate(`/updatept/${id}`);
  const handleDelete = async (id: number) => {
    setSelectedPtId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedPtId) {
      try {
        await ptService.deletePt(selectedPtId);
        setPt(pt.filter((pt) => pt.id !== selectedPtId));
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting pt", error);
      }
    }
    setOpenConfirmDialog(false);
  };

  const getPassword = async (id: number) => {
    try {
      const response = await ptService.decrypt(id);
      const decryptedPassword = response.decryptedPassword;
      setDecryptedPassword((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting password", error);
    }
  };

  const columns = [
    { label: "PTIN Company", id: "ptinCom" },
    { label: "PTIN Salary", id: "ptinSal" },
    { label: "State/Tax Circle", id: "taxCircle" },
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
        <Typography variant="h4">PT List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addpt")}
        >
          Add PT
        </Button>
      </Box>
      <CustomTable
        data={pt}
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
        title="Delete PT"
        message="Are you sure you want to delete this PT?"
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

export default PtList;
