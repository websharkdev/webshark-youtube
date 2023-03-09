import { ImageProps } from 'next/dist/client/image'

export interface Image {
  src: string
  alt: string
  size?: 'xl' | 'lg' | 'md' | 'xs'
}

export interface HomeSwiperItem {
  id: number
  image: Image
}

type ImageSProps = {
  xs?: number[]
  sm?: number[]
  md?: number[]
  lg?: number[]
  xl?: number[]
}

export type PhotoContainerProps = {
  mainPhoto?: ImageProps
  photoBG?: ImageProps
  position?: 'default' | 'unStyled' | 'block' | 'background'
  size?: ImageSProps
  shift?: ImageSProps
  className?: string
}
