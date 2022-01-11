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

  const [delegateAmount, setDelegateAmount] = useState(0);
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

  function calUntilBurnHeight(){
    let nextStartBlockHeight = props.stackingInfo.nextRewardStartBlockHeight

    return nextStartBlockHeight + (cycle * 2100)
  }

  useEffect(() => {
    if (connected) {
      getBalance(ownerStxAddress, true)
        .then((response) => {
          setStxBalance(response.data.stxInfo.balance)
        })
    }
  }, [ownerStxAddress])

  return (
    <>
      <Card>
        <CardHeader
          sx={{pb: 0, pt: 3}}
          title={(
            <Typography variant="h6">
              Delegate Stacks
            </Typography>
          )}
        />
        <CardContent sx={{pt: "15px", paddingBottom: "0px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>My Balance</Typography>
            <Typography variant={"overline"}>
              {<CountUp duration={1.2} end={stxBalance}/>} STX
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Upcoming Cycle</Typography>
            <Typography variant={"overline"} color={"textSecondary"}>
              #{props.stackingInfo.nextCycle}
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Delegation Deadline IN</Typography>
            <Typography variant={"overline"} color={"textSecondary"}>
              {props.stackingInfo.deadLine} blocks
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Reward Payout in</Typography>
            <Typography variant={"overline"} color={"textSecondary"}>
              XBTC
            </Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between", mb: 4}}>
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
                    setDelegateAmount(nBalance - 1 > 0 ? nBalance - 1 : 0)
                  }}>
                    MAX
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
          <Typography mb={2} sx={{textAlign: "right"}} id="non-linear-slider" variant={"subtitle2"} color={"textSecondary"}>
            Cycle to participate: {cycle} cycles
          </Typography>
          {connected ?
            <StackingDelegateBtn poolAddress={props.stackingInfo.poolAddress} delegateAmount={delegateAmount} untilBurnHeight={calUntilBurnHeight()}/>
            :
            <Button sx={{width: "100%", borderRadius: '5px'}} variant={"contained"} onClick={() => handleOpenAuth()}>Connect
              wallet</Button>}
        </CardContent>
      </Card>
    </>
  )
}
