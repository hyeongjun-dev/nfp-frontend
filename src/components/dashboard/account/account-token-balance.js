import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';

export const AccountTokenBalance = (props) => (
    <Card {...props}>
      <CardContent>
        <Typography
            variant="h4"
            color="black"
        >
          { numeral(props.numberOfFToken).format('0') }
        </Typography>
        <Typography
            color="textSecondary"
            variant="overline"
        >
          SIP 010 Tokens
        </Typography>
      </CardContent>
    </Card>
);
