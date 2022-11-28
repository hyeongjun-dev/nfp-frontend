import {useState} from 'react';
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography
} from '@mui/material';
import { ChartBar as ChartBarIcon } from '../../../icons/chart-bar';
import {Skeleton} from "@mui/lab";
import {asDollarFormat, asNumFormat} from "../../../utils/number";

const sortTokenList = (tokens, order, orderBasis) => tokens
  .sort((a, b) => {
    if (order === 'asc') {
      return a[orderBasis] < b[orderBasis] ? -1 : 1;
    }

    return a[orderBasis] > b[orderBasis] ? -1 : 1;
  });

export const AccountFarmTokenList = (props) => {
  const [order, setOrder] = useState('desc');
  const [orderBasis, setOrderBasis] = useState('balance');

  const [symbolDirection, setSymbolDirection] = useState('desc');
  const [balanceDirection, setBalanceDirection] = useState('desc');
  const [priceDirection, setPriceDirection] = useState('desc');
  const [valueDirection, setValueDirection] = useState('desc');

  const farmTokenList = props.farmTokenList;

  const handleSortBySymbol = (orderBasis) => {
    setSymbolDirection(changeOrder(symbolDirection));
    handleSort(orderBasis, symbolDirection);
  };

  const handleSortByBalance = (orderBasis) => {
    setBalanceDirection(changeOrder(balanceDirection));
    handleSort(orderBasis, balanceDirection);
  };

  const handleSortByPrice = (orderBasis) => {
    setPriceDirection(changeOrder(priceDirection));
    handleSort(orderBasis, priceDirection);
  };

  const handleSortByValue = (orderBasis) => {
    setValueDirection(changeOrder(valueDirection));
    handleSort(orderBasis, valueDirection);
  };

  const handleSort = (orderBasis, order) => {
    setOrderBasis(orderBasis);
    setOrder(order);
  };

  const changeOrder = (prevOrder) => {
    if (prevOrder === 'asc') {
      return 'desc';
    }

    return 'asc';
  };

  return (
    <Card {...props}
      sx={{background:'rgba(255, 255, 255, 0.1)',
        borderColor: '#54576a',
        borderWidth: 1,
        borderStyle: 'solid'
      }}
    >
      <CardHeader
        avatar={<ChartBarIcon sx={{color:"white"}}/>}
        title={<Typography variant="h6" color="white">Farm Balance</Typography>}
      />
      {
        props.farmLoading ?
          <Skeleton variant="rectangular" width={"100%"} height={100}/>
          :
          <Table>
            <TableHead
              sx={{background:'rgba(255, 255, 255, 0.1)',
                borderColor: '#54576a',
                borderWidth: 1,
                borderStyle: 'solid',
                mt: 4
              }}
            >
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={symbolDirection}
                    onClick={() => handleSortBySymbol('symbol')}
                  >
                    <Box ml={2} color={"white"}>
                      Protocol
                    </Box>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={balanceDirection}
                    onClick={() => handleSortByBalance('balance')}
                  >
                    <Box color={"white"}>
                      Pair
                    </Box>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={priceDirection}
                    onClick={() => handleSortByPrice('price')}
                  >
                    <Box color={"white"}>
                      Balance
                    </Box>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={valueDirection}
                    onClick={() => handleSortByValue('value')}
                  >
                    <Box color={"white"}>
                      Value
                    </Box>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farmTokenList && sortTokenList([...farmTokenList], order, orderBasis).filter(token => token.value > 0).map((token, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td': {
                      border: 0
                    }
                  }}
                >
                  <TableCell width="25%">
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                      ml={2}
                    >
                      <a href={token.url} rel="noreferrer" target='_blank'>
                        <img
                          style={{display: 'inline-block', verticalAlign: 'middle'}}
                          width={24}
                          height={24}
                          alt={token.pair}
                          src={token.image}
                        />
                      </a>
                      <Typography
                        sx={{ml: 2}}
                        variant="subtitle2"
                        color={"white"}
                      >{token.protocol}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="subtitle2" color={"white"}>
                      {token.pair}
                    </Typography>
                  </TableCell>
                  <TableCell width="20%">
                    <Typography variant="subtitle2" color={"white"}>
                      {asNumFormat(token.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell width="30%">
                    <Typography variant="subtitle2" color={"white"}>
                      {asDollarFormat(token.value)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      }
    </Card>
  );
};
