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
import {useTheme} from "@mui/material/styles";

export const ContentShareDialog = (props) => {
  const { onClose, open, ...other } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      sx={{
        backdropFilter: "blur(1px)"
      }}
      PaperProps={{
        style: { borderRadius: 8,
          borderWidth: 1,
          borderColor: '#5c6182',
          borderStyle: 'solid',
        }
      }}
      {...other}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          background:'#253165',
          borderWidth: 0,
          borderBottomWidth: 1,
          borderColor: '#5c6182',
          borderStyle: 'solid',
        }}
      >
        <Typography variant="h6" sx={{color:"#979cb5"}}>
          Share
        </Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <XIcon fontSize="small" sx={{color:"#979cb5"}}/>
        </IconButton>
      </Box>
      <DialogContent sx={{backgroundColor: "#253165"
      }}>
        <Stack direction="row" spacing={2} justifyContent="center"
               alignItems="center">
          <Stack direction="column">
            <FacebookShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              quote={"NFP STUDIO"}
              hashtag="#nfp"
            >
              <Stack
                sx={{
                  '&:hover': {
                    borderRadius: 24,
                    boxShadow: "0 0 10px #9ecaed",
                    width: 48,
                    height: 48
                  },
                }}
              >
                <FacebookIcon
                  borderRadius={48}
                  size={48}
                />
              </Stack>
            </FacebookShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block" sx={{color: "white", marginTop: "4px"}}>Facebook</Typography>
          </Stack>
          <Stack direction="column">
            <WhatsappShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              separator=":: "
            >
              <Stack
                sx={{
                  '&:hover': {
                    borderRadius: 24,
                    boxShadow: "0 0 10px #9ecaed",
                    width: 48,
                    height: 48
                  },
                }}
              >
                <WhatsappIcon
                  borderRadius={48}
                  size={48}
                />
              </Stack>
            </WhatsappShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block" sx={{color: "white", marginTop: "4px"}}>WhatsApp</Typography>
          </Stack>
          <Stack direction="column">
            <TwitterShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              hashtags={["nfp"]}
            >
              <Stack
                sx={{
                  '&:hover': {
                    borderRadius: 24,
                    boxShadow: "0 0 10px #9ecaed",
                    width: 48,
                    height: 48
                  },
                }}
              >
                <TwitterIcon
                  borderRadius={48}
                  size={48}
                />
              </Stack>
            </TwitterShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block" sx={{color: "white", marginTop: "4px"}}>Twitter</Typography>
          </Stack>
          <Stack direction="column">
            <TelegramShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
            >
              <Stack
                sx={{
                  '&:hover': {
                    borderRadius: 24,
                    boxShadow: "0 0 10px #9ecaed",
                    width: 48,
                    height: 48
                  },
                }}
              >
                <TelegramIcon
                  borderRadius={48}
                  size={48}
                />
              </Stack>
            </TelegramShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block" sx={{color: "white", marginTop: "4px"}}>Telegram</Typography>
          </Stack>
          <Stack direction="column">
            <RedditShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
            >
              <Stack
                sx={{
                  '&:hover': {
                    borderRadius: 24,
                    boxShadow: "0 0 10px #9ecaed",
                    width: 48,
                    height: 48
                  },
                }}
              >
                <RedditIcon
                  borderRadius={48}
                  size={48}
                />
              </Stack>
            </RedditShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block" sx={{color: "white", marginTop: "4px"}}>Reddit</Typography>
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
