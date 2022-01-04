import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";

export const StackingInfo = (props) => {

  return (
    <>
      <Card sx={{mb: 2}}>
        <CardHeader sx={{pb: "0px", pt: "15px"}} title={"Stacking Info"}/>
        <CardContent sx={{pt: "15px", paddingBottom: "0px"}}>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Rewards cycle</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"textSecondary"}>2weeks</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Self Stacking</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"textSecondary"}>min
              12,000STX</Typography>
          </Box>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant={"overline"} color={"textSecondary"}>Delegate Stacking</Typography>
            <Typography sx={{textAlign: "right"}} variant={"overline"} color={"textSecondary"}>min 100STX</Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}