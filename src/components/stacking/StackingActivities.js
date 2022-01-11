import {
  Box, Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
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
//     "rewards": [{
//       cycle: 25,
//       amount: 0.00001
//     },{
//       cycle: 26,
//       amount: 0.02001
//     }],
//     "_id": "61dadba04c86dd3612f97660",
//     "delegateStxCycle": 24,
//     "delegator": "SP1687AZQFX0JFKWG9Z2X5W13GXV690Y33T9335SD",
//     "__v": 0,
//     "amount": 10000000,
//     "createdAt": "2022-01-09T12:57:04.603Z",
//     "endCycle": 27,
//     "lockedBlockHeight": 717882,
//     "untilBlockHeight": 720650,
//     "updatedAt": "2022-01-10T14:26:08.790Z"
//   },
//   {
//     "rewards": [{
//       cycle: 30,
//       amount: 0.00001
//     },{
//       cycle: 26,
//       amount: 0.02001
//     }],
//     "_id": "61dadba04c86dd3612f97660",
//     "delegateStxCycle": 30,
//     "delegator": "SP1687AZQFX0JFKWG9Z2X5W13GXV690Y33T9335SD",
//     "__v": 0,
//     "amount": 10000000,
//     "createdAt": "2022-01-09T12:57:04.603Z",
//     "endCycle": 35,
//     "lockedBlockHeight": 0,
//     "untilBlockHeight": 720650,
//     "updatedAt": "2022-01-10T14:26:08.790Z"
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
      let reward = rewards.find((reward) => reward.cycle === cycle)
      let uiData = {
        cycle: cycle,
        amount: amount / 1000000,
        status: reward ? 'rewarded' : lockedBlockHeight === 0 && currentCycle > delegateStxCycle ? 'failed' : lockedBlockHeight === 0 ? 'waiting' : 'delegated',
        reward: reward
      }
      uiDatas.push(uiData)
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
    getStackerHistories()
      .catch((e) => {
        console.log(e)
        console.log("Error fetching stackerInfos")
      })
  }, [ownerStxAddress])
  return (
    <>
      <Card>
        <CardHeader sx={{pt: "20px", pb: "20px"}} title="Stacking Activities" action={(
          <Tooltip title="It takes some time for the activity to be reflected.">
            <InformationCircleOutlinedIcon sx={{ color: 'action.active' }} />
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
                      <Typography
                        variant="overline"
                      >{activity.reward && activity.reward.amount ? activity.reward.amount : '-'}</Typography>
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
