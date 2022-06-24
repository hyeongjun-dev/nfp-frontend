import {useState} from "react";
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
    Typography
} from "@mui/material";
import {Skeleton} from "@mui/lab";
import {asDollarFormat, asNumFormat} from "../../../utils/number";
import {Cog as CogIcon} from "../../../icons/cog";

const sortVaultList = (vaults, order, orderBasis) => vaults
    .sort((a, b) => {
        if (order === 'asc') {
            return a[orderBasis] < b[orderBasis] ? -1 : 1;
        }

        return a[orderBasis] > b[orderBasis] ? -1 : 1;
    });

export const AccountVaultTokenList = (props) => {
    const [order, setOrder] = useState('desc');
    const [orderBasis, setOrderBasis] = useState('balance');

    const [protocolDirection, setProtocolDirection] = useState('desc');
    const [typeDirection, setTypeDirection] = useState('desc');
    const [tokenDirection, setTokenDirection] = useState('desc');
    const [amountDirection, setAmountDirection] = useState('desc');
    const [valueDirection, setValueDirection] = useState('desc');

    const vaultList = props.vaultList;

    const handleSortByProtocol = (orderBasis) => {
        setProtocolDirection(changeOrder(protocolDirection));
        handleSort(orderBasis, protocolDirection);
    };

    const handleSortByType = (orderBasis) => {
        setTypeDirection(changeOrder(typeDirection));
        handleSort(orderBasis, typeDirection);
    };

    const handleSortByToken = (orderBasis) => {
        setTokenDirection(changeOrder(tokenDirection));
        handleSort(orderBasis, tokenDirection);
    };

    const handleSortByAmount = (orderBasis) => {
        setAmountDirection(changeOrder(amountDirection));
        handleSort(orderBasis, amountDirection);
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
                avatar={<CogIcon/>}
                title="Vaults"
                // action={(
                //     <Tooltip title="Vault is not added to the total value.">
                //         <InformationCircleOutlinedIcon sx={{color: 'action.active'}}/>
                //     </Tooltip>
                // )}
            />
            {
                props.vaultLoading ?
                    <Skeleton variant="rectangular" width={"100%"} height={100}/>
                    :
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active
                                        direction={protocolDirection}
                                        onClick={() => handleSortByProtocol('protocol')}
                                    >
                                        <Box ml={2}>
                                            Protocol
                                        </Box>
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active
                                        direction={typeDirection}
                                        onClick={() => handleSortByType('type')}
                                    >
                                        Type
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active
                                        direction={tokenDirection}
                                        onClick={() => handleSortByToken('token')}
                                    >
                                        Token
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active
                                        direction={amountDirection}
                                        onClick={() => handleSortByAmount('amount')}
                                    >
                                        Amount
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
                            {vaultList && sortVaultList([...vaultList], order, orderBasis).map((vault, index) => (
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
                                            <a href={vault.url} target='_blank'>
                                                <img
                                                    style={{display: 'inline-block', verticalAlign: 'middle'}}
                                                    width={24}
                                                    height={24}
                                                    alt={vault.protocol}
                                                    src={vault.image}
                                                />
                                            </a>
                                            <Typography
                                                sx={{ml: 2}}
                                                variant="subtitle2"
                                            >{vault.protocol}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell width="25%">
                                        <Typography variant="subtitle2">
                                            {vault.type}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width="20%">
                                        <Typography variant="subtitle2">
                                            {vault.token}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width="15%">
                                        <Typography variant="subtitle2">
                                            {asNumFormat(vault.amount)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width="15%">
                                        <Typography variant="subtitle2">
                                            {asDollarFormat(vault.value)}
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