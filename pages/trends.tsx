import type { NextPage } from 'next'

import Layout from '@/components/layout/Layout'

import { TrendsWrapper } from '@/screens/Trends'

import Meta from '@/utils/meta/Meta'

const TrendsPage: NextPage = () => (
  <Meta title="Trends" description="Welcome to the Bortnytskyi Oleksii blog. It's Help Ukraine page">
    <Layout>
      <TrendsWrapper />
    </Layout>
  </Meta>
)

export default TrendsPage
