import { Box, Grid, Typography, styled } from '@mui/material'
import { FC, useEffect, useState } from 'react'

import { ChannelThumbIcon } from '@/assets/icons/ui'

type Props = {
  data: any
  icon?: React.ReactNode
}

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  maxHeight: 48,
  minHeight: 32,
  '& .sidebar-subscriptionItem--image': {
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 14,
    background: '#f5f5f5',
    overflow: 'hidden',
    '& *': {
      aspectRatio: '1/1',
      width: '100%',
      maxWidth: 32,
      maxHeight: 32,
    },
  },
}))

export const SidebarSubscription: FC<Props> = ({ data, icon }) => {
  return (
    <Root columnGap={2.5}>
      <Box className="sidebar-subscriptionItem--image">
        {icon ? (
          icon
        ) : (
          <img src={data.thumbnails.default.url || data.thumbnails.high.url} alt="youtube channel image" />
        )}
      </Box>
      <Typography variant="subtitle2" component="div">
        {data.title}
      </Typography>
    </Root>
  )
}
