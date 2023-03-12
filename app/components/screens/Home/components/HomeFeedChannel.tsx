import { Box, Chip, Divider, Grid, Tooltip, Typography, styled } from '@mui/material'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'

import { handleChannels } from '@/shared/api/home.api'
import { useNumbers } from '@/shared/hooks'

type Props = {
  id: string
}
const Root = styled(Grid)(({ theme }) => ({
  background: theme.palette.background.default,
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  minHeight: 400,
  height: 'max-content',
  overflow: 'hidden',
  '& .feed-item--imageWrapper': {
    position: 'relative',
    '& .feed-item--image': {
      aspectRatio: '1/1',
      width: '100%',
      maxWidth: 64,
      maxHeight: 64,
      background: '#ccc',
      borderRadius: theme.shape.borderRadius,
      objectFit: 'cover',
      position: 'absolute',
      left: 8,
      bottom: -8,
      zIndex: 3,
    },
    '& .feed-item--imageBackgroundWrapper': {
      position: 'relative',
      height: '100%',
      '& .feed-item--imageBG': {
        aspectRatio: '16/9',
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        objectFit: 'cover',
      },
      '&::before': {
        content: "''",
        backdropFilter: 'blur(32px)',
        background: 'rgba(193, 226, 125, .01)',
        borderRadius: theme.shape.borderRadius,
        transform: 'translateX(-50%)',
        position: 'absolute',
        left: '50%',
        top: 0,
        height: 'calc(100% - 7px)',
        zIndex: 2,
        width: '100%',
      },
    },
  },
  '& .feed-item--title': {
    color: theme.palette.secondary.dark,
  },
  '& .feed-item--description': {
    color: theme.palette.secondary.dark,
  },
}))

const StatisticsItem = ({ name, count }: any) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 0.2, color: 'text.secondary' }}>
    <Typography variant="body2" width="100%" className="feed-item--statistic_title">
      {name}
    </Typography>
    <Typography variant="h6" width="100%" className="feed-item--statistic_intent">
      {useNumbers(count)}
    </Typography>
  </Box>
)

export const HomeFeedChannel: FC<Props> = ({ id }) => {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    handleChannels(id).then((res) => setData(res))
  }, [id])

  if (data.length === 0) return <Typography>Loading...</Typography>

  return (
    <>
      {data && (
        <Root container direction={'column'} wrap="nowrap" rowSpacing={2}>
          <Grid item xs={12} sx={{ pt: '0 !important' }}>
            <Box className="feed-item--imageWrapper">
              <Box className="feed-item--imageBackgroundWrapper">
                <img src={data.snippet?.thumbnails?.default?.url} alt="video-image" className="feed-item--imageBG" />
              </Box>
              <img src={data.snippet?.thumbnails?.default?.url} alt="video-image" className="feed-item--image" />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container rowGap={1.5}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  width="100%"
                  className="feed-item--title"
                  dangerouslySetInnerHTML={{ __html: data.snippet?.title }}
                />
              </Grid>
              <Grid item xs={12} children={<Divider />} />
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  width="100%"
                  className="feed-item--description"
                  dangerouslySetInnerHTML={{ __html: data.snippet?.description }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container columnGap={1.5} wrap="nowrap">
              <Grid item xs={4}>
                <StatisticsItem name="Subscribers" count={data?.statistics?.subscriberCount} />
              </Grid>
              <Grid item xs={4}>
                <StatisticsItem name="Video's" count={data?.statistics?.videoCount} />
              </Grid>
              <Grid item xs={4}>
                <StatisticsItem name="View's" count={data?.statistics?.viewCount} />
              </Grid>
            </Grid>
          </Grid>
        </Root>
      )}
    </>
  )
}
