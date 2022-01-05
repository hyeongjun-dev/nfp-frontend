import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography
} from "@mui/material";
import CountUp from "react-countup";
import {DelegateBtn} from "./DelegateBtn";
import {useEffect, useState} from "react";
import {getBalance} from "../../slices/account";
import {useConnect, userSessionState} from "../../connect/auth";
import {useAtomValue} from "jotai/utils";
import {useStxAddresses} from "../../connect/hooks";
import {useSelector} from "../../store";

export const StackingArea = (props) =>{
  const { connected } = useSelector((state) => state.connect);

  const [delegateAmount, setDelegateAmount] = useState();
  const [stxBalance, setStxBalance] = useState(0);
  const {handleOpenAuth} = useConnect();
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);

  useEffect(()=>{
    if (connected) {
      getBalance(ownerStxAddress)
        .then((response) => {
          setStxBalance(response.data.stxInfo.balance)
        })
    }
  },[ownerStxAddress])

  return(
    <>
      <Card sx={{backgroundColor: "#5048E5"}}>
        <CardHeader
          subheader={(
            <Typography variant="h5" color="white">
              {<CountUp duration={1.2} end={stxBalance} />} STX
            </Typography>
          )}
          sx={{pb: 2}}
          title={(
            <Typography
              color="white"
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
    </>
  )
}
