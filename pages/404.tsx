import { Typography } from '@mui/material'
import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

const Error404: FC = () => (
  <Meta title="Page not found">
    <Typography variant="h1">404 - Page not found</Typography>
  </Meta>
)

export default Error404
