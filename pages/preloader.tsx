import type { NextPage } from 'next'

import { PreloaderWrapper } from '@/components/screens/Preloader'

import Meta from '@/utils/meta/Meta'

const PreloaderPage: NextPage = () => (
  <Meta title="loading..." description="Welcome to the Bortnytskyi Oleksii portfolio. It's Preloader page">
    <PreloaderWrapper />
  </Meta>
)

export default PreloaderPage
