import {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider, IconButton,
  InputAdornment, OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {useConnect, userSessionState} from "../../connect/auth";
import {useSelector} from "../../store";
import {fetchItems, getBalance} from "../../slices/account";
import {useAtomValue} from "jotai/utils";
import {useStxAddresses} from "../../connect/hooks";
import CountUp from "react-countup";
import {DelegateBtn} from "../../components/stacking/DelegateBtn";


const Stacking = () => {
  const { connected } = useSelector((state) => state.connect);

  const [displayBanner, setDisplayBanner] = useState(true);
  const [delegateAmount, setDelegateAmount] = useState();
  const [stxBalance, setStxBalance] = useState(0);
  const {handleOpenAuth} = useConnect();
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);

  useEffect(() => {
    gtm.push({event: 'page_view'});
  }, []);

  useEffect(()=>{
    if (connected) {
      getBalance(ownerStxAddress)
        .then((response) => {
          setStxBalance(response.data.stxInfo.balance)
        })
    }
  },[ownerStxAddress])

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
        <Container maxWidth="sm">
          <Card sx={{backgroundColor: "#141416"}}>
            <CardHeader
              subheader={(
                <Typography variant="h5">
                  {<CountUp duration={1.2} end={stxBalance} />} STX
                </Typography>
              )}
              sx={{pb: 2}}
              title={(
                <Typography
                  color="textSecondary"
                  variant="overline"
                >
                  STX Balance
                </Typography>
              )}
            />
            <Card>
              <CardHeader
                subheader={(
                  <Box sx={{mt: 2}}>
                    <OutlinedInput
                      fullWidth
                      onChange={(e)=>{setDelegateAmount(e.target.value)}}
                      type={"number"}
                      value={delegateAmount}
                      endAdornment={
                        <InputAdornment position="end">
                          <Button onClick={()=>{
                            let nBalance = parseInt(stxBalance)
                            setDelegateAmount(nBalance)
                          }}>
                            Max
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </Box>
                )}
                sx={{pb: 0}}
                title={(
                  <Typography
                    color="textSecondary"
                    variant="h6"
                  >
                    Stack
                  </Typography>
                )}
              />
              <CardContent>
                {connected?
                  <DelegateBtn delegateAmount={delegateAmount}/>
                  // <Button sx={{width: "100%", borderRadius: '5px'}} variant={"contained"} onClick={()=>{openDelegate(100)}}>Delegate</Button>
                  :
                  <Button sx={{width: "100%", borderRadius: '5px'}} variant={"contained"} onClick={() => handleOpenAuth()}>Connect wallet</Button>}
                <Divider sx={{mb: 2}}/>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    You will recieve with
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    xBTC
                  </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    Estimated APY
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    ~8.xx%
                  </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    Participate period
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    ~5 weeks (Every 2 Cycles)
                  </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    Rewards fee
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="overline"
                  >
                    7%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Card>
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
