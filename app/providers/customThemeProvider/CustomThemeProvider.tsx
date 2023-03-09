import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { FC, ReactElement, createContext, useMemo, useState } from 'react'

import { darkTheme, lightTheme } from './theme'

export const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: 'light' })

const cache = createCache({
  key: 'custom',
  prepend: true,
})

const CustomThemeProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const LSMode = window.localStorage.getItem('mode')
    // @ts-ignore
    setMode(LSMode?.trim() ? LSMode : 'light')
  }, [])
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        const LSMode = mode === 'light' ? 'dark' : 'light'

        window.localStorage.setItem('mode', LSMode)
      },
      mode,
    }),
    [mode]
  )

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  )
}

export default CustomThemeProvider
