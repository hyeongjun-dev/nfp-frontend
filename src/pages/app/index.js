import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { OverviewBanner } from '../../components/dashboard/overview/overview-banner';
import { OverviewCryptoWallet } from '../../components/dashboard/overview/overview-crypto-wallet';
import { OverviewInbox } from '../../components/dashboard/overview/overview-inbox';
import { OverviewLatestTransactions } from '../../components/dashboard/overview/overview-latest-transactions';
import { OverviewPrivateWallet } from '../../components/dashboard/overview/overview-private-wallet';
import { OverviewTotalBalance } from '../../components/dashboard/overview/overview-total-balance';
import { OverviewTotalTransactions } from '../../components/dashboard/overview/overview-total-transactions';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import { Briefcase as BriefcaseIcon } from '../../icons/briefcase';
import { Download as DownloadIcon } from '../../icons/download';
import { ExternalLink as ExternalLinkIcon } from '../../icons/external-link';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '../../icons/information-circle-outlined';
import { Reports as ReportsIcon } from '../../icons/reports';
import { Users as UsersIcon } from '../../icons/users';
import { gtm } from '../../lib/gtm';
import {AccountFiatBalance} from "../../components/dashboard/account/account-fiat-balance";
import {AccountTokenBalance} from "../../components/dashboard/account/account-token-balance";
import {AccountWalletAddress} from "../../components/dashboard/account/account-wallet-address";
import {AccountTokenList} from "../../components/dashboard/account/account-token-list";
import {fetchItems, accountSelector} from "../../slices/account";
import {useDispatch, useSelector} from "../../store";
import {useConnect} from "../../connect/auth";

