import type { NextPage } from 'next'

import Layout from '@/components/layout/Layout'

import { HelpUkraineWrapper } from '@/screens/HelpUkraine'

import Meta from '@/utils/meta/Meta'

const HelpUkrainePage: NextPage = () => (
  <Meta title="Help Ukraine" description="Welcome to the Bortnytskyi Oleksii blog. It's Help Ukraine page">
    <Layout>
      <HelpUkraineWrapper />
    </Layout>
  </Meta>
)

export default HelpUkrainePage
