import {Card, CardHeader, Divider, Typography, useMediaQuery} from '@mui/material';
import {PropertyList} from '../../property-list';
import {PropertyListItem} from '../../property-list-item';

export const AccountOverviewList = (props) => {
  const {totalSpentFees} = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
      <Card
        sx={{background:'rgba(255, 255, 255, 0.1)',
          borderColor: '#54576a',
          borderWidth: 1,
          borderStyle: 'solid'
        }}
      >
        <CardHeader title={<Typography color="white" variant="h6">Overview</Typography>}/>
        <Divider light/>
        <PropertyList>
          <PropertyListItem
              align={align}
              // divider
              label="Total spent fees"
              value={`${(totalSpentFees || 0)} STX`}
          />
        </PropertyList>
      </Card>
  );
};
