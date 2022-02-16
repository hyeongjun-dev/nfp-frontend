import {Card, CardHeader, Divider, useMediaQuery} from '@mui/material';
import {PropertyList} from '../../property-list';
import {PropertyListItem} from '../../property-list-item';

export const AccountOverviewList = (props) => {
  const {totalSpentFees} = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const align = mdUp ? 'horizontal' : 'vertical';

  return (
      <Card>
        <CardHeader title="Overview"/>
        <Divider/>
        <PropertyList>
          <PropertyListItem
              align={align}
              divider
              label="Total spent fees"
              value={`${(totalSpentFees || 0)} STX`}
          />
        </PropertyList>
      </Card>
  );
};
