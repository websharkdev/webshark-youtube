import { Box, Button, Grid, Typography, styled, useMediaQuery } from '@mui/material'
import { FC } from 'react'

import { PhotoContainer } from '@/components/layout/photoContainer'

import { PhotoContainerProps } from '@/shared/types/home'

import { HeaderScroll } from './HeaderScroll'

type Props = {
  width?: number | 'max-content'
  subtitle: React.ReactNode
  text: string
  // image component
  photoBG?: PhotoContainerProps['photoBG']
  mainPhoto?: PhotoContainerProps['mainPhoto']
  position?: PhotoContainerProps['position']
  shift?: PhotoContainerProps['shift'] | 'unstyled'
  size?: PhotoContainerProps['size']
  // title component
  title: React.ReactNode
  titleLink?: string
  link?: string
  action?: null | React.ReactNode
  className?: string
}

const Root = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  height: '100%',
  minHeight: 550,
  [theme.breakpoints.down('md')]: {
    padding: 0,
    minHeight: 'calc(100vh - 50px)',
  },
  [theme.breakpoints.up('md')]: {
    padding: `0`,
    height: 'max-content',
    minHeight: '850px',
  },
  [theme.breakpoints.down('md')]: {
    margin: 0,
    paddingBottom: theme.spacing(6),
  },
  '& .header-wrapper--subtitleBox': {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '& .header-wrapper--subtitle': {
      maxWidth: 300,
      [theme.breakpoints.down('lg')]: {
        maxWidth: 'min-content',
      },
    },
  },
  '& .header-wrapper--contentWrapper': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      height: 'calc(100% - 16px)',
    },
    [theme.breakpoints.down('md')]: {
      height: 'max-content',
      justifyContent: 'space-between',
    },

    '& .header-wrapper--textBox': {
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('lg')]: {
        marginTop: 0,
      },
      '& .header-wrapper--textDivider': {
        width: '100%',
        maxWidth: 120,
        marginBottom: theme.spacing(3),
        height: 2,
        background: theme.palette.primary.dark,
        [theme.breakpoints.down('md')]: {
          maxWidth: 64,
        },
      },
      '& .header-wrapper--text': {
        maxWidth: 400,
        color: theme.palette.text.primary,
      },
    },
  },
}))

const TitleWrapper = styled(Box)(({ theme }) => ({
  justifyContent: 'flex-end',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    order: -5,
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down(600)]: {
    width: '70%',
  },
  [theme.breakpoints.down(490)]: {
    width: '100%',
  },
  '& span.title': {
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(-1),
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down(490)]: {
      marginRight: theme.spacing(2),
    },
  },
}))

export const HeaderWrapper: FC<Props> = ({
  subtitle,
  photoBG,
  mainPhoto,
  position,
  shift,
  size,
  text,
  title,
  titleLink = 'back to home.',
  link = '/',
  width,
  action,
  className,
}) => {
  const tablet = useMediaQuery((theme) =>
    //   @ts-ignore
    theme.breakpoints.down('md')
  )
  return (
    <Box sx={{ position: 'relative' }}>
      {!tablet ? (
        <Box
          sx={{
            position: 'absolute',
            zIndex: 15,
            left: 0,
            bottom: '175px',
          }}
        >
          <HeaderScroll />
        </Box>
      ) : null}
      <Root container rowSpacing={10}>
        {!tablet && (
          <Grid item xs={12} md="auto" lg={4} xl={7} pl={{ md: 4, lg: 0 }}>
            <Box className="header-wrapper--subtitleBox" width="100%">
              <Typography className="header-wrapper--subtitle" variant="h3">
                {subtitle}
              </Typography>
            </Box>
          </Grid>
        )}
        <PhotoContainer
          mainPhoto={mainPhoto}
          photoBG={photoBG}
          position={position}
          size={size}
          shift={shift === 'unstyled' ? { xs: [0, 0] } : shift}
          className={className ? `${className}--photo_container` : ''}
        />
        <Grid item sx={{ height: { xs: 'max-content', md: 'auto' } }} xs={12} lg={7} xl={5}>
          <Box className="header-wrapper--contentWrapper">
            <Box className="header-wrapper--textBox">
              <Box className="header-wrapper--textDivider" />
              <Typography variant="body2" className="header-wrapper--text">
                {text}
              </Typography>
            </Box>
            <TitleWrapper>
              <Box component="div" width={{ xs: '100%', md: 500, lg: width ? width : 700 }}>
                <Typography component="span" variant="h1" className={`title ${link ? 'title_container' : null}`}>
                  {title}
                </Typography>
                {action ? (
                  action
                ) : (
                  <Button
                    sx={{ ml: { xs: 0, sm: 4 }, mb: { xs: 0, sm: 4 }, mt: { xs: 1.5, sm: 0 } }}
                    size={tablet ? 'medium' : 'large'}
                    href={link}
                    variant="contained"
                  >
                    {titleLink}
                  </Button>
                )}
              </Box>
            </TitleWrapper>
          </Box>
        </Grid>
      </Root>
    </Box>
  )
}
