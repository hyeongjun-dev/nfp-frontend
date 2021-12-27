import { useState } from 'react';
import numeral from 'numeral';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from '../../../icons/information-circle-outlined';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';

const sortCountries = (countries, order) => countries
  .sort((a, b) => {
    if (order === 'asc') {
      return a.seo < b.seo ? -1 : 1;
    }

    return a.seo > b.seo ? -1 : 1;
  });

const countries = [
  {
    flag: '/static/icons/us_flag.svg',
    name: 'STX',
    seo: 102.31,
    visits: 2.3,
    value: 235.313
  },
  {
    flag: '/static/icons/uk_flag.svg',
    name: 'STX 2',
    seo: 101.31,
    visits: 2.3,
    value: 235.313
  },
  {
    flag: '/static/icons/ru_flag.svg',
    name: 'STX 3',
    seo: 100.31,
    visits: 2.3,
    value: 235.313
  },
  {
    flag: '/static/icons/ca_flag.svg',
    name: 'STX 4',
    seo: 98.31,
    visits: 2.3,
    value: 235.313
  },
  {
    flag: '/static/icons/de_flag.svg',
    name: 'STX 5',
    seo: 40.31,
    visits: 2.3,
    value: 235.313
  },
  {
    flag: '/static/icons/es_flag.svg',
    name: 'STX 6',
    seo: 102.31,
    visits: 2.3,
    value: 235.313
  }
];

export const AccountTokenList = (props) => {
  const [order, setOrder] = useState('desc');

  const handleSort = () => {
    setOrder((prevOrder) => {
      if (prevOrder === 'asc') {
        return 'desc';
      }

      return 'asc';
    });
  };

  const sortedCountries = sortCountries(countries, order);

  return (
    <Card {...props}>
      <CardHeader
        title="Token Balance"
        action={(
          <Tooltip title="Refresh rate is 24h">
            <InformationCircleOutlinedIcon sx={{ color: 'action.active' }} />
          </Tooltip>
        )}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Symbol
            </TableCell>
            <TableCell sortDirection={order}>
              <TableSortLabel
                active
                direction={order}
                onClick={handleSort}
              >
                Balance
              </TableSortLabel>
            </TableCell>
            <TableCell>
              Price
            </TableCell>
            <TableCell>
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedCountries.map((country) => (
            <TableRow
              key={country.name}
              sx={{
                '&:last-child td': {
                  border: 0
                }
              }}
            >
              <TableCell>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Box
                    sx={{
                      height: 16,
                      width: 16,
                      '& img': {
                        height: 16,
                        width: 16
                      }
                    }}
                  >
                    <img
                      alt={country.name}
                      src={country.flag}
                    />
                  </Box>
                  <Typography
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {country.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {country.seo}
              </TableCell>
              <TableCell>
                {numeral(country.visits).format('$0,0.00')}
              </TableCell>
              <TableCell>
                {numeral(country.value).format('$0,0.00')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/*<Divider />*/}
      {/*<CardActions>*/}
      {/*  <Button*/}
      {/*    endIcon={(*/}
      {/*      <ArrowRightIcon fontSize="small" />*/}
      {/*    )}*/}
      {/*  >*/}
      {/*    See more*/}
      {/*  </Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
};
