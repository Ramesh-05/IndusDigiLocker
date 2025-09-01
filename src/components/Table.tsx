import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, TextField, IconButton, Box, Typography, Card, CardContent, Button
} from "@mui/material";
import { Visibility, Edit, Delete, Lock, Security, ChangeCircle } from "@mui/icons-material";
import bankService from "../services/bankService"; // Import bank service

interface Column {
  id: string;
  label: string;
  align?: "center" | "left" | "right";
  render?: (row: any) => React.ReactNode; // Optional render function for custom UI
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  idKey: string; 
  onView?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onChange?: (id: number) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data, idKey, onView, onEdit, onDelete, onChange }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  // State to store decrypted passwords
  const [decryptedPassword, setDecryptedPassword] = useState<{ id: number; password: string } | null>(null);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) => typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Function to decrypt password and show it
  const handleDecryptPassword = async (id: number, type: "login" | "transaction") => {
    try {
      const decrypted = type === "login"
        ? await bankService.decrypt(id) // Call API for login password
        : await bankService.decryptTP(id); // Call API for transaction password

      setDecryptedPassword({ id, password: decrypted });
    } catch (error) {
      console.error(`Error decrypting ${type} password:`, error);
    }
  };

  // Function to clear decrypted password
  const clearDecryptedPassword = () => setDecryptedPassword(null);

  return (
    <Paper sx={{ padding: 2, mb: 4 }}>
      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "300px" }}
        />
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"} sx={{ fontWeight: "bold" }}>
                  {column.label}
                </TableCell>
              ))}
              {(onView || onEdit || onDelete || onChange) && <TableCell align="center"><b>Actions</b></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align || "left"}>
                    {column.render ? column.render(row) : row[column.id]}
                  </TableCell>
                ))}
                {/* Action Buttons */}
                {(onView || onEdit || onDelete || onChange) && (
                  <TableCell align="center">
                    {onView && (
                      <IconButton title="View" onClick={() => onView(row[idKey])} color="primary">
                        <Visibility />
                      </IconButton>
                    )}
                    {onEdit && (
                      <IconButton title="Edit" onClick={() => onEdit(row[idKey])} color="secondary">
                        <Edit />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton title="Delete" onClick={() => onDelete(row[idKey])} color="error">
                        <Delete />
                      </IconButton>
                    )}
                    {onChange && (
                      <IconButton title="Change Company" onClick={() => onChange(row[idKey])} color="error">
                        <ChangeCircle color="success" />
                      </IconButton>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Decrypted Password Display */}
      {decryptedPassword && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            backgroundColor: "white",
            padding: 2,
            borderRadius: 2,
            boxShadow: 3
          }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6">Decrypted Password</Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>
                {decryptedPassword.password}
              </Typography>
              <Button onClick={clearDecryptedPassword} variant="contained" color="primary" sx={{ mt: 2 }}>
                Close
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;
