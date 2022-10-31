import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {DashboardNavbar} from './dashboard-navbar';
import {DashboardSidebar} from './dashboard-sidebar';
import {Box} from '@mui/material';
import {setConnected} from "../../slices/connect";
import {useConnect} from "../../connect/auth";
import {useDispatch} from "../../store";
import {Connect} from '@stacks/connect-react';
import {useSettings} from "../../hooks/use-settings";

const DashboardLayoutRoot = styled('div')(({theme}) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const {children} = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {authOptions, userSession} = useConnect()
  const dispatch = useDispatch();

  const { settings, saveSettings } = useSettings();
  const fixedSettings = {
    direction: 'ltr',
    responsiveFontSizes: true,
    theme: 'light'
  }

  useEffect(() => {
    saveSettings(fixedSettings);
    dispatch(setConnected(userSession.isUserSignedIn()))
  }, userSession)

  return (
    <>
      <Connect authOptions={authOptions}>
        <DashboardLayoutRoot>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {children}
          </Box>
        </DashboardLayoutRoot>
      </Connect>
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)}/>
      <DashboardSidebar
        onClose={() => setIsSidebarOpen(false)}
        open={isSidebarOpen}
        chainName={() => {
          const pathName = window.location.pathname;
          if (pathName.toUpperCase().trim().indexOf('APTOS') !== -1) {
            return 'Aptos';
          }

          return 'Stacks';
        }}
      />
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
