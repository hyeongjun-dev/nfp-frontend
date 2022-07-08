import PropTypes from 'prop-types';
import Markdown from 'react-markdown/with-html';
import {Box, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

const MarkdownWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  '& p': {
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body1.lineHeight,
    marginBottom: theme.spacing(2)
  }
}));

export const CompanyOverview = (props) => {
  const { projectInfo, ...other } = props;

  return (
    <div {...other}>
      {/*<Typography variant="h5">*/}
      {/*  {projectInfo.shortDescription}*/}
      {/*</Typography>*/}
      <Box sx={{ mt: 0 }}>
        <MarkdownWrapper>
          <Markdown source={projectInfo.description} />
        </MarkdownWrapper>
      </Box>
    </div>
  );
};

CompanyOverview.propTypes = {
    company: PropTypes.object.isRequired
};
