import { ThemeProvider, createTheme } from '@mui/material/styles';

/** @type { import('@storybook/react').Preview } */
const theme = createTheme()
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => (
      <ThemeProvider theme={theme}>
        {story()}
      </ThemeProvider>
    ),
  ],
};

export default preview;