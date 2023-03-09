import { Box, Grid, Typography, styled } from '@mui/material'
import { FC } from 'react'

import styles from '@/screens/Home/home.module.sass'

type Props = {}

const Wrapper = styled(Grid)(({ theme }) => ({
  position: 'relative',
  justifyContent: 'flex-end',
  width: 'max-content',
  height: 'max-content',
  flexWrap: 'nowrap',
  '& .home-scroll-down': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 110,
    '& .rotated-item': {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      transform: 'rotate(-90deg)',
      position: 'absolute',
    },
    '& .home-scroll-down-square': {
      width: 12,
      height: 12,
      border: `1px solid ${theme.palette.text.primary}`,
      marginRight: theme.spacing(2),
    },
    '& .home-scroll-down-text': {
      fontSize: '.8em',
      fontWeight: 600,
      lineHeight: '19.5px',
      letterSpacing: '1px',
      textTransform: 'lowercase',
    },
  },
}))

export const HeaderScroll: FC<Props> = (props) => (
  <Wrapper container direction="column" className={`${styles.HomeRotated}`}>
    <Grid item sx={{ width: 'max-content' }} className="home-scroll-down">
      <Box className={`${styles.HomeScrollDown} rotated-item`}>
        <Box className="home-scroll-down-square" />

        <Typography className="home-scroll-down-text" variant="button">
          scroll
        </Typography>
      </Box>
    </Grid>
  </Wrapper>
)
