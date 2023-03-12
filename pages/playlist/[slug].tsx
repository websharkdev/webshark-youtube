import type { NextPage } from 'next'

import Layout from '@/components/layout/Layout'

import { PlaylistWrapper } from '@/screens/Video'

import Meta from '@/utils/meta/Meta'

const PlaylistPage: NextPage = () => (
  <Meta title="Playlist" description="Password Generator Page">
    <Layout>
      <PlaylistWrapper />
    </Layout>
  </Meta>
)

export default PlaylistPage
