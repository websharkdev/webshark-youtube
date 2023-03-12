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
  '& .header-form--button': {
    minWidth: 48,
    minHeight: 48,
    color: theme.palette.text.secondary,
    background: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    width: 'max-content',
    height: 'max-content',
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
      <Grid item xs={5} lg={4}>
        <Search />
      </Grid>
      {tablet ? (
        <Grid item>
          {' '}
          <IconButton
            className="header-menu--burger header-form--button"
            onClick={() => homeContext.setBurgerMenu(true)}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 2V0H18V2H0Z" fill="currentColor" />
              <path d="M0 8V6H18V8H0Z" fill="currentColor" />
              <path d="M0 14V12H18V14H0Z" fill="currentColor" />
            </svg>
          </IconButton>
        </Grid>
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
