import { Box, Grid, Link as MuiLink, Typography, styled } from '@mui/material'
import { FC } from 'react'

import { HelpAidProps, LinkProps } from '@/shared/types/helpUkraine'

type Props = {
  data: HelpAidProps
}

const Root = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(4),
  background: '#f6f6f6',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  '& .aid-title': {
    color: theme.palette.common.black,
  },
  '& .aid-link-container': {
    position: 'relative',
  },
  '& .aid-image-container': {
    position: 'relative',
    '& .aid-image': {
      width: '100%',
      height: 'max-content',
      maxHeight: 220,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
    },
  },
  '& .aid-text': {
    minHeight: 90,
    color: theme.palette.common.black,
  },
}))

export const HelpUkraineAidCard: FC<Props> = ({ data }) => {
  const { name, text, image, link, read_more } = data
  return (
    <Root container className="aid-wrapper" rowSpacing={4}>
      <Grid item xs={12} className="aid-title-container">
        <Typography variant="h3" className="aid-title">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} className="aid-text-container">
        <Typography variant="body2" className="aid-text">
          {text}
        </Typography>

        <Box sx={{ gap: 2, display: 'flex', mt: 4 }}>
          {read_more.map((item: LinkProps) => (
            <MuiLink
              href={item.href}
              className="parallax-link--children-item"
              sx={{ color: 'common.black' }}
              key={item.id}
            >
              {item.name}
            </MuiLink>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} className="aid-image-container">
        <Box className="aid-image">
          <img src={image} alt={name} style={{ aspectRatio: '16/9', width: '100%' }} />
        </Box>
      </Grid>
      <Grid item xs={12} className="aid-link-container">
        <MuiLink
          href={link.href}
          className="parallax-link--children-item"
          sx={{
            color: 'common.black',
          }}
        >
          {link.name}
        </MuiLink>
      </Grid>
    </Root>
  )
}
