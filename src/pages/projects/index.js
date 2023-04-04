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
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import {Reports as ReportIcon} from '../../icons/reports';
import {api} from "../../api/apiClient";
import {useEffect, useState} from "react";
import {withComma} from "../../utils/number";
import {ProjectTitle} from "../../components/projects/ProjectTitle";
import {ProjectInfo} from "../../components/projects/ProjectInfo";
import {InformationCircleOutlined as InformationCircleOutlinedIcon} from "../../icons/information-circle-outlined";
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

  const COLUMN_WIDTHS = [100, 100, 100, 100, 100, 100, 100];
  const COLUMN_LEFT_MARGINS = [4, 0, 0, 0, 0, 2, 0];

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
                    <TableCell width={COLUMN_WIDTHS[6]} align="left">
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
                            <Box ml={COLUMN_LEFT_MARGINS[0]} onClick={event => goToProjectInfoPage(event, project)}>
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
                                display: 'flex',
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
                                {project.symbol}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell width={COLUMN_WIDTHS[3]} align={"left"} onClick={event => goToProjectInfoPage(event, project)}>
                            <Box ml={COLUMN_LEFT_MARGINS[3]}>
                              <Typography variant="subtitle2" color={"white"}>
                                {'$' + parseFloat(project.price)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell width={COLUMN_WIDTHS[4]} align={"left"} onClick={event => goToProjectInfoPage(event, project)}>
                            <Box ml={COLUMN_LEFT_MARGINS[4]}>
                              <Typography variant="subtitle2" color={"white"}>
                                {'$' + withComma(parseInt(project.totalMarketCap))}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell width={COLUMN_WIDTHS[5]} align={"left"} onClick={event => goToProjectInfoPage(event, project)}>
                            <Box ml={COLUMN_LEFT_MARGINS[5]}>
                              <Typography variant="subtitle2" color={"white"}>
                                {isNaN(project.dayChangeRateByPercentage) ? '-' : parseFloat(project.dayChangeRateByPercentage) + '%'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell width={COLUMN_WIDTHS[6]} align={"left"} sx={{":hover": false}}>
                            <Box ml={COLUMN_LEFT_MARGINS[6]}>
                              <IconButton onClick={() => {
                                if(activatedTarget === project.symbol){
                                  setOpen(!open)
                                }else{
                                  setOpen(true)
                                }
                                setActivatedTarget(project.symbol)
                              }}>
                                {activatedTarget === project.symbol && open ? <KeyboardArrowUpIcon sx={{color:"white"}}/> : <KeyboardArrowDownIcon sx={{color:"white"}}/>}
                              </IconButton>
                            </Box>
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
