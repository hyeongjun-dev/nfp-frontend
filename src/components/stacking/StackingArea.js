import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  OutlinedInput, Slider,
  Typography
} from "@mui/material";
import CountUp from "react-countup";
import {StackingDelegateBtn} from "./StackingDelegateBtn";
import {useEffect, useState} from "react";
import {getBalance} from "../../slices/account";
import {useConnect, userSessionState} from "../../connect/auth";
import {useAtomValue} from "jotai/utils";
import {useStxAddresses} from "../../connect/hooks";
import {useSelector} from "../../store";

export const StackingArea = (props) => {
  const {connected} = useSelector((state) => state.connect);

  const [delegateAmount, setDelegateAmount] = useState();
  const [stxBalance, setStxBalance] = useState(0);
  const {handleOpenAuth} = useConnect();
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);
  const [cycle, setCycle] = useState(3);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setCycle(newValue);
    }
  };

  useEffect(() => {
    if (connected) {
      getBalance(ownerStxAddress)
        .then((response) => {
          setStxBalance(response.data.stxInfo.balance)
        })
    }
  }, [ownerStxAddress])

  return (
    <>
      <Card>
        <CardHeader
          sx={{pb: 0}}
          title={(
            <Typography variant="h6">
              Delegate Stacks
            </Typography>
          )}
        />
        <CardContent>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>My Balance</Typography>
            <Typography variant={"overline"}>
              {<CountUp duration={1.2} end={stxBalance}/>} STX
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Waiting for participation</Typography>
            <Typography variant={"overline"} color={"textSecondary"}>
              10 days
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Rewarding means</Typography>
            <Typography variant={"overline"} color={"textSecondary"}>
              XBTC
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between", mb: 6}}>
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
          <Box sx={{mt: 2, mb: 2}}>
            <OutlinedInput
              fullWidth
              onChange={(e) => {
                setDelegateAmount(e.target.value)
              }}
              type={"number"}
              value={delegateAmount}
              endAdornment={
                <InputAdornment position="end">
                  <Button onClick={() => {
                    let nBalance = parseInt(stxBalance)
                    setDelegateAmount(nBalance)
                  }}>
                    Max
                  </Button>
                </InputAdornment>
              }
            />
          </Box>
          <Slider
            value={cycle}
            min={1}
            step={1}
            max={12}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
          <Typography mb={2} sx={{textAlign: "right"}} id="non-linear-slider" variant={"subtitle2"} gutterBottom>
            Cycle to participate: {cycle} cycles
          </Typography>
          {connected ?
            <StackingDelegateBtn delegateAmount={delegateAmount}/>
            :
            <Button sx={{width: "100%", borderRadius: '5px'}} variant={"contained"} onClick={() => handleOpenAuth()}>Connect
              wallet</Button>}
        </CardContent>
      </Card>
    </>
  )
}
