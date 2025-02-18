import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { VehicleList } from './components/VehicleList/VehicleList';
import { VehicleDetail } from './components/VehicleDetail/VehicleDetail';
import { NewVehicle } from './pages/NewVehicle';
import { EditVehicle } from './pages/EditVehicle';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#00004BDE',
    },
    secondary: {
      main: '#00004B99',
    },
    background: {
      default: '#EEEEF5',
      paper: '#EEEEF5',
    },
    text: {
      primary: '#00004BDE',
      secondary: '#00004B99',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
        containedPrimary: {
          backgroundColor: '#0067E6',
          '&:hover': {
            backgroundColor: '#0052B8'
          }
        },
        outlinedError: {
          color: '#E61F00',
          borderColor: '#E61F00',
          backgroundColor: 'transparent',
          '&:hover': {
            borderColor: '#B81900',
            backgroundColor: 'rgba(230, 31, 0, 0.04)'
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/vehicles" replace />} />
              <Route path="/vehicles" element={<VehicleList />} />
              <Route path="/vehicles/new" element={<NewVehicle />} />
              <Route path="/vehicles/:id" element={<VehicleDetail />} />
              <Route path="/vehicles/:id/edit" element={<EditVehicle />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
