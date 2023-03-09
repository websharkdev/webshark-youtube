import { Typography } from '@mui/material'
import { FC } from 'react'

import Meta from '@/utils/meta/Meta'

const Error500: FC = () => (
  <Meta title="Server-side error">
    <Typography variant="h1">500 - Server-side error occurred</Typography>
  </Meta>
)

export default Error500
