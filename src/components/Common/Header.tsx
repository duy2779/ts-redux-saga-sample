import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { logout } from 'features/auth/authSlice';

export function Header() {
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Studen management
          </Typography>
          <Button color="inherit" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
