import { PlaylistPlayRounded as PlaylistPlayRoundedIcon } from '@mui/icons-material'
import { Box, Chip, Divider, Grid, Link, SxProps, Tooltip, Typography, styled } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'

import { handlePlaylists } from '@/shared/api/home.api'

type Props = {
  data: any
  type: 'video' | 'playlist'
  style?: SxProps
}

const Root = styled(Grid)(({ theme }) => ({
  background: '#fff',
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  minHeight: 445,
  height: 'max-content',
  overflow: 'hidden',
  '& .feed-item--playlistWrapper': {
    position: 'absolute',
    right: 0,
    top: 0,
    background: 'linear-gradient(270deg, #4F4F4F 62.61%, rgba(79, 79, 79, 0) 160%)',
    width: '25%',
    height: '100%',
    display: 'flex',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  '& .feed-item--image': {
    aspectRatio: '16/9',
    width: '100%',
    background: '#ccc',
    borderRadius: theme.shape.borderRadius,
    objectFit: 'cover',
  },
}))

export const HomeFeedItem: FC<Props> = ({ data, type, style }) => {
  const [playlistData, setPlaylistData] = useState([])

  useEffect(() => {
    type === 'playlist' && handlePlaylists(data.id.playlistId).then((res) => setPlaylistData(res.items))
  }, [])

  return (
    <Root container direction={'column'} wrap="nowrap" rowSpacing={2} sx={style}>
      <Grid
        item
        xs={12}
        sx={{
          pt: '0 !important',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '14px',
        }}
      >
        <img src={data.snippet.thumbnails.high.url} alt="video-image" className="feed-item--image" />
        {type === 'playlist' && (
          <Box className="feed-item--playlistWrapper" rowGap={1.5}>
            <PlaylistPlayRoundedIcon />
            <Typography variant="body2">{playlistData.length}</Typography>
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: 1.5,
            '&:hover': {
              color: 'text.primary',
            },
          }}
          component={Link}
          className="unstyled"
          href={`/video/${data.id.videoId ? data.id.videoId : data.id}`}
        >
          <Tooltip title={data.snippet.title}>
            <Typography
              variant="h6"
              width="100%"
              className="feed-item--title"
              dangerouslySetInnerHTML={{ __html: data.snippet.title }}
            />
          </Tooltip>
          <Divider />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={data.snippet.channelTitle}>
              <Typography variant="body2" width="100%" className="feed-item--channelTitle">
                {data.snippet.channelTitle}
              </Typography>
            </Tooltip>
            {data.snippet.liveBroadcastContent.toLowerCase() === 'live' && (
              <Chip label={`${data.snippet.liveBroadcastContent} Now`} className="feed-item--live" />
            )}
          </Box>
        </Box>
      </Grid>
      {type === 'playlist' && (
        <Grid item xs={12}>
          {playlistData.map((item: any) => <Typography variant="body2">• {item.snippet.title}</Typography>).slice(0, 2)}
        </Grid>
      )}
      {type === 'video' && (
        <Grid item xs={12}>
          <Typography variant="body2" width="100%" className="feed-item--description">
            {data.snippet.description}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="body2" width="100%" className="feed-item--publishedAt">
          {moment(data.snippet.publishedAt).fromNow()}
        </Typography>
      </Grid>
    </Root>
  )
}
