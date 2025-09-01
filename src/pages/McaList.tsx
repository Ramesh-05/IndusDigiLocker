import {
  Container,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import {
  AddCircle,
  Delete,
  Security,
  Lock,
  Close,
  RemoveCircle,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import McaService from "../services/McaService";
import ConfirmDialog from "../components/ConfirmDialog";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "../components/Table";

const McaList = () => {
  const navigate = useNavigate();
  const [mcas, setMcas] = useState<any[]>([]);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedMcaId, setSelectedMcaId] = useState<number | null>(null);
  const [decryptedV2Password, setDecryptedV2Password] = useState<{
    [key: number]: string;
  }>({});
  const [decryptedV3Password, setDecryptedV3Password] = useState<{
    [key: number]: string;
  }>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchMcas = async () => {
      try {
        const companyid = localStorage.getItem("companyid");
        if (companyid) {
          const response = await McaService.fetchMcaByCompanyId(companyid);
          setMcas(response.data.filter((mca: any) => mca.active));
        }
      } catch (error) {
        console.error("Error fetching mca list", error);
      }
    };
    fetchMcas();
  }, []);

  const handleView = (id: number) => navigate(`/viewmca/${id}`);
  const handleEdit = (id: number) => navigate(`/updatemca/${id}`);
  const handleDelete = async (id: number) => {
    setSelectedMcaId(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedMcaId) {
      try {
        await McaService.deleteMca(selectedMcaId);
        setMcas(mcas.filter((mca) => mca.id !== selectedMcaId));
        setOpenConfirmDialog(false);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 2000);
      } catch (error) {
        console.error("Error deleting mca", error);
      }
    }
    setOpenConfirmDialog(false);
  };

  const getV2Password = async (id: number) => {
    try {
      const response = await McaService.decrypt(id);
      const decryptedPassword = response.decryptedPassword; // Extract the decrypted password
      setDecryptedV2Password((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting v2 password", error);
    }
  };

  const getV3Password = async (id: number) => {
    try {
      const response = await McaService.decryptTP(id);
      const decryptedPassword = response.decryptedPassword; // Extract the decrypted password
      setDecryptedV3Password((prev) => ({ ...prev, [id]: decryptedPassword }));
    } catch (error) {
      console.error("Error decrypting v3 password", error);
    }
  };

  const columns = [
    { label: "CIN", id: "cin" },
    { label: "V2 Login Id", id: "v2loginid" },
    {
      label: "V2 Password",
      id: "v2password",
      render: (row: any) => (
        <>
          {decryptedV2Password[row.id] ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>
                {decryptedV2Password[row.id]}
              </Typography>
              <IconButton
                onClick={() =>
                  setDecryptedV2Password((prev) => ({ ...prev, [row.id]: "" }))
                }
                color="error"
              >
                <Delete />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={() => getV2Password(row.id)} color="primary">
              <Security />
            </IconButton>
          )}
        </>
      ),
    },
    { label: "V3 Login Id", id: "v3loginid" },
    {
      label: "V3 Password",
      id: "v3password",
      render: (row: any) => (
        <>
          {decryptedV3Password[row.id] ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>
                {decryptedV3Password[row.id]}
              </Typography>
              <IconButton
                onClick={() =>
                  setDecryptedV3Password((prev) => ({ ...prev, [row.id]: "" }))
                }
                color="error"
              >
                <Delete />
              </IconButton>
            </Box>
          ) : (
            <IconButton onClick={() => getV3Password(row.id)} color="primary">
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
        <Typography variant="h4">MCA List</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircle />}
          onClick={() => navigate("/addmca")}
        >
          Add New
        </Button>
      </Box>

      <CustomTable
        data={mcas}
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
        title="Delete MCA"
        message="Are you sure you want to delete this MCA?"
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

export default McaList;
