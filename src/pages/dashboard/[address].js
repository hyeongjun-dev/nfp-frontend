import {useEffect, useState} from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import {DashboardLayout} from '../../components/dashboard/dashboard-layout';
import {gtm} from '../../lib/gtm';
import {AccountFiatBalance} from "../../components/dashboard/account/account-fiat-balance";
import {AccountTokenBalance} from "../../components/dashboard/account/account-token-balance";
import {AccountWalletAddress} from "../../components/dashboard/account/account-wallet-address";
import {AccountFungibleTokenList} from "../../components/dashboard/account/account-fungible-token-list";
import {useSelector} from "../../store";
import {useConnect} from "../../connect/auth";
import {Search as SearchIcon} from "../../icons/search";
import {AccountOverviewList} from "../../components/dashboard/account/account-overview-list";
import {AccountStakeTokenList} from "../../components/dashboard/account/account-stake-token-list";
import {api} from "../../api/apiClient";
import {AccountFarmTokenList} from "../../components/dashboard/account/account-farm-token-list";
import {useRouter} from "next/router";
import {AccountVaultTokenList} from "../../components/dashboard/account/account-vault-token-list";

const Dashboard = () => {
  const [displayedOwnerStxAddress, setDisplayedOwnerStxAddress] = useState('');
  const [totalBalance, setTotalBalance] = useState(0)
  const [account, setAccount] = useState([])

  const [vaultList, setVaultList] = useState([])
  const [stakedTokenList, setStakedTokenList] = useState([])
  const [farmTokenList, setFarmedTokenList] = useState([])

  const [accountLoading, setAccountLoading] = useState(true)
  const [vaultLoading, setVaultLoading] = useState(true)
  const [stakedLoading, setStakedLoading] = useState(true)
  const [farmLoading, setFarmLoading] = useState(true)

  const {connected} = useSelector((state) => state.connect);
  const {ownerStxAddress} = useConnect();

  const router = useRouter();

  async function getAccounts(address) {
    return await api.get(`/account/balance?address=${address}`)
  }

  async function getVaultsList(address) {
    return await api.get(`/account/vault?address=${address}`)
  }

  async function getStakedTokenList(address) {
    return await api.get(`/account/staked?address=${address}`)
  }

  async function getFarmTokenList(address) {
    return await api.get(`/account/farm?address=${address}`)
  }

  async function fetchBalanceData(address) {
    try {
      setAccountLoading(true)
      setStakedLoading(true)
      setFarmLoading(true)
      setVaultLoading(true)

      let totalBalance = 0
      let accountsResponse = await Promise.all(
          [
              getAccounts(address),
            getVaultsList(address),
            getStakedTokenList(address),
            getFarmTokenList(address)
          ])

      let account = accountsResponse[0]
      setAccount(account.data)
      totalBalance += account.data.totalBalance

      let vault = accountsResponse[1]
      setVaultList(vault.data.data)

      let stake = accountsResponse[2]
      setStakedTokenList(stake.data.data)
      totalBalance += stake.data.data.reduce(
          (prevValue, currentValue) => prevValue + currentValue.value, 0)

      let farm = accountsResponse[3]
      setFarmedTokenList(farm.data.data)
      totalBalance += farm.data.data.reduce(
          (prevValue, currentValue) => prevValue + currentValue.value, 0)
      setTotalBalance(totalBalance)

    } finally {
      setAccountLoading(false)
      setStakedLoading(false)
      setFarmLoading(false)
      setVaultLoading(false)
    }

  }

  useEffect(() => {
    if (router && router.query) {
      const {address} = router.query;

      gtm.push({event: 'page_view'});

      let stxAddress;
      if (address) {
        stxAddress = address;
      } else if (connected && ownerStxAddress) {
        stxAddress = ownerStxAddress;
      }

      if (stxAddress) {
        setDisplayedOwnerStxAddress(stxAddress);
        fetchBalanceData(stxAddress)
        .catch(reason => {
          console.log(reason)
        })
      }
    }
  }, [ownerStxAddress, router]);

  const handleDismissBanner = () => {
    // Update the persistent state
    // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
  };

  const handleChangeWalletAddress = (event) => {
    const walletAddress = String(event.target.value);

    // FIXME: 주소 길이 41자이지만, 정확한 스펙은 확인 필요
    if ((walletAddress.length >= 40) || (walletAddress.endsWith('.btc'))) {
      setDisplayedOwnerStxAddress(walletAddress);

      console.log("Search by wallet address: " + walletAddress);
      fetchBalanceData(walletAddress)
      .catch(reason => {
        console.log(reason)
      })
    }
  };

  return (
      <>
        <Head>
          <title>
            Account Dashboard
          </title>
        </Head>

        <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 7
            }}
        >
          <Container maxWidth="lg">
            <Box sx={{mb: 4}}>
              <Grid
                  container
                  justifyContent="space-between"
                  spacing={3}
              >
                <Grid item>
                  <Typography variant="h4">
                    Account Dashboard
                  </Typography>
                </Grid>

                <Grid item>
                  <Box
                      sx={{
                        maxWidth: '100%',
                        minWidth: 400
                      }}
                  >
                    <TextField
                        fullWidth
                        onChange={handleChangeWalletAddress}
                        InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon fontSize="small"/>
                              </InputAdornment>
                          )
                        }}
                        placeholder="Your wallet address"
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid
                container
                spacing={4}
            >
              <Grid
                  item
                  md={4}
                  xs={12}
              >
                <AccountFiatBalance totalBalance={totalBalance}/>
              </Grid>
              <Grid
                  item
                  md={4}
                  xs={12}
              >
                <AccountTokenBalance
                    numberOfFToken={account.numberOfFungibleToken}/>
              </Grid>
              <Grid
                  item
                  md={4}
                  xs={12}
              >
                <AccountWalletAddress address={displayedOwnerStxAddress}/>
              </Grid>

              <Grid
                  item
                  md={12}
                  xs={12}
              >
                <AccountOverviewList totalSpentFees={account.totalSpentFees}/>
              </Grid>

              <Grid
                  item
                  md={12}
                  xs={12}
              >
                <AccountFungibleTokenList
                    fungibleTokenList={account.fungibleTokenList}
                    accountLoading={accountLoading}/>
              </Grid>

              <Grid
                  item
                  md={12}
                  xs={12}
              >
                <AccountVaultTokenList vaultList={vaultList}
                                       vaultLoading={vaultLoading}/>
              </Grid>

              <Grid
                  item
                  md={12}
                  xs={12}
              >
                <AccountStakeTokenList stakedTokenList={stakedTokenList}
                                       stakedLoading={stakedLoading}/>
              </Grid>

              <Grid
                  item
                  md={12}
                  xs={12}
              >
                <AccountFarmTokenList farmTokenList={farmTokenList}
                                      farmLoading={farmLoading}/>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
  );
};

Dashboard.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Dashboard;
