import type { NextPage } from 'next'

import Layout from '@/components/layout/Layout'

import { Home } from '@/screens/Home'

import Meta from '@/utils/meta/Meta'

const HomePage: NextPage = () => (
  <Meta title="Home" description="Password Generator Page">
    <Layout>
      <Home />
    </Layout>
  </Meta>
)

export default HomePage
