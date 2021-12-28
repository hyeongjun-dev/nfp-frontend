import { useCallback } from 'react';
import { showConnect } from '@stacks/connect';
import { AppConfig, UserSession } from '@stacks/auth';
import { authOrigin } from './constants';
import { atom, useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import {useStxAddresses} from "./hooks";

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSessionState = atom(new UserSession({ appConfig }));
export const userDataState = atom();
export const authResponseState = atom();

export const useConnect = () => {
  const [userSession] = useAtom(userSessionState);
  const setUserData = useUpdateAtom(userDataState);
  const setAuthResponse = useUpdateAtom(authResponseState);
  const {ownerStxAddress} = useStxAddresses(userSession);

  const onFinish = async payload => {
    setAuthResponse(payload.authResponse);
    const userData = await payload.userSession.loadUserData();
    setUserData(userData);
    window.location.reload();
  };

  const authOptions = {
    authOrigin: authOrigin,
    onFinish,
    userSession, // usersession is already in state, provide it here
    redirectTo: '/',
    manifestPath: '/manifest.json',
    appDetails: {
      name: 'NFP',
      icon: '/apple-touch-icon.png'
    },
  };

  const handleOpenAuth = () => {
    showConnect(authOptions);
  };

  const handleSignOut = useCallback(() => {
    let parameter = window.location.search
    userSession?.signUserOut("/app" + parameter);
  }, [userSession]);

  return { handleOpenAuth, handleSignOut, authOptions, userSession, ownerStxAddress};
};
