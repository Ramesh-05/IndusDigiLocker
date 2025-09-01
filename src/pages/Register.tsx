import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import login_bg from '../assets/login_bg7.avif';

const RegisterPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({
    userName: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const navigate = useNavigate();

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleRegister = async () => {
    // Reset messages
    setErrorMessage(null);
    setSuccessMessage(null);
  
    // Frontend validations
    if (!/^[a-zA-Z0-9_]{3,15}$/.test(userName)) {
      setErrorMessage('Username must be 3-15 characters long and can only contain letters, numbers, and underscores.');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setErrorMessage('Mobile number must be 10 digits.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Invalid email format.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
  
    try {
      
      const response = await register(userName, email, mobile, password);
      if (response.data.statusCodeValue !== 201) {
        setErrorMessage(response.data.body.message || 'Registration failed. Please try again.');
        return;
      }
      setSuccessMessage(response.data.body.message || 'Registration successful! Please log in.');
      setTimeout(() => navigate('/'), 2000); 
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.response && error.response.status === 400) {
        setErrorMessage('Bad request. Please check your input.');
      } else {
        setErrorMessage('Registration failed. Please try again.');
      }
    }
  };
  return (
    <Container maxWidth="xs" sx={{ mb: 4, backgroundColor: '#0b7d6e', padding: '20px', borderRadius: '10px' }}>
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Register</Typography>
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
        label="Username"
        variant="outlined"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        onBlur={() => handleBlur('userName')}
        error={touched.userName && !/^[a-zA-Z0-9_]{3,15}$/.test(userName)} // Red border
        helperText={
          touched.userName && !/^[a-zA-Z0-9_]{3,15}$/.test(userName)
            ? 'Username must be 3-15 characters long and can only contain letters, numbers, and underscores.'
            : ''
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Mobile"
        type="tel"
        variant="outlined"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        onBlur={() => handleBlur('mobile')}
        error={touched.mobile && !/^\d{10}$/.test(mobile)} // Red border
        helperText={
          touched.mobile && !/^\d{10}$/.test(mobile)
            ? 'Mobile number must be 10 digits.'
            : ''
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur('email')}
        error={touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)} // Red border
        helperText={
          touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? 'Invalid email format.'
            : ''
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur('password')}
        error={touched.password && password.length < 8} // Red border
        helperText={
          touched.password && password.length < 8
            ? 'Password must be at least 8 characters long.'
            : ''
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        onBlur={() => handleBlur('confirmPassword')}
        error={touched.confirmPassword && password !== confirmPassword} // Red border
        helperText={
          touched.confirmPassword && password !== confirmPassword
            ? 'Passwords do not match.'
            : ''
        }
      />
      <Button fullWidth variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
        Register
      </Button>
      <Box mt={2} textAlign="center">
        <Button onClick={() => navigate('/')} sx={{fontWeight: '700', color: '#000'}} >Already Registered? Login</Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;