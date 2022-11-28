import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';
import CountUp from "react-countup";

export const AccountFiatBalance = (props) => (
    <Card
      {...props}
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
          <CountUp prefix={'$'} duration={1.0} separator={','} end={props.totalBalance} decimals={2}/>
        </Typography>
        <Typography
            color="white"
            variant="overline"
        >
          Total balance
        </Typography>
      </CardContent>
    </Card>
);
