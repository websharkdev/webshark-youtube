import { Home as HomeIcon, LocalFireDepartment as LocalFireDepartmentIcon } from '@mui/icons-material'
import { Box, Grid, IconButton, Link, Switch, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useContext } from 'react'

import { ColorModeContext } from '@/providers/customThemeProvider/CustomThemeProvider'

import { layoutContext } from '../Layout'
import { Search } from '../search'

import { data } from './data'

type Props = {}

const Root = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'nowrap',
  padding: theme.spacing(2.5),
  position: 'relative',
  background: theme.palette.background.default,
  zIndex: 30,
  [theme.breakpoints.up('md')]: {
    borderRadius: theme.shape.borderRadius,
  },
  '& .header-wrapper--actions': {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    width: '100%',
    height: '100%',
    minHeight: 48,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'space-between',
    },
  },
  '& .header-form--button': {
    minWidth: 48,
    minHeight: 48,
    color: theme.palette.text.secondary,
    background: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    width: 'max-content',
    height: 'max-content',
    '&.header-form--buttonCurrent': {
      background: '#FDE8E5',
      color: '#DE0203',
    },
  },
  '& .header-menu--item': {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      color: theme.palette.text.secondary,
      background: theme.palette.secondary.main,
      borderRadius: theme.shape.borderRadius,
      width: 48,
      height: 48,
      '& svg path:last-child': {
        stroke: theme.palette.secondary.dark,
      },
    },
  },
}))

export const Header: FC<Props> = () => {
  const url = useRouter()
  const colorMode = useContext(ColorModeContext)
  const homeContext = useContext(layoutContext)

  const tablet = useMediaQuery((theme) =>
    // @ts-ignore
    theme.breakpoints.down('md')
  )

  return (
    <Root container columnGap={2.5}>
      {!tablet && (
        <Grid item xs={6}>
          <Box className="header-wrapper--actions" sx={{ columnGap: 1.5 }}>
            <IconButton
              href="/"
              className={`header-form--button ${url.asPath === '/' && 'header-form--buttonCurrent'}`}
            >
              <HomeIcon />
            </IconButton>
            <IconButton
              href="/trends"
              className={`header-form--button ${url.asPath === '/trends' && 'header-form--buttonCurrent'}`}
            >
              <LocalFireDepartmentIcon />
            </IconButton>
            <Search />
          </Box>
        </Grid>
      )}
      {!tablet && (
        <Grid item flex={1} className="header-menu--listMenu">
          <Grid container columnGap={{ xs: 0, md: 6 }} justifyContent="flex-end" alignItems="center">
            {data.menu.map((item) => (
              <Grid item xs={'auto'} key={item.id} className={`header-menu--item`}>
                <Link href={item.href}>{item.name}</Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
      {tablet && (
        <Grid item xs={6}>
          <Search />
        </Grid>
      )}
      {tablet ? (
        <IconButton className="header-menu--burger header-form--button" onClick={() => homeContext.setBurgerMenu(true)}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2V0H18V2H0Z" fill="currentColor" />
            <path d="M0 8V6H18V8H0Z" fill="currentColor" />
            <path d="M0 14V12H18V14H0Z" fill="currentColor" />
          </svg>
        </IconButton>
      ) : (
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
      )}
    </Root>
  )
}
