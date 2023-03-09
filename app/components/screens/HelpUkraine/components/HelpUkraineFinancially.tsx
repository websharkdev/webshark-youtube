import { Box, Grid, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { useWidth } from 'shared/hooks'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

import { HelpAidProps, HelpUkraineFinanciallyProps } from '@/shared/types/helpUkraine'

import { HelpUkraineBlob } from '@/assets/icons/blobs'

import { HelpUkraineAidCard } from './HelpUkraineAidCard'

type Props = {
  financially: HelpUkraineFinanciallyProps
}

const Root = styled(Grid)(({ theme }) => ({
  overflow: 'hidden',
  '& .help_financially-textDivider': {
    width: '100%',
    maxWidth: 120,
    marginBottom: theme.spacing(3),
    height: 2,
    background: theme.palette.primary.dark,
  },
  '& .help_financially-content-box': {
    margin: `${theme.spacing(7)} 0`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 400,
    '& .help_financially-blob': {
      position: 'absolute',
      zIndex: -1,
      left: '10vw',
      [theme.breakpoints.down('md')]: {
        top: '-10vw',
      },
    },
  },
}))

export const HelpUkraineFinancially: FC<Props> = ({ financially }) => {
  const { section, text, aids } = financially
  const [slidesPerView, setSlidesPerView] = useState(4)
  const currentWidth = useWidth()

  useEffect(() => {
    switch (currentWidth) {
      case 'xs':
        setSlidesPerView(1)
        break
      case 'sm':
        setSlidesPerView(1)
        break
      case 'md':
        setSlidesPerView(2)
        break
      case 'lg':
        setSlidesPerView(3)
        break

      default:
        setSlidesPerView(4)
        break
    }
  }, [currentWidth])

  return (
    <Root container rowSpacing={6}>
      <Grid item xs={12}>
        <Typography variant="h3">{section}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="help_financially-content-box">
          <Grid item xs={12} md={6} className="help_financially-title-box">
            <Typography component="div" width={{ xs: '100%', md: 700, xl: 835 }}>
              <Typography component="span" variant="h1" className="help_financially-title">
                Support Ukraine.
                <br />
                Stand with us!
              </Typography>
            </Typography>
          </Grid>
          <Box className="help_financially-blob">
            <Image src={HelpUkraineBlob} alt="help Ukraine Blob" />
          </Box>
          <Grid item xs={12} md={4} className="help_financially-text-box">
            <Box className="help_financially-textDivider" />
            <Typography variant="body2">{text}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} mb={12}>
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
        >
          {aids.map((item: HelpAidProps) => (
            <SwiperSlide key={item.id} style={{ borderRadius: 4, overflow: 'hidden' }}>
              <HelpUkraineAidCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Root>
  )
}
