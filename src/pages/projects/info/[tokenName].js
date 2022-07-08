import {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Link,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {projectInfoApi} from '../../../__fake-api__/project-info-api';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {
  CompanyOverview
} from '../../../components/projects/projectInfo/company-overview';
import {
  CompanySummary
} from '../../../components/projects/projectInfo/company-summary';
import {useMounted} from '../../../hooks/use-mounted';
import {gtm} from '../../../lib/gtm';
import {getInitials} from '../../../utils/get-initials';

const CompanyDetails = () => {
  const isMounted = useMounted();
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProjectInfo = useCallback(async () => {
    try {
      const data = await projectInfoApi.getProjectInfo();

      if (isMounted()) {
        const pageName = window.location.pathname.trim().split('/').slice(-1).pop().toUpperCase();
        console.log('pageName: ' + pageName);
        setProjectInfo(data[pageName]);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getProjectInfo();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!projectInfo) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {projectInfo.title}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/projects"
              passHref
            >
              <Link
                color="textPrimary"
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  Projects
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardHeader
                  disableTypography
                  title={(
                    <Box sx={{ display: 'flex' }}>
                      <Avatar
                        src={projectInfo.logo}
                        sx={{
                          background: 'transparent',
                          mr: 2
                        }}
                        variant="rounded"
                      >
                        {getInitials(projectInfo.title)}
                      </Avatar>
                      <div>
                        <Typography variant="h6">
                          {projectInfo.title}
                        </Typography>
                        <Typography
                          sx={{ mt: 1 }}
                          variant="body2"
                        >
                          {projectInfo.shortDescription}
                        </Typography>
                      </div>
                    </Box>
                  )}
                />
                <Divider />
                <CardContent>
                  <CompanyOverview projectInfo={projectInfo} />
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <CompanySummary projectInfo={projectInfo} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

CompanyDetails.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CompanyDetails;
