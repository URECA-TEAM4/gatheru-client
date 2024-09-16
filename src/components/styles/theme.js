import { createTheme } from '@mui/material/styles'
import { primary_color, secondary_color } from '../constants/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: primary_color,
    },
    secondary: {
      main: secondary_color,
    },
  },
})

export default theme
