import { addressToString } from '@stacks/transactions';
import { useState, useEffect } from 'react';
import { getStacksAccount } from './account';
import { mocknet, testnet } from './constants';
import { getUserData } from "@stacks/connect";

export function useStxAddresses(userSession) {
  const [ownerStxAddress, setOwnerStxAddress] = useState();
  const [appStxAddress, setAppStxAddress] = useState();
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      getUserData(userSession).then(userData => {
        const { address } = getStacksAccount(userData.appPrivateKey);
        setAppStxAddress(addressToString(address));
        setOwnerStxAddress(userData.profile.stxAddress[testnet || mocknet ? 'testnet' : 'mainnet']);
      });
    }
  }, [userSession]);

  return { ownerStxAddress, appStxAddress };
}
