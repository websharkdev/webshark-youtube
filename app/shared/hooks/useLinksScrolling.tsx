import { wrap } from '@motionone/utils'
import { Box, Link as MuiLink, styled } from '@mui/material'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { memo, useRef } from 'react'

import { LinkProps } from '@/shared/types/helpUkraine'

interface ParallaxProps {
  data: LinkProps
  baseVelocity: number
  fontSize?: number
  inView?: boolean
}

const ParallaxBody = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  lineHeight: 0.8,
  margin: 0,
  padding: `${theme.spacing(3)} 0`,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(2)} 0`,
  },
  display: 'flex',
  whiteSpace: 'nowrap',
  '& .scroller': {
    fontWeight: 600,
    textTransform: 'uppercase',
    fontSize: 64,
    [theme.breakpoints.down('md')]: {
      fontSize: 42,
    },
    display: 'flex',
    whiteSpace: 'nowrap',
    flexWrap: 'nowrap',
  },
  '& span': {
    display: 'block',
  },
}))

export const ParallaxLink = memo(({ data, baseVelocity = 100, fontSize, inView }: ParallaxProps) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef<number>(1)

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    baseX.set(baseX.get() + moveBy)
  })

  const NumberOfSpan = 15 // Number of span (how many it's will repeat)

  return (
    <ParallaxBody className="parallax">
      {inView ? (
        <motion.div className="scroller" style={{ x, fontSize: `${fontSize}px` }}>
          {[...Array(NumberOfSpan)].map((e, i) => (
            <MuiLink href={data.href} key={i} mx={1.5} className="parallax-link--children-item">
              {data.name}
            </MuiLink>
          ))}
        </motion.div>
      ) : (
        <div className="scroller" style={{ fontSize: `${fontSize}px` }}>
          {[...Array(NumberOfSpan)].map((e, i) => (
            <MuiLink href={data.href} key={i} mx={1.5} className="parallax-link--children-item">
              {data.name}
            </MuiLink>
          ))}
        </div>
      )}
    </ParallaxBody>
  )
})
