import {
  Home as HomeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
} from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, Link, SxProps, Typography, styled, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useContext, useEffect, useState } from 'react'

import { handleSubscriptions } from '@/shared/api/subscriptions.home.api'

import { LogoIcon, LogoLightIcon } from '@/assets/icons/logos'

import { ColorModeContext } from '@/providers/customThemeProvider/CustomThemeProvider'

import { layoutContext } from '../Layout'
import { Search } from '../search'

import { SidebarSubscription } from './SidebarSubscription'

type Props = {
  style?: SxProps
}

const Root = styled(Grid)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  maxHeight: `calc(100vh - ${theme.spacing(2.5 * 2)})`,
  minHeight: `calc(100vh - ${theme.spacing(2.5 * 2)})`,
  position: 'sticky',
  height: 'max-content',
  top: 22,
  left: 0,
  '& .sidebar-logo--wrapper': {
    minHeight: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .sidebar-subscriptions--wrapper': {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2.5),
    [theme.breakpoints.down(1540)]: {
      rowGap: theme.spacing(1.5),
    },
    '&.sidebar-subscriptions--wrapperScrollable': {
      overflowY: 'scroll',
      maxHeight: '40vh',
      [theme.breakpoints.down(1540)]: {
        maxHeight: '30vh',
      },
    },
  },
  '& .sidebar-subscriptions--button': {
    background: theme.palette.secondary.main,
    '& *': {
      color: theme.palette.text.secondary,
    },
    '&:hover': {
      '& *': {
        color: theme.palette.text.primary,
      },
    },
  },
  '& .sidebar-burger--button': {
    minWidth: 48,
    minHeight: 48,
    color: theme.palette.text.secondary,
    background: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    width: 'max-content',
    height: 'max-content',
    '&.sidebar-burger--buttonCurrent': {
      background: '#FDE8E5',
      color: '#DE0203',
    },
  },
}))

export const Sidebar: FC<Props> = ({ style }) => {
  const url = useRouter()

  const colorMode = useContext(ColorModeContext)
  const homeContext = useContext(layoutContext)
  const [data, setData] = useState([])
  const [hidden, setHidden] = useState<boolean>(true)
  useEffect(() => {
    handleSubscriptions(200).then((res: any) => {
      const results = res.items.filter((item: any) => item.snippet.title !== 'ТОПЛЕС')

      setData(results)
    })
  }, [])

  const tablet = useMediaQuery((theme) =>
    // @ts-ignore
    theme.breakpoints.down('md')
  )

  return (
    <Root container wrap="nowrap" direction="column" rowSpacing={2.5} sx={style}>
      <Grid item className="sidebar-logo--wrapper">
        <Link href="/" className="unstyled">
          {colorMode.mode === 'light' ? (
            <Image src={LogoLightIcon} alt="logo image" className="header-menu--logo" width="120px" />
          ) : (
            <Image src={LogoIcon} alt="logo image" className="header-menu--logo" width="120px" />
          )}
        </Link>
        {tablet && (
          <IconButton className="sidebar-burger--button" onClick={() => homeContext.setBurgerMenu(false)}>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 8V6H18V8H0Z" fill="currentColor" />
            </svg>
          </IconButton>
        )}
      </Grid>

      <Grid item children={<Divider />} />

      <Grid item>
        <Link href="/" sx={{ display: 'flex', alignItems: 'center' }} className="unstyled">
          <IconButton className={`sidebar-burger--button ${url.asPath === '/' && 'sidebar-burger--buttonCurrent'}`}>
            <HomeIcon />
          </IconButton>
          <Typography variant="body2" ml={2.5}>
            Home
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link href="/trends" sx={{ display: 'flex', alignItems: 'center' }} className="unstyled">
          <IconButton
            className={`sidebar-burger--button ${url.asPath === '/trends' && 'sidebar-burger--buttonCurrent'}`}
          >
            <LocalFireDepartmentIcon />
          </IconButton>
          <Typography variant="body2" ml={2.5}>
            Trends
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link
          href="https://www.buymeacoffee.com/webshark"
          sx={{ display: 'flex', alignItems: 'center' }}
          className="unstyled"
        >
          <IconButton
            className={`sidebar-burger--button ${url.asPath === '/trends' && 'sidebar-burger--buttonCurrent'}`}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.1785 25.4286C18.6902 24.4053 19.4152 16.7508 20.2089 15.3978C20.2706 15.2927 20.3255 15.163 20.2237 15.096C19.589 14.6779 16.0457 15.0023 14.9616 15.8523C14.2172 16.4361 12.8949 16.3667 11.9504 16.1855C11.6218 16.1225 11.3046 16.3917 11.3459 16.7238C11.697 19.5428 12.2236 24.2989 12.6168 25.0625C13.3571 26.5 17.6428 26.5 18.1785 25.4286Z"
                fill="#FFDD00"
              />
              <path
                d="M19.1325 6.62993C17.2116 7.17876 12.5739 7.83736 9.39069 6.08109C5.41164 3.88575 20.463 3.27687 20.779 4.98342C21.4651 8.68806 20.779 4.98342 21.4651 8.68806M21.4651 8.68806C19.2271 9.12765 14.3004 9.78375 10.5293 9.35655C9.53398 9.24379 8.32342 9.37151 8.05708 10.3372C7.93326 10.7861 7.99084 11.3068 8.43023 11.8439C9.66511 13.3532 22.5627 12.5299 22.8371 11.8439M21.4651 8.68806C23.2488 8.68806 23.1116 11.1578 22.8371 11.8439M22.8371 11.8439C22.8371 11.8439 20.6829 13.6267 19.8085 24.343C19.7179 25.4535 19.1423 26.5071 18.0889 26.87C16.8746 27.2883 15.229 27.5676 13.421 27.2482C12.165 27.0264 11.3535 25.8822 11.1987 24.6162L9.93953 14.3136"
                stroke="currentColor"
                strokeWidth="1.07143"
                strokeLinecap="round"
              />
            </svg>
          </IconButton>
          <Typography variant="body2" ml={2.5}>
            Trends
          </Typography>
        </Link>
      </Grid>
      <Grid item className="sidebar-content--wrapper">
        {tablet && <Search />}
        <Box width="100%">
          <Typography variant="subtitle1" my={2.5}>
            Subscriptions
          </Typography>
          <Box
            rowGap={2.5}
            className={`sidebar-subscriptions--wrapper sidebar-subscriptions--wrapper${
              hidden ? 'Default' : 'Scrollable'
            }`}
          >
            {data
              .map((channel: any) => (
                <Box
                  key={channel.etag}
                  onClick={() => {
                    url.asPath !== '/'
                      ? url.push('/').then(() => {
                          window.localStorage.setItem('youtube_clone-subscription', channel.snippet.title)
                          homeContext.setCategory(channel.snippet.title)
                        })
                      : homeContext.setCategory(channel.snippet.title)

                    window.localStorage.setItem('youtube_clone-subscription', channel.snippet.title)
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  {channel.snippet && <SidebarSubscription data={channel.snippet} />}
                </Box>
              ))
              .slice(0, hidden ? 5 : data.length + 1)}
          </Box>
          <Button
            sx={{ mt: 2.5 }}
            onClick={() => setHidden(!hidden)}
            fullWidth
            variant="contained"
            className="sidebar-subscriptions--button"
          >
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'nowrap', width: '100%', alignItems: 'center' }}>
              {hidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
              <Typography variant="body2">
                {hidden ? `Show ${data.length - 5} more` : `Hide ${data.length - 10}`}
              </Typography>
            </Box>
          </Button>
        </Box>
      </Grid>
    </Root>
  )
}
