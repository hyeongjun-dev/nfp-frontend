import {Box, Button} from "@mui/material";
import {useAtomValue} from "jotai/utils";
import {useConnect, userSessionState} from "../../connect/auth";
import {useStxAddresses} from "../../connect/hooks";
import {StacksMainnet, StacksTestnet} from "@stacks/network";
import {Connect} from '@stacks/connect-react';
import {useConnect as uc} from "@stacks/connect-react";

import {noneCV, standardPrincipalCV, uintCV} from "@stacks/transactions";
import {testnet} from "../../connect/constants";

function toStxAmount(amount){
  return amount * 1000000
}

export const StackingDelegateBtn = (props) => {
  const {authOptions} = useConnect();
  const {doContractCall} = uc();
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);

  async function openDelegate(amount) {
    let delegate_to = props.poolAddress

    let contractAddress = testnet ? 'ST000000000000000000002AMW42H' : 'SP000000000000000000002Q6VF78'
    let contractName = 'pox'
    let functionName = 'delegate-stx'
    let functionArgs = [uintCV(toStxAmount(amount)), standardPrincipalCV(delegate_to), uintCV(props.untilBurnHeight), noneCV()]

    await doContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs: functionArgs,
      network: testnet ? new StacksTestnet() : new StacksMainnet(),
      onFinish: data => {
        console.log("finished")
        console.log(data)
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
        }}>Delegate</Button>
      </Connect>
    </Box>
  )
}
