import {useEffect, useState} from 'react';
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
import {useConnect} from "../../connect/auth";
import {useSelector} from "../../store";
import {PhotoCamera, Visibility} from "@mui/icons-material";

const Stacking = () => {
  const [displayBanner, setDisplayBanner] = useState(true);
  const {handleOpenAuth, handleSignOut} = useConnect();
  const { connected } = useSelector((state) => state.connect);

  useEffect(() => {
    gtm.push({event: 'page_view'});
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
          <Card sx={{backgroundColor: "#0c1236"}}>
            <CardHeader
              subheader={(
                <Typography variant="h5">
                  2,700,000 STX
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
                      endAdornment={
                        <InputAdornment position="end">
                          <Button>
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
                  <Button sx={{width: "100%", borderRadius: '5px'}} variant={"contained"}>Delegate</Button>
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
