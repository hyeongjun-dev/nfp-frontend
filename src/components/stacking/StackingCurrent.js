import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {Chart} from "../chart";
import {useTheme} from "@mui/material/styles";
import {userSessionState} from "../../connect/auth";
import {useAtomValue} from "jotai/utils";
import {useStxAddresses} from "../../connect/hooks";
import {StacksMainnet} from "@stacks/network";
import {useEffect, useState} from "react";
import {callReadOnlyFunction, cvToJSON, standardPrincipalCV} from "@stacks/transactions";
import {getApyHistory} from "../../api/stacking/stacking";
import {withComma} from "../../utils/number";

export const StackingCurrent = (props) => {
  const theme = useTheme();
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);
  const [apyHistory, setApyHistory] = useState([])
  const [myStatus, setMyStatus] = useState({
    amountStacking: '-',
    firstRewardCycle: '-',
    lockPeriod: '-',
    poxAddr: ''
  })

  let chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: ['#ffb547', '#7783DB'],
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'solid',
      opacity: 0
    },
    grid: {
      borderColor: theme.palette.divider
    },
    markers: {
      strokeColors: theme.palette.background.paper,
      size: 6
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [...(apyHistory.map((apyHistory) => '#'+apyHistory.cycle))],
      tickAmount: 12
    }
  };

  let chartSeries = [
    {
      name: 'Apy Revenue',
      data: [...apyHistory.map((apyHistory) => apyHistory.apy)]
    },
  ];

  async function getStackingInfo(){
    if (!ownerStxAddress) {
      return
    }

    const contractAddress = 'SP000000000000000000002Q6VF78';
    const contractName = 'pox';
    const functionName = 'get-stacker-info';
    const stacker = standardPrincipalCV(ownerStxAddress);
    const network = new StacksMainnet();

    const options = {
      senderAddress: ownerStxAddress,
      contractAddress,
      contractName,
      functionName,
      functionArgs: [stacker],
      network,
    };

    return await callReadOnlyFunction(options);
  }

  async function callApyHistory() {
    let response = await getApyHistory();
    if (response.status === 200) {
      let sorted = response.data.sort(function(a, b){
        if(a.cycle > b.cycle){
          return 1;
        }
        if(a.cycle < b.cycle){
          return -1;
        }
        return 0;
      })
      setApyHistory(sorted)
    }
  }

  useEffect(()=>{
    callApyHistory()
  }, [])

  useEffect(()=>{
    getStackingInfo().then((data)=> {
      try{
        let cvJson = cvToJSON(data).value.value
        let amountStacking = (cvJson['amount-ustx'].value)/1000000
        let firstRewardCycle = cvJson['first-reward-cycle'].value
        let lockPeriod = cvJson['lock-period'].value
        let poxAddr = cvJson['pox-addr'].value
        setMyStatus({
          amountStacking: amountStacking,
          firstRewardCycle: firstRewardCycle,
          lockPeriod: lockPeriod,
          poxAddr: poxAddr
        })
      }catch(e){
        console.log(e)
      }
    })
  }, [ownerStxAddress])

  return (
    <>
      <Card sx={{mb: 2}}>
        <CardContent sx={{padding: "15px 20px"}}>
          <Box>
          <Grid container spacing={2}>
            <Grid item md={7}>
              <Typography variant={"h6"}>Stacking APY</Typography>
              <Chart
                sx={{width: "100%"}}
                height={170}
                options={chartOptions}
                series={chartSeries}
                type="area"
              />
            </Grid>
            <Grid item md={5}>
              <Typography variant={"h6"} sx={{mb:2}}>My Status</Typography>
              <Box sx={{display:"flex", justifyContent: "space-between"}} mb={1}>
                <Typography variant={"subtitle2"}>Amount Stacking</Typography>
                <Typography variant={"subtitle2"}>{withComma(myStatus.amountStacking)}</Typography>
              </Box>
              <Box sx={{display:"flex", justifyContent: "space-between"}} mb={1}>
                <Typography variant={"subtitle2"}>Stacking Started</Typography>
                <Typography variant={"subtitle2"}>{myStatus.firstRewardCycle !== '-'? '#'+myStatus.firstRewardCycle : '-'}</Typography>
              </Box>
              <Box sx={{display:"flex", justifyContent: "space-between"}} mb={2}>
                <Typography variant={"subtitle2"}>Stacking Ended</Typography>
                <Typography variant={"subtitle2"}>{myStatus.firstRewardCycle !== '-'? '#' + (parseInt(myStatus.firstRewardCycle)+parseInt(myStatus.lockPeriod)-1) : '-'}</Typography>
              </Box>
              <Typography variant={"body2"} color={"textSecondary"}>STX stacking cannot be participated in multiple wallets at once. If you need to participate in additional stacking, you should participate with a new wallet.</Typography>
            </Grid>
          </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
