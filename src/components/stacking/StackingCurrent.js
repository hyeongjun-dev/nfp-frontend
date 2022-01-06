import {Box, Card, CardContent, CardHeader, Grid, Typography} from "@mui/material";
import {Chart} from "../chart";
import {useTheme} from "@mui/material/styles";

export const StackingCurrent = (props) => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: ['#ffb547', '#7783DB'],
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'solid',
      opacity: 0
    },
    grid: {
      borderColor: theme.palette.divider
    },
    markers: {
      strokeColors: theme.palette.background.paper,
      size: 6
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        '#1',
        '#2',
        '#3',
        '#4',
        '#5',
        '#6',
        '#7',
        '#8',
        '#9',
        '#10',
        '#11',
        '#12'
      ]
    }
  };

  const chartSeries = [
    {
      name: 'New Customers',
      data: [9.1, 7.8, 8.0, 8.0, 8.9, 8.3, 11.0, 6.0, 8.1, 8.3, 8.9, 8.2]
    },
  ];

  return (
    <>
      <Card sx={{mb: 2}}>
        <CardContent sx={{padding: "15px 20px"}}>
          <Box>
          <Grid container spacing={2}>
            <Grid item md={7}>
              <Typography variant={"h6"}>Stacking APY</Typography>
              <Chart
                sx={{width: "100%"}}
                height={170}
                options={chartOptions}
                series={chartSeries}
                type="area"
              />
            </Grid>
            <Grid item md={5}>
              <Typography variant={"h6"} sx={{mb:2}}>My Status</Typography>
              <Box sx={{display:"flex", justifyContent: "space-between"}} mb={1}>
                <Typography variant={"subtitle2"}>Amount Stacking</Typography>
                <Typography variant={"subtitle2"}>10,000STX</Typography>
              </Box>
              <Box sx={{display:"flex", justifyContent: "space-between"}} mb={1}>
                <Typography variant={"subtitle2"}>Stacking Started</Typography>
                <Typography variant={"subtitle2"}>#25</Typography>
              </Box>
              <Box sx={{display:"flex", justifyContent: "space-between"}} mb={2}>
                <Typography variant={"subtitle2"}>Stacking Ended</Typography>
                <Typography variant={"subtitle2"}>10,000STX</Typography>
              </Box>
              <Typography variant={"body2"} color={"textSecondary"}>STX stacking cannot be participated in multiple wallets at once. If you need to participate in additional stacking, you should participate with a new wallet.</Typography>
            </Grid>
          </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
