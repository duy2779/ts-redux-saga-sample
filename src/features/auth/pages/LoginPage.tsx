import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { login } from '../authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const { logging } = useAppSelector((state) => state.auth);

  const handleLoginClick = () => {
    dispatch(login({ username: '', password: '' }));
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={handleLoginClick}>
            {logging ? <CircularProgress size={22} color="secondary" /> : 'Fake Login'}
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
