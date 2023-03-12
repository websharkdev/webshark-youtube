import {
  Audiotrack as AudiotrackIcon,
  Movie as MovieIcon,
  Podcasts as PodcastsIcon,
  School as SchoolIcon,
} from '@mui/icons-material'

export const defaultChannels = [
  { id: '0', icon: <AudiotrackIcon sx={{ width: '20px !important' }} />, title: 'Music' },
  { id: '1', icon: <SchoolIcon sx={{ width: '20px !important' }} />, title: 'Education' },
  { id: '2', icon: <PodcastsIcon sx={{ width: '20px !important' }} />, title: 'Podcast' },
  { id: '3', icon: <MovieIcon sx={{ width: '20px !important' }} />, title: 'Movie' },
]
