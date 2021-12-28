import {Box, Button} from "@mui/material";
import {useConnect} from "./auth";
import {useSelector} from "../store";
import {useEffect} from "react";

export const Connect = (props) => {
  const {handleOpenAuth, handleSignOut} = useConnect();
  const { connected } = useSelector((state) => state.connect);

  if (!connected) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2
        }}>
        <Button
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
          variant="contained"
          onClick={() => handleSignOut()}
        >
          SignOut
        </Button>
      </Box>
    )
  }
}
