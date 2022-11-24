import {Box, Container, Grid, Typography} from "@mui/material";
import {DashboardLayout} from "../../components/dashboard/dashboard-layout";
import {useEffect, useState} from "react";
import {gtm} from "../../lib/gtm";
import {getPoxInfo} from "../../api/stacking/stacking";
import Head from "next/head";
import {StackingTitle} from "../../components/stacking/StackingTitle";
import {StackingCurrent} from "../../components/stacking/StackingCurrent";
import {StackingActivities} from "../../components/stacking/StackingActivities";
import {StackingInfo} from "../../components/stacking/StackingInfo";
import {StackingArea} from "../../components/stacking/StackingArea";
import {LandingLayout} from "../../components/dashboard/landing-layout";
// import Particles from 'react-particles-js';

const Home = () => {
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
      let response = await getPoxInfo();
      if (response.data.status === 200) {
        let body = response.data;
        setStackingInfo({
          apy: body.apy,
          rewardsCyclePeriod: parseInt(body.reward_cycle_length / 6 / 24),
          currentCycle: body.currentCycle,
          nextCycle: body.next_cycle.id,
          deadLine: (body.next_reward_cycle_in - 200),
          nextRewardCycleIn: body.next_reward_cycle_in,
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
          Staking
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          width: "100%",
          flexGroxw: 1,
          height: '100%',
          marginTop: 3,
        }}
      >
        {/*<Particles/>*/}
      </Box>
    </>
  );
}


Home.getLayout = (page) => (
  <LandingLayout>
    {page}
  </LandingLayout>
);

export default Home;