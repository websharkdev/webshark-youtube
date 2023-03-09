import { Link as MuiLink } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import LogoIcon from '@/assets/icons/logos/logo.svg'

const Logo: FC = () => (
  <Link href="/">
    <MuiLink className="logo" display="flex">
      <Image src={LogoIcon} alt="logo-icon" width={48} height={'100%'} />
    </MuiLink>
  </Link>
)

export default Logo
