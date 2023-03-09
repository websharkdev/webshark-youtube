import { FC, ReactElement } from 'react'

import CustomThemeProvider from '@/providers/customThemeProvider/CustomThemeProvider'

const MaineProvider: FC<{ children: ReactElement }> = ({ children }) => (
  <CustomThemeProvider>{children}</CustomThemeProvider>
)

export default MaineProvider
