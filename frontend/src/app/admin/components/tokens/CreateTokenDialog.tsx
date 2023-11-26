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
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import 'react-datepicker/dist/react-datepicker.css';
import { VariantType, enqueueSnackbar } from 'notistack';
import { Inter } from 'next/font/google';
import { subDays } from 'date-fns';
// import styles from '../individualDashboard.module.css';

const inter = Inter({ subsets: ['latin'] });

interface PopupProps {
  title: string[];
  content: string[]
  open: boolean;
  handleClose: () => void;
  handleCreate: (userId: string, amount: number, monthlyRenew: boolean, expiresAt: Date) => void;
  userId: string;
  setWizecoins: React.Dispatch<React.SetStateAction<string>>;
}

export default function TokenDialog({
  title,
  content,
  open,
  handleClose,
  handleCreate,
  userId,
  setWizecoins,
}: PopupProps) {
  const [expiresAt, setExpiresAt] = React.useState(new Date());
  const [amount, setAmount] = React.useState(0);
  const [monthlyRenew, setMonthlyRenew] = React.useState(false);

  const showNotification = (variant: VariantType, user:string, action:string) => {
    enqueueSnackbar(`${action} ${user}`, { variant });
  };
  const handleMonthlyRenewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyRenew(event.target.checked);
  };
  const handleCreateToken = () => {
    try {
      if (
        userId === null ||
        amount === null ||
        monthlyRenew === null ||
        expiresAt === null ||
        expiresAt <= new Date() // Add this condition to check if expiresAt is greater than the current date
      ) {
        console.error('Invalid data');
        return;
      }
      handleCreate(userId, amount, monthlyRenew, expiresAt);
      setWizecoins(`${amount}`);
      showNotification('success', userId, 'Tokens added for user with id: ');
      handleClose();
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Dialog
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: '20px', background: 'linear-gradient(#343541, #172339)',
        },
      }}
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        {title.map((text, index) => (
          <React.Fragment key={index}>
            <Typography
              variant="h5"
              style={{ fontWeight: 'bold', color: index % 2 === 0 ? 'white' : '#E93D44', display: 'inline' }}
              className={`${inter.className}`}
            >
              {text}
            </Typography>
          </React.Fragment>
        ))}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content.map((text, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="body1"
                style={{ color: index % 2 === 0 ? 'white' : '#E93D44', display: 'inline' }}
                className={`${inter.className}`}
              >
                {text}
              </Typography>
            </React.Fragment>
          ))}
        </DialogContentText>
        <Box sx={{ paddingBottom: '1rem' }} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              sx={{ padding: '0 0 0.5rem 1rem', color: 'white' }}
            >
              Amount of Wizecoins:
            </Typography>
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
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box sx={{ paddingLeft: '1rem' }}>
                  <Image
                    src="/wizecoin.svg"
                    alt="Wizecoin Icon"
                    width={18}
                    height={18}
                    layout="fixed"
                  />
                </Box>
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
                  onChange={(event:any) => {
                    const newAmount: any = Number(event?.target.value);
                    if (!Number.isNaN(newAmount)) {
                      setAmount(Number(newAmount));
                      console.log(newAmount);
                    }
                  }}
                />
              </Stack>
            </Box>
          </Box>
          <Box sx={{ padding: '0 2rem 0 0' }}>
            <FormGroup sx={{ paddingBottom: '1rem' }}>
              <Tooltip title="If enabled, the wizeliner will recieve the ammount of wizecoins that you set here a month from the expiring date defined">
                <FormControlLabel
                  required
                  control={<Switch size="small" />}
                  onChange={() => handleMonthlyRenewChange}
                  label="Monthly Renew"
                />
              </Tooltip>
            </FormGroup>
            <DatePicker
              selected={expiresAt}
              onChange={(date: Date) => {
                setExpiresAt(date);
                console.log(date);
              }}
              minDate={subDays(new Date(), 0)}
              inline
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'space-between' }}>
        <Button
          onClick={handleClose}
          style={{
            color: 'white',
            backgroundColor: '#E93D44',
            borderRadius: '8px', // Add the border radius to the button
            textTransform: 'none', // Set textTransform to 'none' to prevent all caps
            padding: '0px 12px',
          }}
          className={`${inter.className}`}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleCreateToken();
          }}
          style={{
            color: 'white',
            backgroundColor: '#4BE93D',
            borderRadius: '8px', // Add the border radius to the button
            textTransform: 'none', // Set textTransform to 'none' to prevent all caps
            padding: '0px 12px',
          }}
          disabled={userId === null || amount === null || monthlyRenew === null || expiresAt === null}
          className={`${inter.className}`}
        >
          Create

        </Button>
      </DialogActions>
    </Dialog>
  );
}
