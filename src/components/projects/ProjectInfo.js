import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import CountUp from "react-countup";
import {withComma} from "../../utils/number";

export const ProjectInfo = (props) => {

  return (
    <>
      <Grid container spacing={2} sx={{marginTop: "10px"}}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                color="black"
              >
                <CountUp prefix={'$'} duration={1.0} separator={','} end={props.totalMarketCap}/>
              </Typography>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                TOTAL MARKET CAP
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                color="black"
              >
                $ -
              </Typography>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                TOTAL VALUE LOCKED
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h4"
                color="black"
              >
                -
              </Typography>
              <Typography
                color="textSecondary"
                variant="overline"
              >
                TOTAL NUMBER OF WALLETS
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
