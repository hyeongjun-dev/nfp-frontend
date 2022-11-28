import * as React from 'react';
import {alpha, styled, useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Box, Stack, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{

        }}
        {...props}
    />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 218,
    background: "#384169",//theme.palette.primary.main,
    color: "white",
    // color: 'rgba(255, 255, 255, 0.04)',
        // theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function SelectChainMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const chainImgMap = {
    "Aptos": "/static/icons/aptos_icon.svg",
    "Stacks": "/static/icons/stx_icon.svg"
  }

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const redirectPage = (event) => {
    setAnchorEl(null);
    const chainName = String(event.target.innerText).trim().toLowerCase();
    window.location.href = `/projects/${chainName}`;
  };

  let chainName = 'Stacks';
  if (String(window.location.pathname).trim().toUpperCase().indexOf('APTOS') !== -1) {
    chainName = 'Aptos';
  }

  return (
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            size="small"
            sx={{
              background: "transparent",
              '&:hover': {
                backgroundColor: 'rgba(255,255,255, 0.08)'
              },
            }}
        >
          <Stack direction={"row"} justifyContent={"flex-start"} sx={{flex:1}}>
            <img
              alt="Aptos"
              src={chainImgMap[chainName]}
              width={20}
              height={20}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "white",
                borderStyle: "solid"
              }}
            />
            <Typography variant={"subtitle2"} sx={{marginLeft:1}}>{ chainName }</Typography>
          </Stack>
        </Button>
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
          {["Stacks", "Aptos"].map(e => {
            return (<MenuItem key={e} onClick={redirectPage}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255, 0.08)'
                },
              }}
            >
              <Stack direction={"row"} justifyContent={"space-between"} sx={{flex:1}}>
                <Stack direction={"row"} justifyContent={"flex-start"} >
                  <img
                    alt={e}
                    src={chainImgMap[e]}
                    width={20}
                    height={20}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: "white",
                      borderStyle: "solid"
                    }}
                  />
                  <Typography variant={"subtitle2"} sx={{marginLeft:1}}>{e}</Typography>
                </Stack>
                {e === chainName ? (<CheckIcon style={{fill: "white"}}/>) : <div/>}
              </Stack>
            </MenuItem>)
          })}
        </StyledMenu>
      </Box>
  );
}
