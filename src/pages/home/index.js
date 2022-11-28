import {Box, IconButton, Stack, Typography, useMediaQuery} from "@mui/material";
import {useCallback} from "react";
import Head from "next/head";
import {LandingLayout} from "../../components/dashboard/landing-layout";
import Particles from "react-particles";
import {loadFull} from "tsparticles";
import {useTheme} from "@mui/material/styles";


const ChainSelectButton = ({src, chainName, color="white", onClick=null, active= true}) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const getIconSize = () => {
    if (lgUp)
      return 64
    if (mdUp)
      return 64
    if (smUp)
      return 64
    return 32
  };

  const getIconStyle = () => {
    if (active) {
      return {
        '&:hover': {
          borderColor: '#9ecaed',
          boxShadow: "0 0 10px #9ecaed",
        },
        borderRadius: 120
      }
    }
    return {
      borderRadius: 120
    }
  }

  const getIconTextColor = () => {
    if (active) {
      return "rgba(255, 255, 255, 1)"
    }
    return "rgba(255, 255, 255, 0.25)"
  }

  return (
    <Stack>
      <IconButton
        disabled={!active}
        sx={getIconStyle()}
        onClick={onClick}
      >
        <img
          style={{
            backgroundColor: color,
            borderRadius: 120,
            borderWidth: 1,
            borderColor: color,
            borderStyle: "solid",
            zIndex: 10,
            opacity: active ? 1 : 0.25
          }}
          width={getIconSize()}
          height={getIconSize()}
          src={src}
        >
        </img>
      </IconButton>
      <Stack sx={{flex:1}} flexDirection={'row'} justifyContent={"center"}>
        <Typography sx={{fontWeight: 'bold'}} variant={"subtitle2"} color={getIconTextColor()}>{chainName}</Typography>
      </Stack>
    </Stack>
  )
}

const Home = () => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const getParticleCount = () => {
    if (lgUp)
      return 40
    if (mdUp)
      return 20
    if (smUp)
      return 10
    return 10
  };

  const getMainTitleVariant = () => {
    if (lgUp)
      return "h1"
    if (mdUp)
      return "h1"
    if (smUp)
      return "h3"
    return "h4"
  }

  const getVersionTitleVariant = () => {
    if (lgUp)
      return "h5"
    if (mdUp)
      return "h5"
    if (smUp)
      return "h6"
    return "subtitle2"
  }

  const particlesInit = useCallback(async engine => {
    // console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    // await console.log(container);
  }, []);

  return (
    <>
      <Head>
        <title>
          Staking
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          width: "100%",
          flexGrow: 1,
          height: '100%',
          marginTop: 0,
        }}
      >
        <Particles
          style={{
            marginTop: 64,
          }}
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                // enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: false,
              },
              move: {
                directions: "none",
                enable: true,
                outModes: {
                  // default: "bounce",
                },
                random: true,
                speed: 1,
                straight: true,
              },
              number: {
                density: {
                  // enable: true,
                  // area: 10,
                },
                value: getParticleCount(),
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
            zLayers: 1,
          }}
        />
        <Stack sx={{flex:1, height: '100%', zIndex: 10}} direction={"column"} alignItems={"center"} justifyContent={"center"}>
          <Stack sx={{marginBottom: 8}}>
            <Stack sx={{marginTop: 0, borderWidth: 0, borderLeftWidth: 3, borderStyle: 'solid', borderColor: 'white', paddingLeft: 3}}>
              <Stack>
                <Stack direction={"row"}>
                  <Typography
                    style={{
                      background: "-webkit-linear-gradient(45deg, #e9e1fe 30%, #e3eafc 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    variant={getMainTitleVariant()}>DeSpread
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction={"row"}>
                <Typography
                  style={{
                    background: "-webkit-linear-gradient(45deg, #e9e1fe 30%, #e3eafc 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginTop: 0
                  }}
                  variant={getMainTitleVariant()} >Multi-chain Dashboard</Typography>
                <Typography
                  style={{
                    // color:"white"
                    background: "-webkit-linear-gradient(45deg, #e9e1fe 30%, #e3eafc 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginLeft: 1,
                  }}
                  variant={getVersionTitleVariant()}>beta
                </Typography>

              </Stack>
            </Stack>
            <Stack spacing={4} sx={{flex:1, marginTop: 8}} direction={"row"} alignItems={"center"} justifyContent={"center"}>
              <ChainSelectButton onClick={()=>{
                window.location.href = `/projects/stacks`;
              }} src={"/static/icons/stx_icon.svg"} chainName={"Stacks"}/>
              <ChainSelectButton onClick={()=>{
                window.location.href = `/projects/aptos`;
              }} src={"/static/icons/aptos_icon.svg"} chainName={"Aptos"}/>
              <ChainSelectButton src={"/static/icons/eth_icon.svg"} chainName={"Ethereum"} active={false}/>
              <ChainSelectButton src={"/static/icons/boba_icon.svg"} chainName={"Boba"} active={false} color={"black"}/>
            </Stack>
          </Stack>
        </Stack>
        <Stack sx={{flex:1, marginTop: -10}} flexDirection={"column"} alignItems={"center"}>
          {
            smUp ?
              (
              <Typography color={"white"} variant={"subtitle1"}>© 2022, DESPREAD LABS. ALL RIGHTS RESERVED.</Typography>
              ) :
              (
                <Stack direction={"column"} sx={{flex:1}} justifyContent={"center"}>
                  <Typography color={"white"} variant={"body2"}>© 2022, DESPREAD LABS</Typography>
                  <Typography color={"white"} variant={"body2"} align={"center"}>ALL RIGHTS RESERVED.</Typography>
                </Stack>
              )
          }
        </Stack>
      </Box>
    </>
  );
}


Home.getLayout = (page) => (
  <LandingLayout>
    {page}
  </LandingLayout>
);

export default Home;