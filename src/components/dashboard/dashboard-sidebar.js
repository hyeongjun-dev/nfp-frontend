import {useEffect, useMemo, useRef, useState} from 'react';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {Box, Button, Divider, Drawer, Grid, Link, Typography, useMediaQuery} from '@mui/material';
import {ChartPie as ChartPieIcon} from '../../icons/chart-pie';
import {Users as UsersIcon} from '../../icons/users';
import {Reports as ReportIcon} from '../../icons/reports';
import {DashboardSidebarSection} from './dashboard-sidebar-section';
import {OrganizationPopover} from './organization-popover';
import {useSelector} from "../../store";
import {useConnect} from "../../connect/auth";
import StringHelper from "../../utils/StringHelper";
import {ExternalLink} from "../../icons/external-link";
import useScrollTracker from "../../utils/useScrollTracker";

const LogoMark = () => {
  return (<Grid container sx={{flexDirection:'row', flex:1}} alignItems="center" columnSpacing={1}>
    <Grid item marginLeft={"0px"} marginTop={"2px"} >
      <img
        width={200}
        src="https://despread.s3.ap-northeast-2.amazonaws.com/logo/despread_studio_white_logo.png"
        style={{
          cursor: 'pointer',
        }}
        onClick={
          () => {
            window.location.href = `/home`;
          }
        }
      />
    </Grid>
  </Grid>)
}

const getSections = (t, chain) => {
  const chainName = chain.trim().toLowerCase();

  switch (chainName) {
    case 'aptos':
      return [
        {
          // title: t('DeSpread STUDIO'),
          items: [
            {
              title: t('Dashboard'),
              path: '/dashboard',
              icon: <ChartPieIcon fontSize="small"/>,
              disabled: true
            },
            {
              title: t('Projects'),
              path: '/projects/' + chainName,
              icon: <ReportIcon fontSize="small"/>
            },
            {
              title: t('Staking'),
              path: '/staking',
              icon: <UsersIcon fontSize="small"/>,
              disabled: true
            }
          ]
        }
      ];
    default:
      return [
        {
          // title: t('DeSpread STUDIO'),
          items: [
            {
              title: t('Dashboard'),
              path: '/dashboard',
              icon: <ChartPieIcon fontSize="small"/>
            },
            {
              title: t('Projects'),
              path: '/projects/' + chainName,
              icon: <ReportIcon fontSize="small"/>
            },
            {
              title: t('Staking'),
              path: '/staking',
              icon: <UsersIcon fontSize="small"/>
            }
          ]
        },
        {
          title: t('TOOLS'),
          items: [
            {
              title: t('NFP Telegram BOT'),
              path: 'https://t.me/NfpHelpBot',
              icon: <ExternalLink fontSize="small"/>
            },
            {
              title: t('Stacks Tracker BOT'),
              path: 'https://t.me/StacksTrackerBot',
              icon: <ExternalLink fontSize="small"/>
            },
            {
              title: t('Multi Sender'),
              path: 'https://btc.stx-multisender.com',
              icon: <ExternalLink fontSize="small"/>
            }
          ]
        }
      ];
  }
}

export const DashboardSidebar = (props) => {
  const { onClose, open, chainName } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const [selectedChain, setSelectedChain] = useState(chainName);

  let sections = useMemo(() => getSections(t, selectedChain), [t, selectedChain]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState(false);

  const {connected} = useSelector((state) => {
    if (selectedChain.trim().toUpperCase() === 'APTOS') {
      return false;
    }
    return state.connect
  });
  const {ownerStxAddress} = useConnect();
  const { scrollY, scrollPercent } = useScrollTracker();

  // console.log(`${scrollY} ${scrollPercent}`)

  const handleChange = (event) => {
    const chainName = String(event.target.value).trim().toLowerCase();
    window.location.href = `/projects/${chainName}`;
    setSelectedChain(chainName);
  };

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <Box
      sx={{
        marginTop: scrollY < 80 ? 0: -10,
        position: scrollY < 80 ? 'relative' : 'fixed',
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: 280,
      }}
    >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            mt: 3,
          }}
        >
          <div>
            <Box sx={{ p: 2}}>
              {
                !lgUp ? (
                  <Box
                    sx={{
                      alignItems: 'center',
                      // backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 3,
                      py: '10px',
                      borderRadius: 1,
                      marginBottom: 5,
                    }}
                  >
                    <LogoMark></LogoMark>
                  </Box>
                ) : <div></div>
              }
              <Box
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '10px',
                  borderRadius: 1
                }}
              >
                <div>
                  <Typography
                    color="white"
                    variant="subtitle1"
                  >
                    {selectedChain} Account
                  </Typography>
                  <Typography
                    color="neutral.400"
                    variant="body2"
                  >
                    {connected ? StringHelper.getElipsedHashAddress(ownerStxAddress) : 'wallet not connected'}
                  </Typography>
                </div>
              </Box>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 10 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2
                  }
                }}
                {...section} />
            ))}
            <Divider
              sx={{
                borderColor: '#2D3748'  // dark divider
              }}
            />
            <Box sx={{ flexGrow: 1, p: 2 }}>
              <NextLink
                href="https://twitter.com/NFP2021"
                passHref
              >
                <Link target="_blank">
                  <Button
                    color="primary"
                    component="a"
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="contained"
                  >
                    {t('Twitter')}
                  </Button>
                </Link>
              </NextLink>
            </Box>
          </Box>
        </Box>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </Box>
  );

  if (lgUp) {
    return (
      <Box sx={{
        minWidth: 280,
        borderRightColor: '#2d3748',
        borderRightStyle: 'solid',
        borderRightWidth: 1,
      }}>
        {content}
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
