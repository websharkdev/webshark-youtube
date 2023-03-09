import {
  Home as HomeIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
  Search as SearchIcon,
} from '@mui/icons-material'
import { Box, FormControl, Grid, IconButton, Link, Paper, Switch, TextField, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, SyntheticEvent, useContext, useState } from 'react'

import { ColorModeContext } from '@/providers/customThemeProvider/CustomThemeProvider'

import { layoutContext } from '../Layout'

import { data } from './data'

type Props = {}

const Root = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'nowrap',
  padding: theme.spacing(2.5),
  position: 'relative',
  background: '#fff',
  borderRadius: theme.shape.borderRadius,
  zIndex: 30,
  '& .header-wrapper--actions': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    width: '100%',
    height: '100%',
    minHeight: 48,

    '& .header-form--button': {
      minWidth: 48,
      minHeight: 48,
      background: '#f3f3f3',
      borderRadius: theme.shape.borderRadius,
      width: 'max-content',
      height: 'max-content',
      '&.header-form--buttonCurrent': {
        background: '#FDE8E5',
        color: '#DE0203',
      },
    },
    '& .header-form--search': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'none',
      width: '100%',
      height: '100%',
      minHeight: 48,
      '& .header-form--field': {
        minHeight: 48,
        width: '100%',
        color: '#111',
        padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
        background: '#f3f3f3',
        border: 'none',
        outline: 'none',
        borderRadius: theme.shape.borderRadius,
        '&:placeholder': {
          color: '#ccc',
        },
      },
    },
  },
}))

export const Header: FC<Props> = () => {
  const url = useRouter()
  const colorMode = useContext(ColorModeContext)
  const categoryContext = useContext(layoutContext)
  const [searchRequest, setSearchRequest] = useState<string>('')
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    url.asPath !== '/'
      ? url.push('/').then(() => {
          window.localStorage.setItem('youtube_clone', searchRequest)
          categoryContext.setCategory(searchRequest)
        })
      : searchRequest !== ''
      ? categoryContext.setCategory(searchRequest)
      : null

    window.localStorage.setItem('youtube_clone', searchRequest)
    setSearchRequest('')
  }

  return (
    <Root container columnGap={2.5}>
      <Grid item xs={5}>
        <Box className="header-wrapper--actions" sx={{ columnGap: 1.5 }}>
          <IconButton href="/" className={`header-form--button ${url.asPath === '/' && 'header-form--buttonCurrent'}`}>
            <HomeIcon />
          </IconButton>
          <IconButton
            href="/trends"
            className={`header-form--button ${url.asPath === '/trends' && 'header-form--buttonCurrent'}`}
          >
            <LocalFireDepartmentIcon />
          </IconButton>
          <Box component={'form'} sx={{ columnGap: 1.5 }} className="header-form--search" onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchRequest}
              className="header-form--field"
              onChange={(e) => setSearchRequest(e.target.value)}
              placeholder="Search..."
              id="searchbar"
            />
            <IconButton type="submit" className="header-form--button">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Grid item flex={1} className="header-menu--listMenu">
        <Grid container columnSpacing={6} justifyContent="flex-end" alignItems="center">
          {data.menu.map((item) => (
            <Grid item xs={'auto'} key={item.id} className={`header-menu--item`}>
              <Link href={item.href}>{item.name}</Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item>
        <Switch
          aria-label="password-rule-switch"
          checked={colorMode.mode === 'light' ? true : false}
          onChange={() => {
            colorMode.toggleColorMode()
          }}
          color="default"
        />
      </Grid>
    </Root>
  )
}
