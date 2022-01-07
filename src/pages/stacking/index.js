import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box, Grid} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {StackingTitle} from "../../components/stacking/StackingTitle";
import {StackingArea} from "../../components/stacking/StackingArea";
import {StackingCurrent} from "../../components/stacking/StackingCurrent";
import {StackingRewards} from "../../components/stacking/StackingRewards";
import {StackingInfo} from "../../components/stacking/StackingInfo";


const Stacking = () => {
  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    gtm.push({event: 'page_view'});
  }, []);



  useEffect(() => {
    // Restore the persistent state from local/session storage
    const value = globalThis.sessionStorage.getItem('dismiss-banner');

    if (value === 'true') {
    }
  }, []);

  const handleDismissBanner = () => {
    setDisplayBanner(false);
  };

  return (
    <>
      <Head>
        <title>
          Stacking
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.default',
          p: 3
        }}
      >

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StackingTitle/>
            <StackingCurrent/>
            <StackingRewards/>
          </Grid>
          <Grid item xs={12} md={4}>
            <StackingInfo/>
            <StackingArea/>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Stacking.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Stacking;
