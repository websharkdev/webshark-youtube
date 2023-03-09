import { Box, Grid, styled } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'

import { PhotoContainerProps } from '@/shared/types/home'

const Root = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  [theme.breakpoints.between('lg', 'md')]: {
    position: 'relative',
    left: 0,
    top: 0,
    transform: 'translateX(-50%)',
  },

  zIndex: -1,
  width: '100%',
  height: '100%',
  '&.photo-container--unStyled': {
    margin: '0 auto',
    position: 'relative  !important',
    top: '0  !important',
    left: '0 !important',
    transform: 'initial !important',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
    },
    '& .photo-container--box-mainImage-item': {
      left: '50% !important',
      top: '50% !important',
      transform: 'translate(-50%, -50%) !important',
    },
  },
  '&.photo-container--block': {
    margin: '0 auto',
    position: 'relative  !important',
    top: '0  !important',
    left: '0 !important',
    transform: 'initial !important',

    '& .photo-container--box-mainImage-item': {
      width: '100%',
      height: '100%',
    },
  },
  '&.photo-container--background': {
    transform: 'translate(-50%, -50%) !important',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%) !important',
    },

    '& .photo-container--box-mainImage-item': {
      width: '100%',
      height: '100%',
    },
  },
  '& .photo-container--box': {
    position: 'relative',
    width: '100%',
    height: '100%',
    '& .photo-container--box-subimage': {
      position: 'absolute',
      zIndex: -1,
    },
  },
}))

export const PhotoContainer: FC<PhotoContainerProps> = ({ mainPhoto, position, photoBG, size, shift, className }) => (
  <Root
    className={`photo-container photo-container--${position} ${className || ''}`}
    sx={{
      transform: {
        md: shift?.md && `translate(-50%, calc(-50% - ${shift.md[1]}px))`,
        lg: shift?.lg && `translate(-50%, calc(-50% - ${shift.lg[1]}px))`,
        xl: shift?.xl && `translate(-50%, calc(-50% - ${shift.xl[1]}px))`,
      },
    }}
    width={{
      xs: size?.xs ? size.xs[0] : 256,
      sm: size?.sm && size.sm[0],
      md: size?.md && size.md[0],
      lg: size?.lg && size.lg[0],
      xl: size?.xl && size.xl[0],
    }}
    height={{
      xs: size?.xs ? size.xs[1] : 256,
      sm: size?.sm && size.sm[1],
      md: size?.md && size.md[1],
      lg: size?.lg && size.lg[1],
      xl: size?.xl && size.xl[1],
    }}
  >
    <Box className="photo-container--box" width="100%" height="100%">
      {mainPhoto && (
        <Box
          sx={{
            overflow: 'hidden',
            width: {
              xs: size?.xs ? size.xs[0] : 256,
              sm: size?.sm && size.sm[0],
              md: size?.md && size.md[0],
              lg: size?.lg && size.lg[0],
              xl: size?.xl && size.xl[0],
            },
            height: {
              xs: size?.xs ? size.xs[1] : 256,
              sm: size?.sm && size.sm[1],
              md: size?.md && size.md[1],
              lg: size?.lg && size.lg[1],
              xl: size?.xl && size.xl[1],
            },
          }}
        >
          {/* @ts-ignore */}
          <Image src={mainPhoto} alt="main_image" className="photo-container--box-mainImage-item" />
        </Box>
      )}
      {photoBG && (
        <Box
          className="photo-container--box-subimage"
          sx={{
            width: '100%',
            height: '100%',
            top: {
              xs: shift?.xs ? shift.xs[1] : 75,
              sm: shift?.sm && shift.sm[1],
              md: shift?.md && shift.md[1],
              lg: shift?.lg && shift.lg[1],
              xl: shift?.xl && shift.xl[1],
            },
            left: {
              xs: shift?.xs ? shift.xs[0] : 75,
              sm: shift?.sm && shift.sm[0],
              md: shift?.md && shift.md[0],
              lg: shift?.lg && shift.lg[0],
              xl: shift?.xl && shift.xl[0],
            },
          }}
        >
          {/* @ts-ignore */}
          <Image src={photoBG} alt="sub_image" className="photo-container--box-subImage-item" />
        </Box>
      )}
    </Box>
  </Root>
)
