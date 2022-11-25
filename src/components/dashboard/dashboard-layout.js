import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DashboardNavbar} from './dashboard-navbar';
import {DashboardSidebar} from './dashboard-sidebar';
import {Box} from '@mui/material';
import {setConnected} from "../../slices/connect";
import {useConnect} from "../../connect/auth";
import {useDispatch} from "../../store";
import {Connect} from '@stacks/connect-react';
import {useSettings} from "../../hooks/use-settings";


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
        <DashboardNavbar hasConnect={true} onOpenSidebar={() => setIsSidebarOpen(true)}/>
        <div
          style={{
            display:'flex',
            flexDirection:'row',
            flex:1,
            background: 'linear-gradient(to right bottom, #192039, #283779)',
          }}
        >
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
          <Box sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            alignItems:'flex-start',
            // paddingLeft: lgUp ? 6 : 0,
            marginTop: -3
          }}>
            {children}
          </Box>
        </div>
      </Connect>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
