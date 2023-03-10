import { ThumbUpOutlined as ThumbUpOutlinedIcon, ThumbUpRounded as ThumbUpRoundedIcon } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { handleQuery, handleVideoDetails } from '@/shared/api/home.api'
import { useNumbers } from '@/shared/hooks'
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
}))

const StatisticsItem = ({ name, count }: any) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 0.2 }}>
    <Typography variant="body2" width="100%" className="feed-item--statistic_title">
      {name}
    </Typography>
    <Typography variant="h6" width="100%" className="feed-item--statistic_intent">
      {useNumbers(count)}
    </Typography>
  </Box>
)

export const VideoWrapper: FC<Props> = (props) => {
  const [like, setLike] = useState<boolean>(false)
  const [data, setData] = useState<VideoDetails>()
  const [related, setRelated] = useState([])
  const [videoID, setVideoID] = useState<string>('')
  const url = useRouter()

  useEffect(() => {
    if (url.isReady) {
      // @ts-ignore
      const id = url.query.slug.toLocaleString()
      setVideoID(id)

      handleVideoDetails(id).then((res) => {
        setData(res)
        handleQuery(
          `search?part=snippet&q=${res.snippet.tags ? res.snippet.tags[3] : res.snippet.channelTitle}`,
          6
        ).then((res) => {
          const sameVideo = res.items.filter((item: any) => item.snippet.title !== data?.snippet.title)
          setRelated(sameVideo.slice(2, 4))
        })
      })
    }
  }, [videoID, url.isReady])

  if (data === undefined)
    return (
      <Root container className={`${styles.Root}`} rowGap={2.5} mt={2.5}>
        <Typography>Loading...</Typography>
      </Root>
    )

  return (
    <Root container className={`${styles.Root}`} rowGap={2.5} mt={2.5}>
      <Grid item xs={9}>
        <Grid container rowGap={2.5}>
          <Grid item xs={12}>
            <iframe
              width="100%"
              className="video-wrapper--iframe"
              src={`https://www.youtube.com/embed/${videoID}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4">{data.snippet.title}</Typography>
          </Grid>
          <Grid item xs={12} children={<Divider />} />

          <Grid item xs={12}>
            <Grid container columnGap={1.5} wrap="nowrap">
              <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                <IconButton className="like" onClick={() => setLike(!like)}>
                  {like ? <ThumbUpRoundedIcon /> : <ThumbUpOutlinedIcon />}
                </IconButton>
                <StatisticsItem name="Likes" count={data?.statistics?.likeCount} />
              </Grid>
              <Grid item xs={3}>
                <StatisticsItem name="Comments" count={data?.statistics?.commentCount} />
              </Grid>
              <Grid item xs={3}>
                <StatisticsItem name="View's" count={data?.statistics?.viewCount} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={3}
        className="video-wrapper--scrollable"
        sx={{
          px: 2.5,
        }}
      >
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
                style={{
                  minHeight: 'max-content',
                  background: '#f5f5f5',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Root>
  )
}
