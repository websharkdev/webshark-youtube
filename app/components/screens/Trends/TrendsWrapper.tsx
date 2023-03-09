import { Box, Grid, styled } from '@mui/material'
import moment from 'moment'
import React, { FC, useEffect, useState } from 'react'

import { handleTrends } from '@/shared/api/home.api'

import { HomeFeed } from '../Home/components'

type Props = {}

const Root = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}))

export const TrendsWrapper: FC<Props> = (props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    handleTrends('ES').then((res) => setData(res))
  }, [])

  return (
    <Root container rowGap={2.5}>
      <Grid item xs={12}>
        <HomeFeed data={data} />
      </Grid>
    </Root>
  )
}
