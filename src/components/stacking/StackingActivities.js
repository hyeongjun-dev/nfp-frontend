import {
  Box, Button,
  Card,
  CardContent,
  CardHeader,
  Divider, Link,
  Table,
  TableBody,
  TableCell, TableHead,
  TableRow, Tooltip,
  Typography
} from "@mui/material";
import {SeverityPill} from "../severity-pill";
import {useEffect, useState} from "react";
import {useAtomValue} from "jotai/utils";
import {userSessionState} from "../../connect/auth";
import {useStxAddresses} from "../../connect/hooks";
import {api} from "../../api/apiClient";
import {InformationCircleOutlined as InformationCircleOutlinedIcon} from "../../icons/information-circle-outlined";

const labelColorsMap = {
  waiting: 'warning',
  delegated: 'success',
  failed: 'error',
  rewarded: 'info'
};

// let data = [
//   {
//     "_id": "61dd974c4c86dd3612fa2825",
//     "delegateStxCycle": 24,
//     "delegator": "SP1NGMS9Z48PRXFAG2MKBSP0PWERF07C0KV9SPJ66",
//     "__v": 0,
//     "amount": 130000000000,
//     "createdAt": "2022-01-11T14:42:20.326Z",
//     "endCycle": 26,
//     "lockedBlockHeight": 718164,
//     "rewards": [
//       {
//         "cycle": "25",
//         "amount": 2258672,
//         "txId": "a82d5805b2bdbb64bdf4c8bc1b0ebdb263fb052417e02343fc6b6769b803444f"
//       }
//     ],
//     "untilBlockHeight": 722750,
//     "updatedAt": "2022-01-25T14:13:25.413Z"
//   }
// ]

function convertHistoryForUI(stackingHistories, currentCycle) {
  let uiDatas = []
  stackingHistories.forEach((stackingHistory) => {
    const delegateStxCycle = stackingHistory.delegateStxCycle
    const endCycle = stackingHistory.endCycle
    const lockedBlockHeight = stackingHistory.lockedBlockHeight
    const amount = stackingHistory.amount
    const rewards = stackingHistory.rewards

    for (let i = delegateStxCycle + 1; i <= endCycle; i++) {
      let cycle = i
      let reward = rewards.find((reward) => parseInt(reward.cycle) === cycle)
      let uiData = {
        cycle: cycle,
        amount: amount / 1000000,
        status: reward ? 'rewarded' : lockedBlockHeight === 0 && currentCycle > delegateStxCycle ? 'failed' : lockedBlockHeight === 0 ? 'waiting' : 'delegated',
        reward: reward
      }
      uiDatas.push(uiData)

      if (uiData.status === 'failed') {
        break;
      }
    }
  })
  uiDatas = uiDatas.sort((a, b) => {
    if (a.cycle < b.cycle) {
      return 1
    }
    if (a.cycle > b.cycle) {
      return -1
    }
    return 0
  })
  return uiDatas
}

export const StackingActivities = (props) => {
  const [activities, setActivities] = useState([])
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);

  async function getStackerHistories() {
    let response = await api.get(`/stacking/stacker/history/${ownerStxAddress}`)
    if (response.status === 200) {
      setActivities(convertHistoryForUI(response.data.data, props.currentCycle))
    }
  }

  useEffect(() => {
    if(props.currentCycle > 0) {
      getStackerHistories()
        .catch((e) => {
          console.log(e)
          console.log("Error fetching stackerInfos")
        })
    }
  }, [ownerStxAddress, props.currentCycle])
  return (
    <>
      <Card>
        <CardHeader sx={{pt: "20px", pb: "20px"}} title="Stacking Activities" action={(
          <Tooltip title="It takes some time for the activity to be reflected.">
            <InformationCircleOutlinedIcon sx={{color: 'action.active'}}/>
          </Tooltip>
        )}/>
        <Divider/>
        {activities.length === 0 ?
          <Box sx={{display: "flex", width: "100%", justifyContent: "center", height: "30vh", overflow: "auto"}}>
            <Table>
              <TableHead>
                <TableCell sx={{textAlign: "center"}}>Cycle</TableCell>
                <TableCell sx={{textAlign: "center"}}>Delegate Amount</TableCell>
                <TableCell sx={{textAlign: "center"}}>Status</TableCell>
                <TableCell sx={{textAlign: "center"}}>Rewarded In</TableCell>
                <TableCell sx={{textAlign: "center"}}>Reward Amount</TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography sx={{width: "100%", textAlign: "center"}} variant={"h5"} color="#484848bd">
                      No Data
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          :
          <Box sx={{display: "flex", width: "100%", justifyContent: "center", maxHeight: "30vh", overflow: "auto"}}>
            <Table>
              <TableHead>
                <TableCell sx={{textAlign: "center"}}>Cycle</TableCell>
                <TableCell sx={{textAlign: "center"}}>Delegate Amount</TableCell>
                <TableCell sx={{textAlign: "center"}}>Status</TableCell>
                <TableCell sx={{textAlign: "center"}}>Rewarded In</TableCell>
                <TableCell sx={{textAlign: "center"}}>Reward Amount</TableCell>
              </TableHead>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow
                    key={activity.cycle}
                    sx={{
                      '&:last-child td': {
                        border: 0
                      },
                    }}
                  >
                    <TableCell sx={{textAlign: "center"}}>
                      <Typography
                        variant="overline"
                      >#{activity.cycle}</Typography>
                    </TableCell>
                    <TableCell sx={{textAlign: "center"}}>
                      <Typography
                        variant="overline"
                      >{activity.amount} STX</Typography>
                    </TableCell>
                    <TableCell sx={{textAlign: "center"}}>
                      <SeverityPill sx={{fontSize: "10px"}} color={labelColorsMap[activity.status]}>
                        {activity.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell sx={{textAlign: "center"}}>
                      <img style={{verticalAlign: "middle"}} width="16" height="16" alt="NYC"
                           src="https://nfpstudio.io/resource/token/xbtc.png"/>
                      <Typography
                        sx={{ml: 1}}
                        variant="overline"
                      >XBTC</Typography>
                    </TableCell>
                    <TableCell sx={{textAlign: "center"}}>
                      {activity.reward && activity.reward.amount ? <Link
                          variant="overline"
                          href={`https://explorer.stacks.co/txid/${activity.reward.txId}`}
                          target={"_blank"}
                        >{(activity.reward.amount / 100000000).toFixed(8)}</Link> :
                        <Typography
                          variant="overline"
                        >{'-'}</Typography>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        }
      </Card>
    </>
  )
}
