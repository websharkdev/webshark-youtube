import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material'
import { Box, Button, Divider, Grid, IconButton, Link, SxProps, Typography, styled, useMediaQuery } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { FC, useContext, useEffect, useState } from 'react'

import { handleSubscriptions } from '@/shared/api/subscriptions.home.api'

import { LogoIcon, LogoLightIcon } from '@/assets/icons/logos'

import { ColorModeContext } from '@/providers/customThemeProvider/CustomThemeProvider'

import { layoutContext } from '../Layout'
import { Search } from '../search'

import { SidebarSubscription } from './SidebarSubscription'
import { defaultChannels } from './data'

type Props = {
  style?: SxProps
}

const Root = styled(Grid)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
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
    '&.sidebar-subscriptions--wrapperScrollable': {
      overflowY: 'scroll',
      maxHeight: '40vh',
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

      <Grid item className="sidebar-content--wrapper">
        {tablet && <Search />}
        <Box width="100%" mt={1.5} rowGap={2.5} sx={{ display: 'flex', flexDirection: 'column', mb: 2.5 }}>
          {defaultChannels.map((channel: any) => (
            <Box
              className="sidebar-subscriptions--wrapper"
              key={channel.id}
              onClick={() => {
                url.asPath !== '/'
                  ? url.push('/').then(() => {
                      window.localStorage.setItem('youtube_clone-subscription', channel.title)
                      homeContext.setCategory(channel.title)
                    })
                  : homeContext.setCategory(channel.title)

                window.localStorage.setItem('youtube_clone-subscription', channel.title)
              }}
              sx={{ cursor: 'pointer' }}
            >
              {channel.title && <SidebarSubscription data={channel} icon={channel.icon} />}
            </Box>
          ))}
        </Box>
        <Box width="100%">
          <Divider />
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
