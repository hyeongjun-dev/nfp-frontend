import {Box, Button, Snackbar} from "@mui/material";
import {useAtomValue} from "jotai/utils";
import {useConnect, userSessionState} from "../../connect/auth";
import {useStxAddresses} from "../../connect/hooks";
import {StacksMainnet, StacksTestnet} from "@stacks/network";
import {Connect} from '@stacks/connect-react';
import {useConnect as uc} from "@stacks/connect-react";

import {noneCV, someCV, standardPrincipalCV, uintCV} from "@stacks/transactions";
import {testnet} from "../../connect/constants";
import {useState} from "react";

function toStxAmount(amount){
  return amount * 1000000
}

const linkButton = (txId) =>{
  let url = `https://explorer.stacks.co/txid/${txId}?chain=mainnet`
  return (
    <Button variant={"text"} color={"primary"} size={"small"}>
      <a href={url} target={"_blank"} style={{textDecoration: "none", color: "#0088ff"}}>View</a>
    </Button>
  )
}

export const StackingDelegateBtn = (props) => {
  const {authOptions} = useConnect();
  const {doContractCall} = uc();
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);
  const [state, setState] = useState({
    open: false,
    message: '',
    txId: ''
  });

  const handleClose = () => {
    setState({...state, open: false});
  };

  async function openDelegate(amount) {
    if(amount < 100){
      setState({
        open: true,
        message: 'Minimum delegate amount is 100 STX'
      })
      return
    }
    let delegate_to = props.stackingInfo.poolAddress

    let contractAddress = testnet ? 'ST000000000000000000002AMW42H' : 'SP000000000000000000002Q6VF78'
    let contractName = 'pox'
    let functionName = 'delegate-stx'
    let functionArgs = [uintCV(toStxAmount(amount)), standardPrincipalCV(delegate_to), someCV(uintCV(props.untilBurnHeight)), noneCV()]

    await doContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs: functionArgs,
      network: testnet ? new StacksTestnet() : new StacksMainnet(),
      onFinish: data => {
        setState({
          open: true,
          message: `Delegate transaction broadcast succeed. `,
          txId: data.txId
        })
      },
      onCancel: () => {
      },
    });
  }

  return (
    <Box>
      <Connect authOptions={authOptions}>
        <Button sx={{width: "100%", borderRadius: '5px'}} variant={"contained"} onClick={() => {
          openDelegate(props.delegateAmount)
        }} disabled={props.stackingInfo.deadLine < 0}>{props.stackingInfo.deadLine < 0 ? `${props.stackingInfo.nextRewardCycleIn} block left` : 'Delegate'}</Button>
      </Connect>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={state.open}
        autoHideDuration={7000}
        onClose={handleClose}
        message={state.message}
        action={state.txId? linkButton(state.txId) : ''}
      />
    </Box>
  )
}
