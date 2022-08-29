import {DashboardLayout} from "../../components/dashboard/dashboard-layout";
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
import {OpenInNew} from "@mui/icons-material";
import StringHelper from "../../utils/StringHelper";
import {apiConfig} from "../../config";

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [totalMarketCap, setTotalMarketCap] = useState(0)
  const [activatedTarget, setActivatedTarget] = useState('')
  const [open, setOpen] = useState(false)
  const Chart = dynamic(() => import("../../components/projects/ProjectChart"), {
    ssr: false
  });

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

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 7
      }}
    >
      <Container sx={{mb: 4}}>
        <ProjectTitle/>
        <ProjectInfo totalMarketCap={totalMarketCap}/>
        <Card sx={{mt: 4}}>
          <CardHeader
            avatar={<ReportIcon/>}
            title="Project List"
            action={(
              <Tooltip title="MarketCap = totalSupply x price">
                <InformationCircleOutlinedIcon sx={{color: 'action.active'}}/>
              </Tooltip>
            )}
          />
          <TableContainer>
            <Table sx={{border: "0.5px solid #dadada"}}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Box ml={1}>
                      #
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box ml={5}>
                      PROJECT
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    TOKEN
                  </TableCell>
                  <TableCell align="right">
                    PRICE
                  </TableCell>
                  <TableCell align="right">
                    MARKET CAP
                  </TableCell>
                  <TableCell align="right">
                    24H
                  </TableCell>
                  <TableCell align="right">

                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project, index) => {
                  return (
                    <>
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td': {
                            border: 0
                          },
                          background: "#ffffff"
                        }}
                      >
                        <TableCell align="center">
                          <Box ml={1}>
                            {index + 1}
                          </Box>
                        </TableCell>
                        <TableCell>
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
                              >
                                {project.project}
                              </Typography>
                            { project.displayInfo ?
                                <a href={`/projects/info/${StringHelper.trimAndUppercase(project.symbol)}`} target={"_blank"}>
                                  <OpenInNew sx={{ml: 1}} style={{ fontSize: 15 }}/>
                                </a> :
                                ""
                            }
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle2">
                            {project.symbol}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{textAlign: 'right'}}>
                          <Typography variant="subtitle2">
                            {'$' + parseFloat(project.price)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{textAlign: 'right'}}>
                          <Typography variant="subtitle2">
                            {'$' + withComma(parseInt(project.totalMarketCap))}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{textAlign: 'right'}}>
                          <Typography variant="subtitle2">
                            {isNaN(project.dayChangeRateByPercentage) ? '-' : parseFloat(project.dayChangeRateByPercentage) + '%'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{textAlign: 'right'}}>
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
                            {activatedTarget === project.symbol && open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
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
  )
};

Projects.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Projects;
