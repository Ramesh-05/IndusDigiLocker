import React, { useState } from 'react'
import BankList from '../pages/BankList';
import { Send } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Typography, TextField, Box } from '@mui/material';
import { Verify } from 'crypto';
import { type } from 'os';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendotp, verifyotp } from '../services/authService';

const BankOTP = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
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
            navigate('/banklist');
          } catch (error) {
            alert('Invalid OTP.');
          }
        };
  return (
    <Container maxWidth="xs">
      <Box mt={5} textAlign="center">
        <Typography variant="h4">Verification</Typography>
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

    </Container>

    );
}

export default BankOTP
