import {DashboardLayout} from "../../components/dashboard/dashboard-layout";
import {
  Box,
  Card,
  CardHeader,
  Collapse,
  Container, Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, TextField,
  Tooltip,
  Typography, useMediaQuery
} from "@mui/material";
import {Reports as ReportIcon} from '../../icons/reports';
import {api} from "../../api/apiClient";
import {useEffect, useState} from "react";
import {withComma} from "../../utils/number";
import {ProjectTitle} from "../../components/projects/ProjectTitle";
import {ProjectInfo} from "../../components/projects/ProjectInfo";
import {
  InformationCircleOutlined as InformationCircleOutlinedIcon
} from "../../icons/information-circle-outlined";
import {Chart} from "../../components/chart";
import dynamic from "next/dynamic";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import StringHelper from "../../utils/StringHelper";
import {apiConfig} from "../../config";
import {styled} from "@mui/material/styles";


const CssTextField = styled(TextField)(({theme}) => ({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.text.secondary,
    },
  },
}))

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [totalMarketCap, setTotalMarketCap] = useState(0)
  const [activatedTarget, setActivatedTarget] = useState('')
  const [open, setOpen] = useState(false)
  const Chart = dynamic(() => import("../../components/projects/ProjectChart"), {
    ssr: false
  });
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });

  // const mediaQuery = useMediaQuery((theme) => theme.breakpoints, {
  //   noSsr: true
  // });

  useEffect(() => {
    api.get(`/project`)
      .then(async (response) => {
        const responseOfProjectInfo = await api.get(apiConfig.projectInfo);
        const responseOfProjectInfoData = responseOfProjectInfo.data;

        for (const d of response.data) {
          d.displayInfo = responseOfProjectInfoData.hasOwnProperty(StringHelper.trimAndUppercase(d.symbol));
        }

        setProjects(response.data)
        let totalMarketCap = response.data.reduce((lastValue, currentValue) => {
          return lastValue + parseInt(currentValue.totalMarketCap)
        }, 0)

        setTotalMarketCap(totalMarketCap)
      })
  }, [])

  function goToProjectInfoPage(event, project) {
    if (project.displayInfo) {
      event.preventDefault();
      window.location.href = `/projects/info/${StringHelper.trimAndUppercase(project.symbol)}`
    }
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          width: "100%",
          flexGroxw: 1,
          py: 7,
        }}
      >
        <Container maxWidth="lg">
          <ProjectTitle/>
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
                    <TableCell align="center">
                      <Box ml={1} color={"white"}>
                        {"#"}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box ml={5} color={"white"}>
                        PROJECT
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color={"white"} variant={"h7"}>TOKEN</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color={"white"} variant={"h7"}>PRICE</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color={"white"} variant={"h7"}>MARKET CAP</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography color={"white"} variant={"h7"}>24H</Typography>
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
                          hover={project.displayInfo}
                          sx={{
                            "&:hover": {
                              backgroundColor: "#5149e5 !important"
                            },
                            cursor: project.displayInfo ? "pointer": undefined,
                          }}
                        >
                          <TableCell align="center" onClick={event => goToProjectInfoPage(event, project)}>
                            <Box ml={1} onClick={event => goToProjectInfoPage(event, project)}>
                              <Typography
                                sx={{ml: 2}}
                                variant="subtitle2"
                                color={"white"}
                              >
                                {index + 1}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell onClick={event => goToProjectInfoPage(event, project)}>
                            <Box
                              ml={5}
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
                          <TableCell align="center" onClick={event => goToProjectInfoPage(event, project)}>
                            <Typography color={"white"} variant="subtitle2">
                              {project.symbol}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{textAlign: 'right'}} onClick={event => goToProjectInfoPage(event, project)}>
                            <Typography variant="subtitle2" color={"white"}>
                              {'$' + parseFloat(project.price)}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{textAlign: 'right'}} onClick={event => goToProjectInfoPage(event, project)}>
                            <Typography variant="subtitle2" color={"white"}>
                              {'$' + withComma(parseInt(project.totalMarketCap))}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{textAlign: 'right'}} onClick={event => goToProjectInfoPage(event, project)}>
                            <Typography variant="subtitle2" color={"white"}>
                              {isNaN(project.dayChangeRateByPercentage) ? '-' : parseFloat(project.dayChangeRateByPercentage) + '%'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{textAlign: 'right', ":hover": false}}>
                            <IconButton onClick={() => {
                              // let newOpenMap = {...openMap}
                              // newOpenMap[index] = openMap[index] !== undefined ? !openMap[index] : true
                              // setOpenMap(newOpenMap)
                              if(activatedTarget === project.symbol){
                                setOpen(!open)
                              }else{
                                setOpen(true)
                              }
                              setActivatedTarget(project.symbol)
                            }}>
                              {activatedTarget === project.symbol && open ? <KeyboardArrowUpIcon sx={{color:"white"}}/> : <KeyboardArrowDownIcon sx={{color:"white"}}/>}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow key={'chart_' + index}>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0, border: "none"}} colSpan={7}>
                            <Collapse in={activatedTarget === project.symbol && open} unmountOnExit>
                              <Chart symbol={project.symbol}/>
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
    </>
  )
};

Projects.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Projects;
