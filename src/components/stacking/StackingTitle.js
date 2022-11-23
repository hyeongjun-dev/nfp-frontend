import {Box, Card, CardContent, InputAdornment, Stack, Typography} from "@mui/material";
import CountUp from "react-countup";
import {styled} from "@mui/material/styles";
import Image from 'next/image';


const StacksImg = styled((props) => {
  const { variant, style, ...other } = props;

  return (
    <div style={style}>
      <svg width="40px" height="40px" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M278.086 271.369L363.056 400H299.58L199.832 248.866L100.084 400H36.9437L121.914 271.704H0V223.006H400V271.369H278.086Z" fill="white"/>
        <path d="M400 126.952V175.651V175.987H0V126.952H119.563L35.6003 0H99.0764L199.832 153.149L300.924 0H364.4L280.437 126.952H400Z" fill="white"/>
      </svg>
    </div>
  );
})``;


export const StackingTitle = (props) => {
  return (
    <>
      <Box sx={{mb: 4}}>
        <Stack direction={"row"} alignContent="center" justifyContent="space-between">
          <Box sx={{display: "flex", alignSelf: "center"}}>
            <StacksImg style={{marginRight:"15px", marginTop:"4px"}}/>
            <Typography variant="h4"
                        style={{
                          background: "-webkit-linear-gradient(45deg, #e9e1fe 30%, #e3eafc 90%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}
            >
              Stacks
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: '100%',
              minWidth: 400,
            }}
          >
            <Stack direction={"column"} justifyContent={"center"}>
              <Typography sx={{textAlign: "right"}} variant={"h5"} color={"white"}>{<CountUp duration={1.0} end={props.apy} decimals={1}/>}%</Typography>
              <Typography sx={{textAlign: "right"}} variant={"h7"} color={"white"}>Estimated APY</Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
