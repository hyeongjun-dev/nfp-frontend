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
import {InformationCircleOutlined as InformationCircleOutlinedIcon} from '../../../icons/information-circle-outlined';
import {Skeleton} from "@mui/lab";

const sortTokenList = (tokens, order, orderBasis) => tokens
  .sort((a, b) => {
    if (order === 'asc') {
      return a[orderBasis] < b[orderBasis] ? -1 : 1;
    }

    return a[orderBasis] > b[orderBasis] ? -1 : 1;
  });

export const AccountStakeTokenList = (props) => {
  const [order, setOrder] = useState('desc');
  const [orderBasis, setOrderBasis] = useState('balance');

  const [symbolDirection, setSymbolDirection] = useState('desc');
  const [balanceDirection, setBalanceDirection] = useState('desc');
  const [priceDirection, setPriceDirection] = useState('desc');
  const [valueDirection, setValueDirection] = useState('desc');

  const stakedTokenList = props.stakedTokenList;

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
    <Card {...props}>
      <CardHeader
        title="Stake Balance"
      />
      {
        props.stakedLoading ?
          <Skeleton variant="rectangular" width={"100%"} height={100} />
          :
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={symbolDirection}
                    onClick={() => handleSortBySymbol('symbol')}
                  >
                    <Box ml={2}>
                      Symbol
                    </Box>
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={balanceDirection}
                    onClick={() => handleSortByBalance('balance')}
                  >
                    Balance
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={priceDirection}
                    onClick={() => handleSortByPrice('price')}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={valueDirection}
                    onClick={() => handleSortByValue('value')}
                  >
                    Value
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stakedTokenList && sortTokenList([...stakedTokenList], order, orderBasis).filter(token => token.value > 0).map((token, index) => (
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
                      <a href={token.url} target='_blank'>
                        <img
                          style={{display: 'inline-block', verticalAlign: 'middle'}}
                          width={24}
                          height={24}
                          alt={token.symbol}
                          src={token.image}
                        />
                      </a>
                      <Typography
                        sx={{ml: 2}}
                        variant="subtitle2"
                      >{token.tokenName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell width="25%">
                    <Typography variant="subtitle2">
                      {token.amount}
                    </Typography>
                  </TableCell>
                  <TableCell width="20%">
                    <Typography variant="subtitle2">
                      {(Number(token.price) === 0) ? '-' : token.price}
                    </Typography>
                  </TableCell>
                  <TableCell width="30%">
                    <Typography variant="subtitle2">
                      {(Number(token.value) === 0) ? '-' : token.value}
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
