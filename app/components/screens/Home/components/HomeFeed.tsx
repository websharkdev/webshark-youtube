import { Box, Grid, styled } from '@mui/material'
import { FC, useEffect, useState } from 'react'

import { HomeFeedChannel, HomeFeedItem } from './index'

type Props = {
  data: any
}

const Root = styled(Grid)(({ theme }) => ({}))

export const HomeFeed: FC<Props> = ({ data }) => {
  return (
    <Root container columnSpacing={2.5}>
      {data.map((item: any, index: number) => (
        <Grid
          item
          xs={12}
          sm={6}
          lg={4}
          key={`${item.id.videoId}_${index}`}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'max-content',
            minHeight: 'max-content',
            overflow: 'hidden',
            py: 2.5,
          }}
        >
          {item.id.kind === 'youtube#channel' ? (
            <HomeFeedChannel id={item.id.channelId} />
          ) : (
            <HomeFeedItem data={item} type={item.id.kind ? item.id.kind.slice(8) : item.kind.slice(8)} />
          )}
        </Grid>
      ))}
    </Root>
  )
}
