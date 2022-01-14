import {Box, Card, CardContent, Typography} from "@mui/material";
import CountUp from "react-countup";

export const StackingTitle = (props) => {
  return (
    <>
      <Card sx={{mb: 2}}>
        <CardContent>
          <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Box sx={{display: "flex", alignSelf: "center"}}>
              <img style={{maxWidth: "40px", marginRight: "15px"}} src={"/stacks.svg"}/>
              <Typography variant={"h4"}>Stacks</Typography>
            </Box>
            <Box>
              <Typography sx={{textAlign: "right"}} variant={"h5"} color={"textPrimary"}>{<CountUp duration={1.0} end={props.apy} decimals={1}/>}%</Typography>
              <Typography sx={{textAlign: "right"}} variant={"h7"} color={"textSecondary"}>Estimated APY</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
