import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';

export const AccountFiatBalance = (props) => (
    <Card {...props}>
      <CardContent>
        <Typography
            variant="h4"
            color="secondary"
        >
          {numeral(props.totalBalance).format('$0,0.00')}
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
