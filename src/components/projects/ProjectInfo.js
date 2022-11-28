import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import CountUp from "react-countup";
import {withComma} from "../../utils/number";
import dynamic from 'next/dynamic';

export const ProjectInfo = (props) => {
  return (
    <>
      <Grid container spacing={2} sx={{marginTop: "10px"}}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{background:'rgba(255, 255, 255, 0.1)',
              borderColor: '#54576a',
              borderWidth: 1,
              borderStyle: 'solid'
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                color="white"
              >
                {
                  props.totalMarketCap < 0 ? "-" :
                  <CountUp prefix = {'$'} duration={1.0} separator={','} end={props.totalMarketCap}/>
                }
              </Typography>
              <Typography
                color="white"
                variant="overline"
              >
                TOTAL MARKET CAP
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{background:'rgba(255, 255, 255, 0.1)',
              borderColor: '#54576a',
              borderWidth: 1,
              borderStyle: 'solid'
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                color="white"
              >
                $ -
              </Typography>
              <Typography
                color="white"
                variant="overline"
              >
                TOTAL VALUE LOCKED
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{background:'rgba(255, 255, 255, 0.1)',
              borderColor: '#54576a',
              borderWidth: 1,
              borderStyle: 'solid'
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                color="white"
              >
                -
              </Typography>
              <Typography
                color="white"
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
