/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import DatePicker from 'react-datepicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../components/individualDashboard.module.css';

interface PopupProps {
  open: boolean;
  handleClose: () => void;
  handleCreate: (userId: string, amount: number, monthlyRenew: boolean, expiresAt: Date) => void;
  userId: string;
}

export default function TokenDialog({
  open,
  handleClose,
  handleCreate,
  userId,
}: PopupProps) {
  const [monthlyWizecoinsInput, setMonthlyWizecoinsInput] = React.useState('');
  const [expiresAt, setExpiresAt] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
  const [monthlyRenew, setMonthlyRenew] = React.useState(false);

  const handleMonthlyWizecoinsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyWizecoinsInput(event.target.value);
  };
  const handleMonthlyRenewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyRenew(event.target.checked);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are creting a New token, Caution! This token will overwrite any already existing token.
        </DialogContentText>
        <TextField
          value={monthlyWizecoinsInput}
          variant="outlined"
          fullWidth
          InputProps={{
            style: {
              color: '#4BE93D',
              marginLeft: '0rem',
              margin: '0rem',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent', // sin enfoque
              },
              '&:hover fieldset': {
                borderColor: 'transparent', // por encima
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent', // enfocado
              },
            },
          }}
          InputLabelProps={{ style: { color: 'white' } }}
          onChange={handleMonthlyWizecoinsChange}
        />
        <DatePicker selected={expiresAt} onChange={(date: Date) => setExpiresAt(date)} />
        <FormGroup>
          <FormControlLabel required control={<Switch size="small" />} onChange={() => handleMonthlyRenewChange} label="Monthly Renew" />
        </FormGroup>
        <Box sx={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          border: '2px solid grey',
          borderRadius: '25px',
          margin: '0 10px',
          width: '185px',
          height: '40px',
        }}
        >
          <Stack direction="row" alignItems="left" marginTop="0.25rem" marginLeft="1rem">
            <object data="/wizecoin.svg" className={styles.microimage} title="wizecoin" />
            <TextField
              value={amount}
              variant="outlined"
              fullWidth
              InputProps={{
                style: {
                  color: '#4BE93D',
                  marginLeft: '0rem',
                  margin: '0rem',
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'transparent', // sin enfoque
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent', // por encima
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent', // enfocado
                  },
                },
              }}
              InputLabelProps={{ style: { color: 'white' } }}
              onChange={(event) => {
                const newAmount: any = event?.target.value;
                setAmount(Number(newAmount));
              }}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => handleCreate(userId, amount, monthlyRenew, expiresAt)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
