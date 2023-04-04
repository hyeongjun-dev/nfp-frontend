import {useEffect, useState} from 'react';
import Head from 'next/head';
import {Box, Container, Grid} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {StackingTitle} from "../../components/stacking/StackingTitle";
import {StackingArea} from "../../components/stacking/StackingArea";
import {StackingCurrent} from "../../components/stacking/StackingCurrent";
import {StackingActivities} from "../../components/stacking/StackingActivities";
import {StackingInfo} from "../../components/stacking/StackingInfo";
import {stackingClubApi, stacksApi} from "../../api/apiClient";

const Stacking = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const [stackingInfo, setStackingInfo] = useState({
    apy: 0.0,
    rewardsCyclePeriod: '-',
    currentCycle: 0,
    nextCycle: 0,
    deadLine: 0,
    nextRewardCycleIn: -9999,
    selfStacking: '-',
    delegationStacking: 100,
    nextRewardStartBlockHeight : 0,
    poolAddress: ''
  })
  const [isStacked, setIsStacked] = useState(false)

  useEffect(() => {
    gtm.push({event: 'page_view'});

    async function callPoxInfo() {
      try {
        let stackingInfoData = {
          apy: 0.0,
          rewardsCyclePeriod: '-',
          currentCycle: 0,
          nextCycle: 0,
          deadLine: 0,
          nextRewardCycleIn: -9999,
          selfStacking: '-',
          delegationStacking: 100,
          nextRewardStartBlockHeight : 0,
          poolAddress: ''
        }
        let res = await stackingClubApi.get("/overview/stats");
        if (res.status === 200) {
          const {apy, currentCycle} = res.data;
          const poolAddress = 'SP2H485NJWV1M1XVS3N8CM64KM205G25X5JZ8FR04';
          stackingInfoData.apy = apy;
          stackingInfoData.currentCycle = currentCycle;
          stackingInfoData.poolAddress = poolAddress;
        } else {
          console.log(res);
        }
        res = await stacksApi.get('/v2/pox');
        if (res.status === 200) {
          const {reward_cycle_length, next_reward_cycle_in, current_cycle, next_cycle} = res.data;
          stackingInfoData.rewardsCyclePeriod = parseInt(reward_cycle_length / 6 / 24);
          stackingInfoData.deadLine = next_reward_cycle_in - 200;
          stackingInfoData.nextRewardCycleIn = next_reward_cycle_in;
          stackingInfoData.selfStacking = current_cycle.min_threshold_ustx / 1000000;
          stackingInfoData.nextRewardStartBlockHeight = next_cycle.reward_phase_start_block_height;
        } else {
          console.log(res);
        }
        setStackingInfo(stackingInfoData);
      } catch (e) {
        console.log(e);
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
          Staking
        </title>
      </Head>
      <Box
        sx={{
          width: "100%",
          flexGroxw: 1,
          py: 7,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <StackingTitle apy={stackingInfo.apy}/>
              <StackingCurrent setIsStacked={setIsStacked}/>
              <StackingActivities currentCycle={stackingInfo.currentCycle}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <StackingInfo stackingInfo={stackingInfo}/>
              <StackingArea isStacked={isStacked} stackingInfo={stackingInfo}/>
            </Grid>
          </Grid>
        </Container>
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
