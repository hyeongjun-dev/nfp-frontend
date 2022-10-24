import {DashboardLayout} from "../../../components/dashboard/dashboard-layout";
import {
  Box,
  Card,
  CardHeader,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from "@mui/material";
import {Reports as ReportIcon} from '../../../icons/reports';
import {useEffect, useState} from "react";
import {
  InformationCircleOutlined as InformationCircleOutlinedIcon
} from "../../../icons/information-circle-outlined";
import StringHelper from "../../../utils/StringHelper";
import {aptosApi} from '../../../__fake-api__/aptos-api';

const Projects = () => {
  const [projectList, setProjectList] = useState([]);

  useEffect(async () => {
    const nftProjects = await aptosApi.getNftProjects();
    const defiProjects = await aptosApi.getDefiProjects();
    const walletProjects = await aptosApi.getWalletProjects();
    const launchpadProjects = await aptosApi.getLaunchpadProjects();

    // const projectInfoMap = await aptosApi.getProejctInfoMap();
    //
    // for (const d of projectsData) {
    //   d.displayInfo = projectInfoMap.hasOwnProperty(StringHelper.trimAndUppercase(d.symbol));
    // }

    nftProjects['title'] = 'NFT Marketplace';
    defiProjects['title'] = 'DeFi'
    walletProjects['title'] = 'Wallet';
    launchpadProjects['title'] = 'Launchpad'

    const data = [];
    data.push(nftProjects);
    data.push(defiProjects);
    data.push(walletProjects);
    data.push(launchpadProjects);

    setProjectList(data);
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
        py: 7
      }}
    >
      <Container sx={{mb: 4}}>
        <Typography variant={"h4"}>
          Aptos Projects
        </Typography>
        {
          projectList.map(projects => {
            return (
              <Card sx={{mt: 4}}>
                <CardHeader
                  // avatar={<ReportIcon/>}
                  title={projects['title']}
                  // action={(
                  //   <Tooltip title="MarketCap = totalSupply x price">
                  //     <InformationCircleOutlinedIcon sx={{color: 'action.active'}}/>
                  //   </Tooltip>
                  // )}
                />
                <TableContainer>
                  <Table sx={{border: "0.5px solid #dadada"}}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">
                          <Box ml={1}>
                            #
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box ml={5}>
                            PROJECT
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          Description
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {projects.map((project, index) => {
                        return (
                          <>
                            <TableRow hover
                              key={index}
                              sx={{
                                '&:last-child td': {
                                  border: 0
                                },
                                background: "#ffffff",
                                hover: {
                                  color: "#374151"
                                },
                                cursor: "pointer"
                              }}
                            >
                              <TableCell align="left" onClick={event => goToProjectInfoPage(event, project)}>
                                <Box ml={1} onClick={event => goToProjectInfoPage(event, project)}>
                                  {index + 1}
                                </Box>
                              </TableCell>
                              <TableCell onClick={event => goToProjectInfoPage(event, project)}>
                                <Box
                                  ml={5}
                                  sx={{
                                    alignItems: 'left',
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
                                </Box>
                              </TableCell>
                              <TableCell align="left" onClick={event => goToProjectInfoPage(event, project)}>
                                <Typography variant="subtitle2">
                                  {project.shortDescription}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>

            )
          })
        }

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
