import { Grid } from '@mui/material'
import { motion, useScroll } from 'framer-motion'
import { FC, ReactElement, createContext, useEffect, useState } from 'react'

import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

import { HelpUkraine } from './HelpUkraine'
import styles from './layout.module.sass'
import { Sidebar } from './sidebar'

export const layoutContext = createContext({
  category: 'New',
  setCategory: (category: string) => {},
})

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const [category, setCategory] = useState<string>('')
  useEffect(() => {
    const LSCategory: string = window.localStorage.getItem('youtube_clone') || 'Ukraine'

    setCategory(LSCategory)
  }, [])

  const { scrollYProgress } = useScroll()
  return (
    <layoutContext.Provider value={{ category: category, setCategory: setCategory }}>
      <div className={styles.layout}>
        <motion.div className={styles.ProgressBar} style={{ scaleX: scrollYProgress }} />
        <Grid container className={styles.wrapper} columnGap={2}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs={9}>
            <Header />
            <div className={styles.page}>{children}</div>
          </Grid>
        </Grid>
        <HelpUkraine />
        <Footer />
      </div>
    </layoutContext.Provider>
  )
}

export default Layout
