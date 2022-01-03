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

const sortTokenList = (tokens, order, orderBasis) => tokens
  .sort((a, b) => {
    if (order === 'asc') {
      return a[orderBasis] < b[orderBasis] ? -1 : 1;
    }

    return a[orderBasis] > b[orderBasis] ? -1 : 1;
  });

export const AccountTokenList = (props) => {
  const [order, setOrder] = useState('desc');
  const [orderBasis, setOrderBasis] = useState('balance');

  const [symbolDirection, setSymbolDirection] = useState('desc');
  const [decimalDirection, setDecimalDirection] = useState('desc');
  const [balanceDirection, setBalanceDirection] = useState('desc');
  const [priceDirection, setPriceDirection] = useState('desc');
  const [valueDirection, setValueDirection] = useState('desc');

  const fungibleTokenList = props.fungibleTokenList;

  const handleSortBySymbol = (orderBasis) => {
    setSymbolDirection(changeOrder);
    handleSort(orderBasis);
  };

  const handleSortByDecimal = (orderBasis) => {
    setDecimalDirection(changeOrder);
    handleSort(orderBasis);
  };

  const handleSortByBalance = (orderBasis) => {
    setBalanceDirection(changeOrder);
    handleSort(orderBasis);
  };

  const handleSortByPrice = (orderBasis) => {
    setPriceDirection(changeOrder);
    handleSort(orderBasis);
  };

  const handleSortByValue = (orderBasis) => {
    setValueDirection(changeOrder);
    handleSort(orderBasis);
  };

  const handleSort = (orderBasis) => {
    setOrderBasis(orderBasis);
    setOrder(changeOrder);
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
              <TableSortLabel
                  active
                  direction={symbolDirection}
                  onClick={() => handleSortBySymbol('symbol')}
              >
                Symbol
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                  active
                  direction={decimalDirection}
                  onClick={() => handleSortByDecimal('decimal')}
              >
                decimal
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
          {fungibleTokenList && sortTokenList([...fungibleTokenList], order, orderBasis).map((token) => (
            <TableRow
              key={token.symbol}
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
                  <Typography
                    sx={{ ml: 1 }}
                    variant="subtitle2"
                  >
                    {token.symbol}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {token.decimal}
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
