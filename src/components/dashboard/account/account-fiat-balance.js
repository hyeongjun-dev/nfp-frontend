import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';
import CountUp from "react-countup";

export const AccountFiatBalance = (props) => (
    <Card {...props}>
      <CardContent>
        <Typography
            variant="h5"
            color="black"
        >
          <CountUp prefix={'$'} duration={1.0} separator={','} end={props.totalBalance} decimals={2}/>
        </Typography>
        <Typography
            color="textSecondary"
            variant="overline"
        >
          Total balance
        </Typography>
      </CardContent>
    </Card>
);
