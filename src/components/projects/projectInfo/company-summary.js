import PropTypes from 'prop-types';
import {Card, CardContent, Typography} from '@mui/material';
import {PropertyList} from '../../property-list';
import {PropertyListItem} from '../../property-list-item';

export const CompanySummary = (props) => {
  const { projectInfo, ...other } = props;

  return (
    <Card {...other}>
      <CardContent>
        <Typography
          color="textSecondary"
          variant="overline"
        >
          About
        </Typography>
        <PropertyList>
          <PropertyListItem
            align="vertical"
            label="Website"
            sx={{
              mt: 2,
              p: 0
            }}
            value={projectInfo.website}
          />
        </PropertyList>
      </CardContent>
    </Card>
  );
};

CompanySummary.propTypes = {
  projectInfo: PropTypes.object.isRequired
};
