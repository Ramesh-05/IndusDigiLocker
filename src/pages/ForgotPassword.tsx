import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendotp, verifyotp, resetPassword } from '../services/authService';
import login_bg from '../assets/login_bg8.avif';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await sendotp(email);
      alert('OTP sent to your email.');
      setStep(2);
    } catch (error) {
      alert('Failed to send OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyotp(email, otp);
      alert('OTP verified successfully.');
      setStep(3);
    } catch (error) {
      alert('Invalid OTP.');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await resetPassword(email, newPassword,otp);
      alert('Password reset successful. Please log in.');
      navigate('/');
    } catch (error) {
      alert('Password reset failed.');
    }
  };

  return (
    <Container maxWidth="xs" sx={{backgroundColor: '#d05cfa', borderRadius: '10px', padding: '20px'}}>
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Forgot Password</Typography>
      </Box>

      {step === 1 && (
        <>
          <TextField fullWidth margin="normal" label="Enter your Email" type="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button fullWidth variant="contained" color="primary" onClick={handleSendOtp}>Send OTP</Button>
        </>
      )}

      {step === 2 && (
        <>
          <TextField fullWidth margin="normal" label="Enter OTP" variant="outlined" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <Button fullWidth variant="contained" color="primary" onClick={handleVerifyOtp}>Verify OTP</Button>
        </>
      )}

      {step === 3 && (
        <>
          <TextField fullWidth margin="normal" label="New Password" type="password" variant="outlined" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <TextField fullWidth margin="normal" label="Confirm Password" type="password" variant="outlined" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <Button fullWidth variant="contained" color="primary" onClick={handleResetPassword}>Submit</Button>
        </>
      )}
      <Box mt={2} textAlign="center">
        <Button onClick={() => navigate('/')} sx={{fontWeight: '700', color: '#000'}}>Login</Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
