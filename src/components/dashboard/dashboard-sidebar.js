import { useEffect, useMemo, useRef, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer, Grid, Grow, Link,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Calendar as CalendarIcon } from '../../icons/calendar';
import { Cash as CashIcon } from '../../icons/cash';
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar';
import { ChartPie as ChartPieIcon } from '../../icons/chart-pie';
import { ChatAlt2 as ChatAlt2Icon } from '../../icons/chat-alt2';
import { ClipboardList as ClipboardListIcon } from '../../icons/clipboard-list';
import { CreditCard as CreditCardIcon } from '../../icons/credit-card';
import { Home as HomeIcon } from '../../icons/home';
import { LockClosed as LockClosedIcon } from '../../icons/lock-closed';
import { Mail as MailIcon } from '../../icons/mail';
import { MailOpen as MailOpenIcon } from '../../icons/mail-open';
import { Newspaper as NewspaperIcon } from '../../icons/newspaper';
import { OfficeBuilding as OfficeBuildingIcon } from '../../icons/office-building';
import { ReceiptTax as ReceiptTaxIcon } from '../../icons/receipt-tax';
import { Selector as SelectorIcon } from '../../icons/selector';
import { Share as ShareIcon } from '../../icons/share';
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag';
import { ShoppingCart as ShoppingCartIcon } from '../../icons/shopping-cart';
import { Truck as TruckIcon } from '../../icons/truck';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Users as UsersIcon } from '../../icons/users';
import { XCircle as XCircleIcon } from '../../icons/x-circle';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import { OrganizationPopover } from './organization-popover';
import {useSelector} from "../../store";
import {useConnect} from "../../connect/auth";
import StringHelper from "../../utils/StringHelper";
import {ExternalLink} from "../../icons/external-link";

const getSections = (t) => [
  {
    title: t('NFP MAIN STUDIO'),
    items: [
      {
        title: t('Dashboard'),
        path: '/app',
        icon: <ChartPieIcon fontSize="small"/>
      },
      {
        title: t('Stacking'),
        path: '/stacking',
        icon: <UsersIcon fontSize="small"/>
      }
    ]
  },
  {
    title: t('NFP TOOLS'),
    items: [
      {
        title: t('Multisender'),
        path: 'https://btc.stx-multisender.com',
        icon: <ExternalLink fontSize="small"/>
      },
      {
        title: t('KCV Pool'),
        path: 'https://pool.kcvdao.com',
        icon: <ExternalLink fontSize="small"/>
      },
      {
        title: t('StacksScan'),
        path: 'https://stacksscan.org',
        icon: <ExternalLink fontSize="small"/>
      }
    ]
  }
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState(false);

  const {connected} = useSelector((state) => state.connect);
  const {ownerStxAddress} = useConnect();

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
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            mt: 3
          }}
        >
          <Grid
              container
              spacing={1}
              alignItems="center"
              justify="center"
          >
            <Grid item
                  md={3}
                  align="right"
            >

              <NextLink
                  href="/app"
                  passHref
              >
                <a>
                  <Logo/>
                </a>
              </NextLink>
            </Grid>
            <Grid item
                  md={9}
                  align="left"
            >
              {/*<NextLink*/}
              {/*    href="/app"*/}
              {/*    passHref*/}
              {/*>*/}
              {/*  <Link*/}
              {/*      component="a"*/}
              {/*      underline="none"*/}
              {/*  >*/}
              {/*    <Typography*/}
              {/*        variant="h6">*/}
              {/*      NFP STUDIO*/}
              {/*    </Typography>*/}
              {/*  </Link>*/}
              {/*</NextLink>*/}
              <Typography
                  variant="h6">
                NFP STUDIO
              </Typography>
            </Grid>
          </Grid>
          <div>
            <Box sx={{ p: 2 }}>
              <Grow in={connected}>
                <Box
                    sx={{
                      alignItems: 'center',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 3,
                      py: '11px',
                      borderRadius: 1
                    }}
                >
                  <div>
                    <Typography
                        color="inherit"
                        variant="subtitle1"
                    >
                      Stacks Account
                    </Typography>
                    <Typography
                        color="neutral.400"
                        variant="body2"
                    >
                      {connected ? StringHelper.getElipsedHashAddress(ownerStxAddress) : ''}
                    </Typography>
                  </div>
                </Box>
              </Grow>
            </Box>
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 3
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
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
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
          <Box sx={{ p: 2 }}>
            <NextLink
                href="https://twitter.com/NFP2021"
                passHref
            >
              <Button
                  color="secondary"
                  component="a"
                  fullWidth
                  sx={{ mt: 2 }}
                  variant="contained"
              >
                {t('NFP Twitter')}
              </Button>
            </NextLink>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
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
