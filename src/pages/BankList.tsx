import { AddCircle, Delete, Security, Lock, RemoveCircle, Close } from '@mui/icons-material';
import { Button, IconButton, Snackbar, SnackbarContent } from '@mui/material';
import { Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import bankService from '../services/bankService';
import ConfirmDialog from '../components/ConfirmDialog';
import CustomTable from '../components/Table';

const BankList = () => {
    const navigate = useNavigate();
    const [banks, setBanks] = useState<any[]>([]);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
    const [decryptedPassword, setDecryptedPassword] = useState<{ [key: number]: string }>({});
    const [decryptedTransactionPassword, setDecryptedTransactionPassword] = useState<{ [key: number]: string }>({});
    const [open, setOpen] = useState(false);
  
    // Fetch bank list
    useEffect(() => {
      const fetchBanks = async () => {
        try {
          const companyid = localStorage.getItem("companyid");
          if (companyid) {
            const response = await bankService.fetchBankByCompanyId(companyid);
            setBanks(response.data.filter((bank: any) => bank.active));
          }
        } catch (error) {
          console.error("Error fetching bank list", error);
        }
      };
      fetchBanks();
    }, []);
    
    const handleView = (id: number) => navigate(`/viewbank/${id}`);
  const handleEdit = (id: number) => navigate(`/updatebank/${id}`);
    // Handle delete confirmation
    const handleDelete = async (id: number) => {
      setSelectedBankId(id);
      setOpenConfirmDialog(true);
    };
  
    const confirmDelete = async () => {
      if (selectedBankId) {
        try {
          await bankService.deleteBank(selectedBankId);
          setBanks(banks.filter((bank) => bank.id !== selectedBankId));
          setOpen(true);
          setTimeout(() => {
          setOpen(false);
          }, 2000);
        } catch (error) {
          console.error("Error deleting bank", error);
        }
      }
      setOpenConfirmDialog(false);
    };
  
    // Fetch decrypted login password
    const getDecryptedPassword = async (id: number) => {
      try {
        const decrypted = await bankService.decrypt(id);
        setDecryptedPassword((prev) => ({ ...prev, [id]: decrypted }));
      } catch (error) {
        console.error("Error decrypting login password", error);
      }
    };
  
    // Fetch decrypted transaction password
    const getDecryptedTransactionPassword = async (id: number) => {
      try {
        const decrypted = await bankService.decryptTP(id);
        setDecryptedTransactionPassword((prev) => ({ ...prev, [id]: decrypted }));
      } catch (error) {
        console.error("Error decrypting transaction password", error);
      }
    };
  
    // Define table columns
    const columns = [
      { id: "bankName", label: "Bank Name" },
      { id: "bankAccountNumber", label: "Account Number" },
      { id: "accountType", label: "Account Type" },
      { id: "loginid", label: "Login ID" },
      {
        id: "loginPassword",
        label: "Login Password",
        render: (row: any) => (
          <>
            {decryptedPassword[row.id] ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }}>{decryptedPassword[row.id]}</Typography>
                <IconButton onClick={() => setDecryptedPassword((prev) => ({ ...prev, [row.id]: "" }))} color="error">
                  <Delete />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => getDecryptedPassword(row.id)} color="primary">
                <Lock />
              </IconButton>
            )}
          </>
        ),
      },
      {
        id: "transactionPassword",
        label: "Transaction Password",
        render: (row: any) => (
          <>
            {decryptedTransactionPassword[row.id] ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 1 }}>{decryptedTransactionPassword[row.id]}</Typography>
                <IconButton onClick={() => setDecryptedTransactionPassword((prev) => ({ ...prev, [row.id]: "" }))} color="error">
                  <Delete />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => getDecryptedTransactionPassword(row.id)} color="secondary">
                <Security />
              </IconButton>
            )}
          </>
        ),
      },
    ];
    
  

    return (
      
        <Container sx={{ mt: 4 }}>
        {/* Add New Bank Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4">Bank List</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircle />}
            onClick={() => navigate("/addbank")}
          >
            Add New
          </Button>
        </Box>
  
        {/* Bank List Table */}
        <CustomTable data={banks}  onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        idKey="id" 
        columns={columns} />
        
        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          onConfirm={confirmDelete}
          title="Delete Bank"
          message="Are you sure you want to delete this bank?"
        />

        <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <SnackbarContent
                message={
                  <span style={{ display: "flex", alignItems: "center", fontWeight: 700 }}>
                    <RemoveCircle style={{ marginRight: 8 }} />
                    deleted successfully!
                  </span>
                }
                  action={
                    <Button variant="text" sx={{color:"#fff"}} onClick={() => setOpen(false)}><Close /></Button>
                  }
                  style={{ backgroundColor: "#f01405", color: "#fff",borderRadius: 10, border: 'none' }}
                />
              </Snackbar>
      </Container>
    );
  }

export default BankList
