import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Container,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { vehicleApi } from '../../api/vehicleApi';
import { useNavigate } from 'react-router-dom';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';

export const VehicleList: React.FC = () => {
  const navigate = useNavigate();
  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['vehicles'],
    queryFn: vehicleApi.getVehicles,
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 600, color: 'text.primary', opacity: 0.8 }}
          >
            Vehicles
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/vehicles/new')}
            sx={{ px: 3, fontSize: '14px', fontWeight: 600 }}
          >
            New vehicle
          </Button>
        </Box>
        <Paper>
          <List sx={{ py: '8px', px:'16px', backgroundColor:'white', borderRadius: '8px', border: '1px solid #00004B29', paddingTop: '8px'}}>
            {vehicles?.map((vehicle, index) => (
              <ListItem
                key={vehicle.id}
                disablePadding
                sx={{backgroundColor: 'white', borderRadius: '8px'}}
                divider={index !== vehicles.length - 1}
              >
                  <ListItemButton
                      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                      sx={{py: 2, backgroundColor: 'transparent'}}
                  >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="40" fill="white" fill-opacity="0.01"/>
                          <rect width="40" height="40" rx="20" fill="#00004B"/>
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M29.499 21.1561V15.8526H29.4987C29.4987 15.4086 29.4987 14.9646 29.4988 14.5206C29.4989 13.1872 29.499 11.8537 29.4981 10.5202C29.4978 10.1138 29.1815 9.80038 28.7768 9.80038C27.554 9.7998 26.3315 9.80009 25.1087 9.80038L25.1084 9.80038C25.0676 9.80038 25.0259 9.80096 24.986 9.8082C24.6291 9.87303 24.3851 10.1671 24.3851 10.5344V18.4067C24.3851 18.6154 24.385 18.8242 24.3849 19.0331C24.3847 19.5549 24.3845 20.0769 24.3857 20.5989C24.3869 20.9778 24.7044 21.3089 25.0749 21.3095C25.8928 21.3108 26.7106 21.3109 27.5284 21.311C28.1577 21.3111 28.7869 21.3112 29.4162 21.3118C29.479 21.3118 29.5062 21.2918 29.4993 21.2284C29.4975 21.2121 29.498 21.1956 29.4985 21.1792C29.4987 21.1714 29.499 21.1637 29.499 21.1561ZM22.7993 22.6137V16.9774H22.7984C22.7984 16.3528 22.7985 15.7282 22.7985 15.1035C22.7987 13.8542 22.7988 12.6048 22.7984 11.3556C22.7981 10.9095 22.4166 10.5686 21.9738 10.6143C21.7845 10.634 21.5952 10.6513 21.4056 10.6681C21.2593 10.6812 21.113 10.6936 20.9667 10.706C20.7098 10.7278 20.4529 10.7496 20.1963 10.7747C19.5419 10.8389 18.8886 10.9153 18.2371 11.0062C17.4087 11.1217 16.5838 11.2583 15.7624 11.4163C14.6492 11.6302 13.547 11.8913 12.4491 12.1735C11.7649 12.3492 11.1796 12.678 10.7246 13.2233C10.2546 13.7869 10.0042 14.4381 10.003 15.1707C9.99887 17.7523 9.99988 20.3339 10.0009 22.9155C10.0012 23.5609 10.0014 24.2063 10.0016 24.8517C10.0016 24.9405 10.0071 25.0303 10.019 25.1182C10.0977 25.6971 10.3475 26.1874 10.7868 26.5762C11.2253 26.964 11.7385 27.1629 12.3241 27.1707C12.599 27.1741 12.874 27.173 13.149 27.1698C13.2164 27.1689 13.2442 27.1889 13.2607 27.2575C13.4894 28.2054 14.0135 28.9528 14.8243 29.4885C15.6087 30.0072 16.4764 30.1878 17.407 30.0509C18.1595 29.9401 18.8136 29.6188 19.3668 29.0989C19.9063 28.5918 20.2652 27.9768 20.4339 27.254C20.4493 27.1889 20.4777 27.1698 20.5419 27.1698C22.0447 27.1715 23.5472 27.1715 25.0497 27.1698C25.1128 27.1698 25.1377 27.1904 25.151 27.2511C25.2074 27.5113 25.296 27.7611 25.4118 28.0008C25.6925 28.582 26.0986 29.0584 26.6266 29.4283C27.2639 29.8746 27.9751 30.0949 28.7528 30.0923C29.1456 30.0911 29.4886 29.7716 29.4952 29.3927C29.5016 29.0326 29.5005 28.6724 29.4994 28.3123C29.4989 28.1322 29.4983 27.9522 29.4987 27.7721C29.4987 27.7119 29.4796 27.7087 29.4304 27.7345C28.8084 28.0593 28.0367 27.9209 27.5748 27.3828C27.096 26.8251 27.1093 25.9365 27.6138 25.4016C28.0558 24.933 28.7985 24.8172 29.3954 25.124C29.4758 25.1654 29.4816 25.1631 29.4816 25.0783C29.4817 24.8283 29.4817 24.5783 29.4817 24.3283C29.4817 23.8282 29.4817 23.3281 29.4825 22.8282C29.4825 22.7674 29.4628 22.737 29.3991 22.7419C29.3816 22.7431 29.3639 22.7427 29.3462 22.7423C29.3373 22.7421 29.3284 22.7419 29.3195 22.7419H22.9307C22.8431 22.7419 22.7993 22.6992 22.7993 22.6137ZM11.6161 16.5612H13.8014H15.965C16.0406 16.5612 16.0784 16.5976 16.0784 16.6706V19.5071C16.0784 19.5787 16.0424 19.6145 15.9705 19.6145H11.6144C11.5064 19.6145 11.5064 19.6142 11.5064 19.5054V16.6688C11.5064 16.5612 11.5067 16.5612 11.6161 16.5612ZM18.3074 26.2474C18.3204 26.3214 18.3251 26.3958 18.3242 26.4711H18.3245C18.319 26.8314 18.2183 27.1681 17.9641 27.4219C17.7115 27.6743 17.4075 27.8639 17.0385 27.9206C16.2064 28.0488 15.4477 27.428 15.3508 26.6297C15.3024 26.2329 15.4179 25.8731 15.6715 25.5646C15.9406 25.2372 16.2943 25.0635 16.7158 25.0279C17.1294 24.9929 17.4993 25.107 17.8194 25.3689C18.0967 25.5955 18.2452 25.8986 18.3074 26.2474Z"
                                fill="white"/>
                      </svg>
                      <ListItemText
                          sx={{ml: 2}}
                          primary={
                              <Typography
                                  variant="subtitle1"
                                  component="span"
                                  sx={{fontWeight: 500}}
                              >
                                  {vehicle.licensePlate}
                              </Typography>
                          }
                          secondary={
                              <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{mt: 0, opacity: 0.6}}
                              >
                                  {vehicle.customName}
                              </Typography>
                          }
                      />
                  </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};
