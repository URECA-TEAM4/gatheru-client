import { ThemeProvider, createTheme } from '@mui/material/styles';

/** @type { import('@storybook/react').Preview } */
const theme = createTheme(); // 기본 테마 생성

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
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;