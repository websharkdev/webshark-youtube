import { Box, Chip, Grid, Skeleton, Snackbar, Tab, Tabs, styled } from '@mui/material'
import { FC, useContext, useEffect, useState } from 'react'

import { layoutContext } from '@/components/layout/Layout'

import styles from '@/screens/Home/home.module.sass'

import { handleChannels, handleQuery } from '@/shared/api/home.api'

import { ColorModeContext } from '@/providers/customThemeProvider/CustomThemeProvider'

import { HomeFeed } from './components'
import { demoCategories } from './data'

type Props = {}

const Root = styled(Grid)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}))

export const Home: FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(true)
  const colorMode = useContext(ColorModeContext)
  const categoryContext = useContext(layoutContext)
  const [data, setData] = useState([])

  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    setLoading(true)
    // For searchbar
    const LSCategory: string = window.localStorage.getItem('youtube_clone') || ''
    LSCategory.length > 0 &&
      handleQuery(`search?part=snippet&q=${LSCategory}`)
        .then((res) => setData(res.items))
        .then(() => window.localStorage.setItem('youtube_clone', ''))
        .then(() => setLoading(false))
        .catch((error) => console.log(`SHIIIIT! Some things wrong ${error}`))

    // For subscription
    const LSCategorySubscription: string = window.localStorage.getItem('youtube_clone-subscription') || ''

    LSCategorySubscription.length > 0 &&
      handleQuery(`search?part=snippet&q=${LSCategorySubscription}`)
        .then((res) => setData(res.items))
        .then(() => window.localStorage.setItem('youtube_clone-subscription', ''))
        .then(() => setLoading(false))
        .catch((error) => console.log(`SHIIIIT! Some things wrong ${error}`))
  }, [])

  useEffect(() => {
    categoryContext.category.trim().length &&
      handleQuery(`search?part=snippet&q=${categoryContext.category.toLocaleLowerCase()}`)
        .then((res) => setData(res.items))
        .then(() => setLoading(false))
  }, [categoryContext.category])

  useEffect(() => {
    categoryContext.setCategory(demoCategories[value].name)
  }, [value])

  if (loading)
    return (
      <Root container className={`${styles.Root}`} rowGap={2.5}>
        {new Array(10).map((val, idx) => (
          <Grid item xs={4} key={idx}>
            <Skeleton variant="rectangular" width="100%" height={515} />
          </Grid>
        ))}
      </Root>
    )

  return (
    <Root container className={`${styles.Root}`} rowGap={2.5}>
      <Grid item xs={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {demoCategories.map((category: any) => (
            <Tab title={category.name} label={category.name} key={category.id} className="home-tab--item" />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <HomeFeed data={data} />
      </Grid>
    </Root>
  )
}
