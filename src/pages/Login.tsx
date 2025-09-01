import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import login_bg from '../assets/login_bg3.avif';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleLogin = async () => {
    // Reset messages
    setErrorMessage(null);
    setSuccessMessage(null);

    // Frontend validations
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }
    if (password.trim() === '') {
      setErrorMessage('Password cannot be empty.');
      return;
    }

    setLoading(true); // Show loading indicator
    try {
      // Call the backend API
      const response = await login(email, password);

      // If login is successful
      const token = response.data.body.token;
      const adminId = response.data.body.id;
      localStorage.setItem('token', token);
      localStorage.setItem('adminId', adminId);
      localStorage.setItem('isLogged', 'true');
      if (response.data.statusCodeValue !== 201) {
        setErrorMessage(response.data.body.message || 'Login failed. Please try again.');
        return;
      }
      setSuccessMessage(response.data.body.message || 'Login successful!');
      setTimeout(() => navigate('/companylist'), 2000); 
    } catch (error: any) {
      // Handle backend errors
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.body.message);
      } else if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid email or password.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mb: 4 , mt: 4, backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px' }}>
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Login</Typography>
      </Box>

      {/* Success Message */}
      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errorMessage && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
        helperText={!!errorMessage && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email format.' : ''}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errorMessage && password.trim() === ''}
        helperText={!!errorMessage && password.trim() === '' ? 'Password cannot be empty.' : ''}
      />
      <Box mt={2} textAlign="center">
        {loading ? (
          <CircularProgress />
        ) : (
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Box>
      <Box mt={2} textAlign="center">
        <Button onClick={() => navigate('/forgot-password')} sx={{fontWeight: '700'}} >Forgot Password?</Button>
      </Box>
      <Box mt={2} textAlign="center">
        <Button onClick={() => navigate('/register')} sx={{fontWeight: '700'}} >New User? Register</Button>
      </Box>
    </Container>
  );
};

export default LoginPage;