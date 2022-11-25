import {Box, Stack, Typography, useMediaQuery} from "@mui/material";
import CountUp from "react-countup";
import {styled} from "@mui/material/styles";


const StacksImg = styled(({style, width="40px", height="40px"}) => {
  return (
    <div style={style}>
      <svg width={width} height={height} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M278.086 271.369L363.056 400H299.58L199.832 248.866L100.084 400H36.9437L121.914 271.704H0V223.006H400V271.369H278.086Z" fill="white"/>
        <path d="M400 126.952V175.651V175.987H0V126.952H119.563L35.6003 0H99.0764L199.832 153.149L300.924 0H364.4L280.437 126.952H400Z" fill="white"/>
      </svg>
    </div>
  );
})``;


export const StackingTitle = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const getIconSize = () => {
    if (lgUp)
      return "40px"
    if (mdUp)
      return "40px"
    if (smUp)
      return "30px"
    return "30px"
  };

  return (
    <>
      <Box sx={{mb: 4}}>
        <Stack direction={"row"} alignContent="center" justifyContent="space-between">
          <Stack direction={"row"} alignItems={"center"}>
            <StacksImg width={getIconSize()} height={getIconSize()} style={{marginRight:"15px", marginTop:"4px"}}/>
            <Typography variant="h4"
                        style={{
                          background: "-webkit-linear-gradient(45deg, #e9e1fe 30%, #e3eafc 90%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}
            >
              Stacks
            </Typography>
          </Stack>
          <Box
            sx={{
              maxWidth: '100%',
            }}
          >
            <Stack direction={"column"} justifyContent={"center"}>
              <Typography sx={{textAlign: "right"}} color={"white"}>{<CountUp duration={1.0} end={props.apy} decimals={1}/>}%</Typography>
              <Typography sx={{textAlign: "right"}} color={"white"}>Estimated APY</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
