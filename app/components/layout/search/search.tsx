import { Search as SearchIcon } from '@mui/icons-material'
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, SyntheticEvent, useContext, useEffect, useState } from 'react'

import { layoutContext } from '../Layout'

type Props = {}

const Root = styled(FormControl)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'none',
  width: '100%',
  height: '100%',
  maxHeight: 48,
  '& .header-form--field': {
    minHeight: 48,
    width: '100%',
    color: theme.palette.text.secondary,
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
    background: theme.palette.secondary.main,
    border: 'none',
    outline: 'none',
    borderRadius: theme.shape.borderRadius,
    '&:placeholder': {
      color: '#ccc',
    },
  },
  '& .MuiInputBase-root::before, .MuiInputBase-root::after': {
    display: 'none',
  },
}))

export const Search: FC<Props> = (props) => {
  const homeContext = useContext(layoutContext)
  const url = useRouter()

  const tablet = useMediaQuery((theme) =>
    // @ts-ignore
    theme.breakpoints.down('md')
  )
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    url.asPath !== '/'
      ? url.push('/').then(() => {
          window.localStorage.setItem('youtube_clone', homeContext.search)
          homeContext.setCategory(homeContext.search)
        })
      : homeContext.search !== ''
      ? homeContext.setCategory(homeContext.search)
      : null

    window.localStorage.setItem('youtube_clone', homeContext.search)
    tablet && homeContext.setBurgerMenu(false)
    homeContext.setSearch('')
  }

  return (
    <Root sx={{ columnGap: 1.5 }} className="header-form--search" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={homeContext.search}
        className="header-form--field"
        onChange={(e) => homeContext.setSearch(e.target.value)}
        placeholder="Search..."
        id="searchbar"
        endAdornment={
          <InputAdornment position="end">
            <IconButton type="submit" onClick={handleSubmit}>
              <SearchIcon sx={{ color: 'text.secondary', cursor: 'pointer' }} />
            </IconButton>
          </InputAdornment>
        }
      />
    </Root>
  )
}
