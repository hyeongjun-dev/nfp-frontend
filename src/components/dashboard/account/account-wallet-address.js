import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';

export const AccountWalletAddress = (props) => (
    <Card {...props}>
      <CardContent>
        <Typography
            variant="h4"
            color="secondary"
        >
          SPXADFDFD .... STT2EKYX
        </Typography>
        <Typography
            color="textSecondary"
            variant="overline"
        >
          Wallet Address
        </Typography>
      </CardContent>
    </Card>
);
