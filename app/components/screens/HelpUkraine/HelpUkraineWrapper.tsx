import { Divider, Grid, styled } from '@mui/material'
import { FC } from 'react'

import { HeaderWrapper } from '@/components/layout/header'

import { ContactsBG } from '@/assets/icons/backgrounds'

import { HelpUkraineAbout, HelpUkraineFinancially } from './components'
import { data } from './data'

type Props = {}

const Root = styled(Grid)(({ theme }) => ({
  padding: `${theme.spacing(4)}`,
  [theme.breakpoints.down('xl')]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down('sm')]: {
    padding: '24px 20px',
  },
}))

export const HelpUkraineWrapper: FC<Props> = (props) => {
  return (
    <Root container rowSpacing={10}>
      <Grid item xs={12}>
        <HeaderWrapper
          subtitle={
            <>
              Ukraine.
              <br />
              War.
              <br />
              Genocide.
            </>
          }
          photoBG={ContactsBG}
          position="background"
          shift={'unstyled'}
          size={{
            xs: [256, 256],
            sm: [440, 440],
            md: [500, 500],
          }}
          width={950}
          title={
            <>
              Support Ukraine.
              <br />
              Stand with us!
            </>
          }
          text={`While you're reading this page, Russia wages a genocidal war against Ukraine — destroying homes, ripping
                apart families, and taking away lives. Be on the right side of history, help us defend our freedom!`}
        />
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <HelpUkraineAbout data={data} />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <HelpUkraineFinancially financially={data.financially} />
      </Grid>
    </Root>
  )
}
