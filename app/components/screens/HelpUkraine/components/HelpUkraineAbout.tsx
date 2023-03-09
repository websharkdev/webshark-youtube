import { Box, Grid, Typography, styled } from '@mui/material'
import { FC } from 'react'

import { ImageHelpUkraineProps, ParallaxTextProps } from '@/shared/types/helpUkraine'

type Props = {
  data: {
    section: string
    images: ImageHelpUkraineProps[]
    text: ParallaxTextProps[]
  }
}

const Root = styled(Grid)(({ theme }) => ({
  minHeight: 1990,
  padding: theme.spacing(12),
  '& .help_Ukraine-image-box': {
    minHeight: 1990,
    display: 'flex',
    alignItems: 'flex-end',
    padding: `0 ${theme.spacing(5)}`,
    '& .help_Ukraine-image': {
      width: '100%',
      aspectRatio: '16/9',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(6)} 0`,
    minHeight: '100%',
    '& .help_Ukraine-content-text"': {
      width: '100%',

      '& .help_Ukraine-image': {
        width: '100%',
      },
    },
  },
  '& .help_Ukraine-content-box': {
    minHeight: 1990,
    padding: `0 ${theme.spacing(5)}`,
  },
}))

export const HelpUkraineAbout: FC<Props> = ({ data }) => {
  const { section, images, text } = data

  const randomIndexImage = Math.floor(Math.random() * (5 - 1 + 1) + 1)

  return (
    <Root container>
      <Grid item xs={12} mb={10}>
        <Typography variant="h3">{section}</Typography>
      </Grid>
      <Grid item xs={12} md={9} className="help_Ukraine-image-box">
        <Box
          sx={{
            position: 'sticky',
            bottom: '5vw',
            width: '100%',
            maxHeight: 740,
            overflow: 'hidden',
          }}
        >
          <img src={images[randomIndexImage].src} alt={images[randomIndexImage].alt} className="help_Ukraine-image" />
        </Box>
      </Grid>
      <Grid item xs={12} md={3} className="help_Ukraine-content-box">
        <Grid container rowSpacing={{ xs: 40, md: 120 }}>
          {text.map((textItem: ParallaxTextProps) => (
            <Grid
              item
              key={textItem.id}
              xs={12}
              sx={{
                '& img': {
                  display: { xs: 'flex', md: 'none' },
                },
              }}
            >
              <img
                src={images[+textItem.id].src}
                alt={images[+textItem.id].alt}
                style={{
                  width: '100%',
                }}
              />
              <Typography variant="body2" className="help_Ukraine-content-text" mt={{ xs: 10, md: 0 }}>
                {textItem.text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Root>
  )
}
