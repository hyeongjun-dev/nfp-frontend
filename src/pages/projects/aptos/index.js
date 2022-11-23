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
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
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
        <Typography variant={"h4"} style={{
          background: "-webkit-linear-gradient(45deg, #e9e1fe 30%, #e3eafc 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          Aptos Projects
        </Typography>
        {
          projectList.map(projects => {
            return (
              <Card sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: '#54576a',
                borderWidth: 1,
                borderStyle: 'solid',
                mt: 4
              }}>
                <CardHeader
                  title={<Box color={"white"}>{projects['title']}</Box>}
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
                        <TableCell align="left">
                          <Box ml={1} color={"white"}>
                            #
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box ml={5} color={"white"}>
                            PROJECT
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Box color={"white"}>
                            Description
                          </Box>
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
                            <TableRow hover
                              key={index}
                              sx={{
                                '&:last-child td': {
                                  border: 0
                                },
                                "&:hover": {
                                  backgroundColor: "#5149e5 !important"
                                },
                                cursor: "pointer"
                              }}
                            >
                              <TableCell style={{width: 16}} align="left" onClick={event => goToProjectInfoPage(event, project)}>
                                <Box ml={1} onClick={event => goToProjectInfoPage(event, project)} color={"white"}>
                                  {index + 1}
                                </Box>
                              </TableCell>
                              <TableCell style={{ width: 320 }} onClick={event => goToProjectInfoPage(event, project)}>
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
                                      color={"white"}
                                    >
                                      {project.project}
                                    </Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="left" onClick={event => goToProjectInfoPage(event, project)}>
                                <Typography variant="subtitle2" color={"white"}>
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
