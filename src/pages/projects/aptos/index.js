import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";
import {
  Box,
  Card,
  CardHeader,
  Collapse,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {aptosApi} from '../../../__fake-api__/aptos-api';
import {ProjectInfo} from "../../../components/projects/ProjectInfo";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {Reports as ReportIcon} from "../../../icons/reports";
import {InformationCircleOutlined as InformationCircleOutlinedIcon} from "../../../icons/information-circle-outlined";
import {useTheme} from "@mui/material/styles";
import axios from "axios";


const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [totalMarketCap, setTotalMarketCap] = useState(0);
  const [activatedTarget, setActivatedTarget] = useState('');
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const COLUMN_WIDTHS = [100, 100, 100, 100, 100, 100, 100];
  const COLUMN_LEFT_MARGINS = [4, 0, 0, 0, 0, 2, 0];

  useEffect(async () => {
    const nftProjects = await aptosApi.getNftProjects();
    const defiProjects = await aptosApi.getDefiProjects();
    const walletProjects = await aptosApi.getWalletProjects();
    const launchpadProjects = await aptosApi.getLaunchpadProjects();

    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=aptos&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      setTotalMarketCap(res["data"][0]["market_cap"]);
    } catch (e) {
      setTotalMarketCap(-1);
    }
    // const projectInfoMap = await aptosApi.getProejctInfoMap();
    //
    // for (const d of projects) {
    //   d.displayInfo = projectInfoMap.hasOwnProperty(StringHelper.trimAndUppercase(d.symbol));
    // }

    let data = [];
    data = data.concat(nftProjects)
    data = data.concat(defiProjects)
    data = data.concat(walletProjects)
    data = data.concat(launchpadProjects)

    console.log(data);
    setProjects(data);
  }, [])

  function goToProjectInfoPage(event, project) {
    if (project.url) {
      event.preventDefault();
      window.open(project.url);
    }
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 7,
        width: "100%"
      }}
    >
      <Container sx={{mb: 4}}>
        <Typography variant={"h4"} style={{
          background: "-webkit-linear-gradient(45deg, #e9e1fe 30%, #e3eafc 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Ecosystem Projects
        </Typography>
        <ProjectInfo totalMarketCap={totalMarketCap}/>
        <Card
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#54576a',
            borderWidth: 1,
            borderStyle: 'solid',
            mt: 4
          }}
        >
          <CardHeader
            avatar={<ReportIcon sx={{color:"white"}}/>}
            title={<Typography variant="h6" color="white">Project List</Typography>}
            action={(
              <Tooltip title="MarketCap = totalSupply x price">
                <InformationCircleOutlinedIcon sx={{color: 'action.active'}}/>
              </Tooltip>
            )}
          />
          <TableContainer>
            <Table sx={{border: "0.5px solid #dadada"}}>
              <TableHead
                sx={{background:'rgba(255, 255, 255, 0.1)',
                  borderColor: '#54576a',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  mt: 4
                }}
              >
                <TableRow>
                  <TableCell width={COLUMN_WIDTHS[0]} align="left">
                    <Box ml={COLUMN_LEFT_MARGINS[0]} color={"white"}>
                      {"#"}
                    </Box>
                  </TableCell>
                  <TableCell width={COLUMN_WIDTHS[1]} align="left">
                    <Box ml={COLUMN_LEFT_MARGINS[1]} color={"white"}>
                      PROJECT
                    </Box>
                  </TableCell>
                  <TableCell width={COLUMN_WIDTHS[2]} align="left">
                    <Box ml={COLUMN_LEFT_MARGINS[2]} color={"white"}>
                      TOKEN
                    </Box>
                  </TableCell>
                  <TableCell width={COLUMN_WIDTHS[3]} align="left">
                    <Box ml={COLUMN_LEFT_MARGINS[3]} color={"white"}>
                      PRICE
                    </Box>
                  </TableCell>
                  <TableCell width={COLUMN_WIDTHS[4]} align="left">
                    <Box ml={COLUMN_LEFT_MARGINS[4]} color={"white"}>
                      MARKET CAP
                    </Box>
                  </TableCell>
                  <TableCell width={COLUMN_WIDTHS[5]} align="left">
                    <Box ml={COLUMN_LEFT_MARGINS[5]} color={"white"}>
                      24H
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  background:'transparent',
                  borderColor: '#54576a',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  mt: 4,
                }}
              >
                {projects.map((project, index) => {
                  return (
                    <>
                      <TableRow
                        key={index}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#5149e5 !important"
                          },
                        }}
                      >
                        <TableCell width={COLUMN_WIDTHS[0]} align="left" onClick={event => goToProjectInfoPage(event, project)}>
                          <Box ml={COLUMN_LEFT_MARGINS[0]} onClick={event => {}}>
                            <Typography
                              variant="subtitle2"
                              color={"white"}
                            >
                              {index + 1}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width={COLUMN_WIDTHS[1]} onClick={event => goToProjectInfoPage(event, project)}>
                          <Box
                            ml={COLUMN_LEFT_MARGINS[1]}
                            sx={{
                              alignItems: 'center',
                              display: 'flex'
                            }}
                          >
                            <a target='_blank'>
                              <img
                                style={{display: 'inline-block', verticalAlign: 'middle'}}
                                width={30}
                                height={30}
                                src={project.image}
                              />
                            </a>
                            <Typography
                              sx={{ml: 2}}
                              variant="subtitle2"
                              color={"white"}
                            >
                              {project.project}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width={COLUMN_WIDTHS[2]} align="left" onClick={event => goToProjectInfoPage(event, project)}>
                          <Box ml={COLUMN_LEFT_MARGINS[2]}>
                            <Typography color={"white"} variant="subtitle2">
                              {"-"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width={COLUMN_WIDTHS[3]} align={"left"} onClick={event => goToProjectInfoPage(event, project)}>
                          <Box ml={COLUMN_LEFT_MARGINS[3]}>
                            <Typography variant="subtitle2" color={"white"}>
                              {"-"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width={COLUMN_WIDTHS[4]} align={"left"} onClick={event => goToProjectInfoPage(event, project)}>
                          <Box ml={COLUMN_LEFT_MARGINS[4]}>
                            <Typography variant="subtitle2" color={"white"}>
                              {"-"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width={COLUMN_WIDTHS[5]} align={"left"} onClick={event => goToProjectInfoPage(event, project)}>
                          <Box ml={COLUMN_LEFT_MARGINS[5]}>
                            <Typography variant="subtitle2" color={"white"}>
                              {"-"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell width={COLUMN_WIDTHS[6]} align={"left"} sx={{":hover": false}}>
                          <Box ml={COLUMN_LEFT_MARGINS[6]}>
                            <IconButton onClick={() => {
                              // let newOpenMap = {...openMap}
                              // newOpenMap[index] = openMap[index] !== undefined ? !openMap[index] : true
                              // setOpenMap(newOpenMap)
                              // if(activatedTarget === project.symbol){
                              //   setOpen(!open)
                              // }else{
                              //   setOpen(true)
                              // }
                              // setActivatedTarget(project.symbol)
                            }}>
                              {activatedTarget === project.symbol && open ? <KeyboardArrowUpIcon sx={{color:"#A0AEC0"}}/> : <KeyboardArrowDownIcon sx={{color:"#A0AEC0"}}/>}
                            </IconButton>
                          </Box>
                        </TableCell>
                      </TableRow>
                      <TableRow key={'chart_' + index}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: "none"}} colSpan={7}>
                          <Collapse in={activatedTarget === project.symbol && open} unmountOnExit>
                            {/*<Chart symbol={project.symbol}/>*/}
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </Box>
  )
};

Projects.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Projects;
