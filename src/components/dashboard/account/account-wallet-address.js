import numeral from 'numeral';
import {Card, CardContent, Typography} from '@mui/material';
import StringHelper from "../../../utils/StringHelper";

export const AccountWalletAddress = (props) => (
    <Card {...props}
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
          { StringHelper.getElipsedHashAddress(props.address || "-") }
        </Typography>
        <Typography
            color="white"
            variant="overline"
        >
          Wallet Address
        </Typography>
      </CardContent>
    </Card>
);
