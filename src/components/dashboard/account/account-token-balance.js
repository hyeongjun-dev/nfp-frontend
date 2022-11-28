import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';

export const AccountTokenBalance = (props) => (
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
          { numeral(props.numberOfFToken).format('0') }
        </Typography>
        <Typography
            color="white"
            variant="overline"
        >
          SIP 010 Tokens
        </Typography>
      </CardContent>
    </Card>
);