const Overview = () => {
  const [displayBanner, setDisplayBanner] = useState(true);

  const dispatch = useDispatch();
  const { items } = useSelector(accountSelector);
  const {ownerStxAddress} = useConnect()

  useEffect(() => {
    gtm.push({ event: 'page_view' });
    dispatch(fetchItems(ownerStxAddress)); // sample: 'SP13KT116B0A99C1FZB0M10NX3T1AWCPG0ZKYXSN'
  }, []);

  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
      // setDisplayBanner(false);
    }
  }, []);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>
          Account Dashboard
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Account Dashboard
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <AccountFiatBalance totalBalance={items.totalBalance}/>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <AccountTokenBalance numberOfFToken={items.numberOfFungibleToken}/>
            </Grid>
            <Grid
                item
                md={4}
                xs={12}
            >
              <AccountWalletAddress address={ownerStxAddress}/>
            </Grid>

            <Grid
                item
                md={12}
                xs={12}
            >
              <AccountTokenList fungibleTokenList={items.fungibleTokenList}/>
            </Grid>

            {/*<Grid*/}
            {/*  item*/}
            {/*  md={8}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <OverviewTotalTransactions />*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={4}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <OverviewTotalBalance />*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={8}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <OverviewLatestTransactions />*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={4}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <OverviewInbox />*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={6}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <Card>*/}
            {/*    <CardContent>*/}
            {/*      <Box*/}
            {/*        sx={{*/}
            {/*          alignItems: 'center',*/}
            {/*          display: 'flex'*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <BriefcaseIcon*/}
            {/*          color="primary"*/}
            {/*          fontSize="small"*/}
            {/*        />*/}
            {/*        <Typography*/}
            {/*          color="primary.main"*/}
            {/*          sx={{ pl: 1 }}*/}
            {/*          variant="subtitle2"*/}
            {/*        >*/}
            {/*          Jobs*/}
            {/*        </Typography>*/}
            {/*      </Box>*/}
            {/*      <Typography*/}
            {/*        variant="h6"*/}
            {/*        sx={{ mt: 2 }}*/}
            {/*      >*/}
            {/*        Find your dream job*/}
            {/*      </Typography>*/}
            {/*      <Typography*/}
            {/*        color="textSecondary"*/}
            {/*        variant="body2"*/}
            {/*      >*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipiscing*/}
            {/*        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.*/}
            {/*      </Typography>*/}
            {/*    </CardContent>*/}
            {/*    <Divider />*/}
            {/*    <CardActions>*/}
            {/*      <Button*/}
            {/*        endIcon={<ArrowRightIcon fontSize="small" />}*/}
            {/*        size="small"*/}
            {/*      >*/}
            {/*        Search Jobs*/}
            {/*      </Button>*/}
            {/*    </CardActions>*/}
            {/*  </Card>*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={6}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <Card>*/}
            {/*    <CardContent>*/}
            {/*      <Box*/}
            {/*        sx={{*/}
            {/*          alignItems: 'center',*/}
            {/*          display: 'flex'*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <InformationCircleOutlinedIcon color="primary" />*/}
            {/*        <Typography*/}
            {/*          color="primary.main"*/}
            {/*          sx={{ pl: 1 }}*/}
            {/*          variant="subtitle2"*/}
            {/*        >*/}
            {/*          Help Center*/}
            {/*        </Typography>*/}
            {/*      </Box>*/}
            {/*      <Typography*/}
            {/*        sx={{ mt: 2 }}*/}
            {/*        variant="h6"*/}
            {/*      >*/}
            {/*        Need help figuring things out?*/}
            {/*      </Typography>*/}
            {/*      <Typography*/}
            {/*        color="textSecondary"*/}
            {/*        variant="body2"*/}
            {/*      >*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipiscing*/}
            {/*        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.*/}
            {/*      </Typography>*/}
            {/*    </CardContent>*/}
            {/*    <Divider />*/}
            {/*    <CardActions>*/}
            {/*      <Button*/}
            {/*        endIcon={<ExternalLinkIcon fontSize="small" />}*/}
            {/*        size="small"*/}
            {/*      >*/}
            {/*        Help Center*/}
            {/*      </Button>*/}
            {/*    </CardActions>*/}
            {/*  </Card>*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={6}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <Card>*/}
            {/*    <CardContent>*/}
            {/*      <Box*/}
            {/*        sx={{*/}
            {/*          alignItems: 'center',*/}
            {/*          display: 'flex'*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <DownloadIcon color="primary" />*/}
            {/*        <Typography*/}
            {/*          color="primary.main"*/}
            {/*          sx={{ pl: 1 }}*/}
            {/*          variant="subtitle2"*/}
            {/*        >*/}
            {/*          Download*/}
            {/*        </Typography>*/}
            {/*      </Box>*/}
            {/*      <Typography*/}
            {/*        sx={{ mt: 2 }}*/}
            {/*        variant="h6"*/}
            {/*      >*/}
            {/*        Download our Free PDF and learn how to*/}
            {/*        get more job leads*/}
            {/*      </Typography>*/}
            {/*      <Typography*/}
            {/*        color="textSecondary"*/}
            {/*        variant="body2"*/}
            {/*      >*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipiscing*/}
            {/*        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.*/}
            {/*      </Typography>*/}
            {/*    </CardContent>*/}
            {/*    <Divider />*/}
            {/*    <CardActions>*/}
            {/*      <Button*/}
            {/*        endIcon={<DownloadIcon fontSize="small" />}*/}
            {/*        size="small"*/}
            {/*        variant="outlined"*/}
            {/*      >*/}
            {/*        Download Free PDF*/}
            {/*      </Button>*/}
            {/*    </CardActions>*/}
            {/*  </Card>*/}
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  md={6}*/}
            {/*  xs={12}*/}
            {/*>*/}
            {/*  <Card>*/}
            {/*    <CardContent>*/}
            {/*      <Box*/}
            {/*        sx={{*/}
            {/*          alignItems: 'center',*/}
            {/*          display: 'flex'*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        <UsersIcon color="primary" />*/}
            {/*        <Typography*/}
            {/*          color="primary.main"*/}
            {/*          sx={{ pl: 1 }}*/}
            {/*          variant="subtitle2"*/}
            {/*        >*/}
            {/*          Contacts*/}
            {/*        </Typography>*/}
            {/*      </Box>*/}
            {/*      <Typography*/}
            {/*        sx={{ mt: 2 }}*/}
            {/*        variant="h6"*/}
            {/*      >*/}
            {/*        Contacts allow you to manage your company contracts*/}
            {/*      </Typography>*/}
            {/*      <Typography*/}
            {/*        color="textSecondary"*/}
            {/*        variant="body2"*/}
            {/*      >*/}
            {/*        Lorem ipsum dolor sit amet, consectetur adipiscing*/}
            {/*        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.*/}
            {/*      </Typography>*/}
            {/*    </CardContent>*/}
            {/*    <Divider />*/}
            {/*    <CardActions>*/}
            {/*      <Button*/}
            {/*        endIcon={<ArrowRightIcon fontSize="small" />}*/}
            {/*        size="small"*/}
            {/*        variant="outlined"*/}
            {/*      >*/}
            {/*        My Contacts*/}
            {/*      </Button>*/}
            {/*    </CardActions>*/}
            {/*  </Card>*/}
            {/*</Grid>*/}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Overview.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Overview;
