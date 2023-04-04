import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";
import {withComma} from "../../utils/number";

export const StackingInfo = (props) => {
  return (
    <>
      <Card
        sx={{background:'rgba(255, 255, 255, 0.1)',
          borderColor: '#54576a',
          borderWidth: 1,
          borderStyle: 'solid',
          mb: 2
        }}
      >
        <CardHeader sx={{pb: "0px", pt: 3, color: "white"}} title={"Stacking Info"}/>
        <CardContent sx={{pt: "15px", paddingBottom: "0px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"white"}>Current cycle</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"white"}>{'#'+props.stackingInfo.currentCycle}</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"white"}>Rewards cycle</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"white"}>{'≈'+props.stackingInfo.rewardsCyclePeriod} days</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"white"}>Self Stacking</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"white"}>
              min {withComma(props.stackingInfo.selfStacking)} STX</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"white"}>Delegate Stacking</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"white"}>min 100 STX</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
