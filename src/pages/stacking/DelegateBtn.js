import {Box, Button} from "@mui/material";
import {useAtomValue} from "jotai/utils";
import {useConnect, userSessionState} from "../../connect/auth";
import {useStxAddresses} from "../../connect/hooks";
import {StacksTestnet} from "@stacks/network";
import {Connect} from '@stacks/connect-react';
import {useConnect as uc} from "@stacks/connect-react";

import {noneCV, standardPrincipalCV, uintCV} from "@stacks/transactions";

export const DelegateBtn = (props) => {
  const {authOptions} = useConnect();
  const {doContractCall} = uc();
  const userSession = useAtomValue(userSessionState);
  const {ownerStxAddress} = useStxAddresses(userSession);

  async function openDelegate(amount) {
    let delegate_to = 'ST36FGDM6D0X0JSMG9M9ZKQXHMRK3BCMF21B9YG5E'

    let contractAddress = 'ST000000000000000000002AMW42H'
    let contractName = 'pox'
    let functionName = 'delegate-stx'
    let functionArgs = [uintCV(amount), standardPrincipalCV(delegate_to), noneCV(), noneCV()]

    await doContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs: functionArgs,
      network: new StacksTestnet(),
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
