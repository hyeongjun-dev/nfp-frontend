import {Box, Button} from "@mui/material";
import {useConnect} from "./auth";
import {useSelector} from "../store";

export const Connect = (props) => {
  const {handleOpenAuth, handleSignOut} = useConnect();
  const { connected } = useSelector((state) => state.connect);

  const pathName = window.location.pathname;
  if (pathName.toUpperCase().trim().indexOf('APTOS') !== -1) {
    return (
        <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: 2
            }}>
          <Button
              size={"small"}
              variant="contained"
              disabled={true}
          >
            Support Soon
          </Button>
        </Box>
    )
  }

  if (!connected) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}>
        <Button
          size={"small"}
          variant="contained"
          onClick={() => handleOpenAuth()}
        >
          Connect wallet
        </Button>
      </Box>
    )
  } else {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}>
        <Button
          size={"small"}
          variant="contained"
          onClick={() => handleSignOut()}
        >
          DISCONNECT
        </Button>
      </Box>
    )
  }
}
