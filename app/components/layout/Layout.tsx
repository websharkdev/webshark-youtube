import { Box, Drawer, Grid, useMediaQuery } from '@mui/material'
import { motion, useScroll } from 'framer-motion'
import { FC, ReactElement, createContext, useEffect, useState } from 'react'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

import { HelpUkraine } from './HelpUkraine'
import styles from './layout.module.sass'
import { Sidebar, SidebarSimplified } from './sidebar'

export const layoutContext = createContext({
  category: 'New',
  setCategory: (category: string) => {},
  setBurgerMenu: (burgerMenu: boolean) => {},
  burger: false,
  setSearch: (search: string) => {},
  search: '',
})

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const [category, setCategory] = useState<string>('')
  const [burgerMenu, setBurgerMenu] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const tablet = useMediaQuery((theme) =>
    // @ts-ignore
    theme.breakpoints.down('md')
  )
  useEffect(() => {
    const LSCategory: string = window.localStorage.getItem('youtube_clone') || 'Ukraine'

    setCategory(LSCategory)
  }, [])

  const { scrollYProgress } = useScroll()
  return (
    <layoutContext.Provider value={{ category, setCategory, burger: burgerMenu, setBurgerMenu, search, setSearch }}>
      <Box className={styles.layout} sx={{ background: (theme) => theme.palette.background.paper }}>
        <motion.div className={styles.ProgressBar} style={{ scaleX: scrollYProgress }} />
        <Grid
          container
          className={styles.wrapper}
          columnGap={2}
          sx={{
            p: { xs: 0, md: 2.8 },
          }}
        >
          {!tablet && (
            <Grid item xs={12} md={4} lg={3}>
              <Sidebar />
            </Grid>
          )}
          <Grid item xs={12} md={8} lg={9}>
            <Header />
            <div className={styles.page}>{children}</div>
          </Grid>
        </Grid>
        <HelpUkraine />
        <Footer />
        <Drawer
          anchor="left"
          open={burgerMenu}
          onClose={() => setBurgerMenu(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: '100%',
              background: (theme) => theme.palette.background.default,
            },
          }}
        >
          <SidebarSimplified
            style={{
              minHeight: '100vh',
              borderRadius: 0,
              position: 'relative',
              mt: 0,
              top: 'auto',
            }}
          />
        </Drawer>
      </Box>
    </layoutContext.Provider>
  )
}

export default Layout
