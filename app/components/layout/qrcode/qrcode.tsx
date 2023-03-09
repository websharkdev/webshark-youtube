import { Link as MuiLink, styled } from '@mui/material'
import Image, { ImageProps } from 'next/image'
import { CSSProperties, FC } from 'react'

type Props = {
  children: ImageProps
  link: string
  styles?: CSSProperties
}

const Root = styled(MuiLink)(({ theme }) => ({
  padding: theme.spacing(0.6),
  minHeight: 50,
  minWidth: 50,
  background: '#fff',
  display: 'flex',
}))

export const QRCode: FC<Props> = ({ children, link, styles }) => (
  <Root href={link} className="unstyled" sx={styles}>
    {/* @ts-ignore */}
    <Image src={children} alt="qr-code" />
  </Root>
)
