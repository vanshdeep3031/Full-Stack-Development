import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, CircularProgress, InputAdornment, IconButton,
  Divider, Chip
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

// ── Theme ──────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#00E5FF' },
    secondary: { main: '#FF4081' },
    background:{ default: '#050A14', paper: '#0D1626' },
    text:      { primary: '#E8F4FD', secondary: '#7A9BC0' },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h4: { fontFamily: '"Syne", sans-serif', fontWeight: 800 },
    h6: { fontFamily: '"Syne", sans-serif', fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#1E3A5F' },
            '&:hover fieldset': { borderColor: '#00E5FF55' },
            '&.Mui-focused fieldset': { borderColor: '#00E5FF', boxShadow: '0 0 0 3px #00E5FF22' },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          letterSpacing: '0.02em',
        },
      },
    },
  },
});

// ── Mock credentials ───────────────────────────────────────────────────────
const MOCK_USERS = [
  { email: 'admin@lab.com',   password: 'Admin@123',  role: 'Admin'   },
  { email: 'student@lab.com', password: 'Student@123', role: 'Student' },
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus]             = useState(null); // null | 'loading' | 'success' | 'error'
  const [message, setMessage]           = useState('');
  const [loggedUser, setLoggedUser]     = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    setStatus('loading');
    setMessage('');

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));

    const user = MOCK_USERS.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
      setStatus('success');
      setMessage(`Welcome back, ${user.role}! You are now logged in.`);
      setLoggedUser(user);
    } else {
      setStatus('error');
      setMessage('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setStatus(null);
    setMessage('');
    setLoggedUser(null);
    reset();
  };

  // ── Logged-in view ────────────────────────────────────────────────────
  if (loggedUser) {
    return (
      <ThemeProvider theme={theme}>
        <PageWrapper>
          <Card sx={cardSx}>
            <CardContent sx={{ p: 5, textAlign: 'center' }}>
              <Box sx={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg,#00E5FF,#0072FF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', mb: 3, fontSize: 32,
              }}>
                👤
              </Box>
              <Typography variant="h4" sx={{ mb: 1 }}>Authenticated!</Typography>
              <Chip label={loggedUser.role} color="primary" sx={{ mb: 3, fontWeight: 700 }} />
              <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
                {message}
              </Alert>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Signed in as <strong style={{ color: '#00E5FF' }}>{loggedUser.email}</strong>
              </Typography>
              <Button variant="outlined" color="secondary" fullWidth onClick={handleLogout}>
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </PageWrapper>
      </ThemeProvider>
    );
  }

  // ── Login view ────────────────────────────────────────────────────────
  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        <Card sx={cardSx}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg,#00E5FF22,#0072FF22)',
                border: '2px solid #00E5FF44',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mx: 'auto', mb: 2,
              }}>
                <LockOutlinedIcon sx={{ color: '#00E5FF', fontSize: 28 }} />
              </Box>
              <Typography variant="h4" sx={{ letterSpacing: '-0.5px' }}>
                Experiment 3.1.1
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Login Form · React State Management
              </Typography>
            </Box>

            {/* Alert */}
            {status === 'error' && (
              <Alert severity="error" sx={{ mb: 3 }}>{message}</Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Email */}
              <TextField
                fullWidth label="Email Address" type="email"
                margin="normal" autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {/* Password */}
              <TextField
                fullWidth label="Password"
                type={showPassword ? 'text' : 'password'}
                margin="normal" autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                        {showPassword
                          ? <VisibilityOffIcon sx={{ color: 'text.secondary' }} />
                          : <VisibilityIcon   sx={{ color: 'text.secondary' }} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              {/* Submit */}
              <Button
                type="submit" fullWidth variant="contained"
                disabled={status === 'loading'}
                sx={{
                  mt: 3, mb: 2, py: 1.5,
                  background: 'linear-gradient(90deg,#00B4D8,#0077B6)',
                  '&:hover': { background: 'linear-gradient(90deg,#00E5FF,#0096C7)' },
                  position: 'relative',
                }}
              >
                {status === 'loading'
                  ? <CircularProgress size={22} sx={{ color: '#fff' }} />
                  : 'Sign In'}
              </Button>
            </Box>

            <Divider sx={{ my: 2, borderColor: '#1E3A5F' }}>
              <Typography variant="caption" color="text.secondary">DEMO CREDENTIALS</Typography>
            </Divider>

            {/* Demo credentials */}
            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
              {MOCK_USERS.map((u) => (
                <Box key={u.email} sx={{
                  p: 1.5, borderRadius: 2,
                  border: '1px solid #1E3A5F',
                  background: '#0A1929',
                }}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    <strong style={{ color: '#00E5FF' }}>{u.role}</strong>
                    {' · '}{u.email}{' · '}{u.password}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </PageWrapper>
    </ThemeProvider>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function PageWrapper({ children }) {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 20% 50%, #0D2137 0%, #050A14 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      p: 2,
    }}>
      {children}
    </Box>
  );
}

const cardSx = {
  width: '100%', maxWidth: 460,
  background: '#0D1626',
  border: '1px solid #1E3A5F',
  boxShadow: '0 24px 80px #00000088, 0 0 0 1px #00E5FF0A',
};
