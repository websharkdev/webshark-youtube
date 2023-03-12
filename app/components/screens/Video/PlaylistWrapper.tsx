import { ThumbUpOutlined as ThumbUpOutlinedIcon, ThumbUpRounded as ThumbUpRoundedIcon } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Typography, styled, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
// Import Swiper styles
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'

import { handlePlaylists, handleQuery, handleVideoDetails } from '@/shared/api/home.api'
import { useNumbers, useWidth } from '@/shared/hooks'
import { VideoDetails } from '@/shared/types/home'

import { HomeFeedItem } from '../Home/components'

import styles from './video.module.sass'

type Props = {}

const Root = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2.5),
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  '& .video-wrapper--iframe': {
    borderRadius: theme.shape.borderRadius,
    aspectRatio: '16/9',
    border: 'none',
  },
  '& .video-wrapper--title': {
    color: theme.palette.text.primary,
  },
  '& .video-wrapper--description': {
    color: theme.palette.text.secondary,
  },
  '& .video-wrapper--statistic_title': {
    color: theme.palette.text.primary,
  },
  '& .video-wrapper--statistic_intent': {
    color: theme.palette.text.secondary,
  },
}))

const StatisticsItem = ({ name, count }: any) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 0.2 }}>
    <Typography variant="body1" width="100%" className="video-wrapper--statistic_title">
      {name}
    </Typography>
    <Typography variant="h6" width="100%" className="video-wrapper--statistic_intent">
      {useNumbers(count)}
    </Typography>
  </Box>
)

export const PlaylistWrapper: FC<Props> = (props) => {
  const currentWidth = useWidth()
  const [data, setData] = useState<VideoDetails>()
  const [related, setRelated] = useState([])
  const [videoID, setVideoID] = useState<string>('')
  const [swiperSettings, setSwiperSettings] = useState(2)
  const tablet = useMediaQuery((theme) =>
    // @ts-ignore
    theme.breakpoints.down('md')
  )
  const url = useRouter()

  useEffect(() => {
    if (url.isReady) {
      // @ts-ignore
      const id = url.query.slug.toLocaleString()
      setVideoID(id)

      handlePlaylists(id).then((res) => {
        setData(res.items[0])
        setRelated(res.items.slice(1))
      })
    }
  }, [videoID, url.isReady])

  useEffect(() => {
    switch (currentWidth) {
      case 'sm':
        setSwiperSettings(1)
        break

      case 'xs':
        setSwiperSettings(1)
        break
      case 'lg':
        setSwiperSettings(3)
        break

      default:
        setSwiperSettings(2)
        break
    }
  }, [currentWidth])

  if (data === undefined)
    return (
      <Root container className={`${styles.Root}`} rowGap={2.5} mt={2.5}>
        <Typography>Loading...</Typography>
      </Root>
    )

  return (
    <Root container className={`${styles.Root}`} rowGap={2.5} mt={2.5}>
      <Grid item xs={12} lg={9}>
        <Grid container rowGap={2.5}>
          <Grid item xs={12}>
            <iframe
              width="100%"
              className="video-wrapper--iframe"
              src={`https://www.youtube.com/embed/${data.contentDetails.videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" className="video-wrapper--title">
              {data.snippet.title}
            </Typography>
          </Grid>
          <Grid item xs={12} children={<Divider />} />

          <Grid item xs={12}>
            <Typography variant="body2" className="video-wrapper--description">
              {data.snippet.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        lg={3}
        className="video-wrapper--scrollable"
        sx={{
          px: { xs: 0, md: 2.5 },
          overflowX: 'scroll',
          maxHeight: '100vw',
          display: 'flex',
        }}
      >
        {tablet ? (
          <Swiper spaceBetween={14} slidesPerView={swiperSettings}>
            {related.map((item: any, index: number) => (
              <SwiperSlide
                key={`${item.id.videoId}_${index}`}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'max-content',
                  minHeight: 'max-content',
                  overflow: 'hidden',
                  borderRadius: '14px',
                  paddingTop: 14,
                }}
              >
                <HomeFeedItem
                  data={item}
                  type={item.id.kind ? item.id.kind.slice(8) : item.kind.slice(8)}
                  videoID={item.contentDetails.videoId}
                  style={{
                    minHeight: 'max-content',
                    // @ts-ignore
                    background: (theme) => theme.palette.background.paper,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Grid container gap={2.5}>
            {related.map((item: any, index: number) => (
              <Grid
                item
                xs={12}
                key={`${item.id.videoId}_${index}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 'max-content',
                  minHeight: 'max-content',
                  overflow: 'hidden',
                  borderRadius: '14px',
                  pt: 1.5,
                }}
              >
                <HomeFeedItem
                  data={item}
                  type={item.id.kind ? item.id.kind.slice(8) : item.kind.slice(8)}
                  videoID={item.contentDetails.videoId}
                  style={{
                    minHeight: 'max-content',
                    // @ts-ignore
                    background: (theme) => theme.palette.background.paper,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Root>
  )
}
