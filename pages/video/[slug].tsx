import type { NextPage } from 'next'

import Layout from '@/components/layout/Layout'

import { VideoWrapper } from '@/screens/Video'

import Meta from '@/utils/meta/Meta'

const VideoPage: NextPage = () => (
  <Meta title="Video" description="Password Generator Page">
    <Layout>
      <VideoWrapper />
    </Layout>
  </Meta>
)

export default VideoPage
