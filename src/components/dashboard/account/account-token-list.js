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

const sortTokenList = (tokens, order) => tokens
  .sort((a, b) => {
    if (order === 'asc') {
      return a.balance < b.balance ? -1 : 1;
    }

    return a.balance > b.balance ? -1 : 1;
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
  const fungibleTokenList = props.fungibleTokenList;

  const handleSort = () => {
    setOrder((prevOrder) => {
      if (prevOrder === 'asc') {
        return 'desc';
      }

      return 'asc';
    });
  };

  // const sortedTokenList = sortTokenList(fungibleTokenList, order);

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
              Name
            </TableCell>
            <TableCell>
              Balance
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
          {fungibleTokenList && fungibleTokenList.map((token) => (
            <TableRow
              key={token.name}
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
                  {/*<Box*/}
                  {/*  sx={{*/}
                  {/*    height: 16,*/}
                  {/*    width: 16,*/}
                  {/*    '& img': {*/}
                  {/*      height: 16,*/}
                  {/*      width: 16*/}
                  {/*    }*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <img*/}
                  {/*    alt={token.name}*/}
                  {/*    src={token.flag}*/}
                  {/*  />*/}
                  {/*</Box>*/}
                  <Typography
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {token.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {token.balance}
              </TableCell>
              <TableCell>
                {token.price}
              </TableCell>
              <TableCell>
                {token.value}
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
