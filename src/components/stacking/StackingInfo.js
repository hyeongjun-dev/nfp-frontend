import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {withComma} from "../../utils/number";

export const StackingInfo = (props) => {
  return (
    <>
      <Card sx={{mb: 2}}>
        <CardHeader sx={{pb: "0px", pt: "15px"}} title={"Stacking Info"}/>
        <CardContent sx={{pt: "15px", paddingBottom: "0px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Current cycle</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"textSecondary"}>{'#'+props.stackingInfo.currentCycle}</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Rewards cycle</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"textSecondary"}>{'≈'+props.stackingInfo.rewardsCyclePeriod} days</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Self Stacking</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"textSecondary"}>
              min {withComma(props.stackingInfo.selfStacking)} STX</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Delegate Stacking</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"textSecondary"}>min 100 STX</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
