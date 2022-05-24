import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import Student from 'features/student';
import AddEditPage from 'features/student/pages/AddEditPage';
import ListPage from 'features/student/pages/ListPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Student />}>
            <Route index element={<ListPage />} />
            <Route path="add" element={<AddEditPage />} />
            <Route path=":studentId" element={<AddEditPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
