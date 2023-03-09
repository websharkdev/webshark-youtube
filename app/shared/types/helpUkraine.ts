export interface ImageHelpUkraineProps {
  id: string
  src: string
  alt: string
}

export type LinkProps = {
  id: string
  href: string
  name: string
}

export type HelpAidProps = {
  id: string
  image: string
  link: LinkProps
  read_more: LinkProps[]
  text: string
  name: string
}

export type HelpUkraineFinanciallyProps = {
  aids: HelpAidProps[]
  section: string
  text: string
}

export type ParallaxTextProps = {
  id: string
  text: string
}
