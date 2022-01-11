import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box, Grid} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {StackingTitle} from "../../components/stacking/StackingTitle";
import {StackingArea} from "../../components/stacking/StackingArea";
import {StackingCurrent} from "../../components/stacking/StackingCurrent";
import {StackingActivities} from "../../components/stacking/StackingActivities";
import {StackingInfo} from "../../components/stacking/StackingInfo";
import {getPoxInfo} from "../../api/stacking/stacking";


const Stacking = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const [stackingInfo, setStackingInfo] = useState({
    apy: 0.0,
    rewardsCyclePeriod: '-',
    currentCycle: 0,
    nextCycle: 0,
    deadLine: 0,
    selfStacking: '-',
    delegationStacking: 100,
    nextRewardStartBlockHeight : 0,
    poolAddress: ''
  })

  useEffect(() => {
    gtm.push({event: 'page_view'});

    async function callPoxInfo() {
      let response = await getPoxInfo();
      if (response.data.status === 200) {
        let body = response.data;
        setStackingInfo({
          apy: body.apy,
          rewardsCyclePeriod: parseInt(body.reward_cycle_length / 6 / 24),
          currentCycle: body.currentCycle,
          nextCycle: body.next_cycle.id,
          deadLine: (body.next_reward_cycle_in - 100 - 201),
          selfStacking: body.current_cycle.min_threshold_ustx / 1000000,
          delegationStacking: stackingInfo.delegationStacking,
          nextRewardStartBlockHeight: body.next_cycle.reward_phase_start_block_height,
          poolAddress: body.poolAddress
        })
      }
    }
    callPoxInfo()
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
            <StackingTitle apy={stackingInfo.apy}/>
            <StackingCurrent/>
            <StackingActivities currentCycle={stackingInfo.currentCycle}/>
          </Grid>
          <Grid item xs={12} md={4}>
            <StackingInfo stackingInfo={stackingInfo}/>
            <StackingArea stackingInfo={stackingInfo}/>
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
