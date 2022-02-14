import {DashboardLayout} from "../../components/dashboard/dashboard-layout";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from "@mui/material";
import {api} from "../../api/apiClient";
import {useEffect, useState} from "react";
import {withComma} from "../../utils/number";
import {ProjectTitle} from "../../components/projects/ProjectTitle";
import {ProjectInfo} from "../../components/projects/ProjectInfo";

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [totalMarketCap, setTotalMarketCap] = useState(0)

  useEffect(() => {
    api.get(`/project`)
      .then(response => {
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
        py: 8
      }}
    >
      <Container sx={{mb: 4}}>
        <ProjectTitle/>
        <ProjectInfo totalMarketCap={totalMarketCap}/>
        <TableContainer>
          <Table sx={{mt: 4, border: "0.5px solid #dadada"}}>
            <TableHead>
              <TableRow>
                <TableCell>
                  #
                </TableCell>
                <TableCell>
                  PROJECT
                </TableCell>
                <TableCell>
                  TOKEN
                </TableCell>
                <TableCell sx={{textAlign: 'right'}}>
                  PRICE
                </TableCell>
                <TableCell sx={{textAlign: 'right'}}>
                  MARKET CAP
                </TableCell>
                <TableCell sx={{textAlign: 'right'}}>
                  TVL
                </TableCell>
                <TableCell sx={{textAlign: 'right'}}>
                  24H
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:last-child td': {
                        border: 0
                      },
                      background: "#ffffff"
                    }}
                  >
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <a target='_blank'>
                          <img
                            style={{display: 'inline-block', verticalAlign: 'middle'}}
                            width={24}
                            height={24}
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
                    <TableCell>
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
                        -
                      </Typography>
                    </TableCell>
                    <TableCell sx={{textAlign: 'right'}}>
                      <Typography variant="subtitle2">
                        -
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}

Projects.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Projects;
