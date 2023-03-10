import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material'
import { Box, Button, Divider, Grid, Typography, styled } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/dist/client/router'
import Image from 'next/image'
import { FC, useContext, useEffect, useState } from 'react'

import { handleSubscriptions } from '@/shared/api/subscriptions.home.api'

import { LogoIcon, LogoLightIcon } from '@/assets/icons/logos'

import { ColorModeContext } from '@/providers/customThemeProvider/CustomThemeProvider'

import { layoutContext } from '../Layout'

import { SidebarSubscription } from './SidebarSubscription'
import { defaultChannels } from './data'

type Props = {}

const Root = styled(Grid)(({ theme }) => ({
  background: '#fff',
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
  },
  '& .sidebar-subscriptions--wrapper': {
    display: 'flex',
    flexDirection: 'column',
    '&.sidebar-subscriptions--wrapperScrollable': {
      overflowY: 'scroll',
      maxHeight: '25vh',
    },
  },
}))

export const Sidebar: FC<Props> = (props) => {
  const url = useRouter()

  const colorMode = useContext(ColorModeContext)
  const categoryContext = useContext(layoutContext)
  const [data, setData] = useState([])
  const [hidden, setHidden] = useState<boolean>(true)
  useEffect(() => {
    handleSubscriptions(200).then((res: any) => setData(res.items))
  }, [])

  return (
    <Root container wrap="nowrap" direction="column" rowSpacing={2.5}>
      <Grid item className="sidebar-logo--wrapper">
        {colorMode.mode === 'light' ? (
          <Image src={LogoLightIcon} alt="logo image" className="header-menu--logo" width="120px" />
        ) : (
          <Image src={LogoIcon} alt="logo image" className="header-menu--logo" width="120px" />
        )}
      </Grid>

      <Grid item children={<Divider />} />

      <Grid item className="sidebar-content--wrapper">
        <Box width="100%">
          <Typography variant="subtitle1">More from YouTube</Typography>
          {defaultChannels.map((channel: any) => (
            <Box
              className="sidebar-subscriptions--wrapper"
              rowGap={2}
              my={2.5}
              key={channel.id}
              onClick={() => {
                url.asPath !== '/'
                  ? url.push('/').then(() => {
                      window.localStorage.setItem('youtube_clone-subscription', channel.title)
                      categoryContext.setCategory(channel.title)
                    })
                  : categoryContext.setCategory(channel.title)

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
            rowGap={2}
            my={2.5}
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
                          categoryContext.setCategory(channel.snippet.title)
                        })
                      : categoryContext.setCategory(channel.snippet.title)

                    window.localStorage.setItem('youtube_clone-subscription', channel.snippet.title)
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  {channel.snippet && <SidebarSubscription data={channel.snippet} />}
                </Box>
              ))
              .slice(0, hidden ? 5 : data.length + 1)}
          </Box>
          <Button onClick={() => setHidden(!hidden)}>
            {hidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            <Typography>{hidden ? `Show ${data.length - 5} more` : `Hide ${data.length - 10}`}</Typography>
          </Button>
        </Box>
      </Grid>

      <Grid item children={<Divider />} />

      <Grid item className="copyright">
        <Typography variant="body2">creted by Bortnytskyi Oleksii in @{moment().format('YYYY')} with ❤</Typography>
      </Grid>
    </Root>
  )
}
