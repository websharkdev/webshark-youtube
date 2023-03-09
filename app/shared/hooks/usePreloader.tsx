import { Box } from '@mui/material'
import { useLayoutEffect } from 'react'

import PreloaderPage from '../../../pages/preloader'

type Props = {
  children: React.ReactNode
  state: boolean
  setState: (state: boolean) => void
}

export const UsePreloader = ({ children, state, setState }: Props) => {
  useLayoutEffect(() => {
    setState(true)
  }, [])
  return <>{state ? <Box>{children}</Box> : <PreloaderPage />}</>
}
