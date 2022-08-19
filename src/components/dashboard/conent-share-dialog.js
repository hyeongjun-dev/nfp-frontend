import {Box, Dialog, DialogContent, IconButton, Stack, Typography} from '@mui/material';
import {X as XIcon} from '../../icons/x';
import PropTypes from 'prop-types';
import {
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const ContentShareDialog = (props) => {
  const { onClose, open, ...other } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      {...other}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2
        }}
      >
        <Typography variant="h6">
          Share
        </Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <Stack direction="row" spacing={2} justifyContent="center"
               alignItems="center">
          <Stack direction="column">
            <FacebookShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              quote={"NFP STUDIO"}
              hashtag="#nfp"
            >
              <FacebookIcon
                borderRadius={48}
                size={48}
              />
            </FacebookShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Facebook</Typography>
          </Stack>
          <Stack direction="column">
            <WhatsappShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              separator=":: "
            >
              <WhatsappIcon
                borderRadius={48}
                size={48}
              />
            </WhatsappShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">WhatsApp</Typography>
          </Stack>
          <Stack direction="column">
            <TwitterShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              hashtags={["nfp"]}
            >
              <TwitterIcon
                borderRadius={48}
                size={48}
              />
            </TwitterShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Twitter</Typography>
          </Stack>
          <Stack direction="column">
            <TelegramShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
            >
              <TelegramIcon
                borderRadius={48}
                size={48}
              />
            </TelegramShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Telegram</Typography>
          </Stack>
          <Stack direction="column">
            <RedditShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
            >
              <RedditIcon
                borderRadius={48}
                size={48}
              />
            </RedditShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Reddit</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

ContentShareDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
