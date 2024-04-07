// customTheme.js
import { extendTheme } from 'native-base';

const customTheme = extendTheme({
  colors: {
    // Updated color scheme remains the same
    primary: {
      50: '#ebf8ff',
      100: '#ceedff',
      200: '#90cdf4',
      300: '#63b3ed',
      400: '#4299e1',
      500: '#3182ce',
      600: '#2b6cb0',
      700: '#2c5282',
      800: '#2a4365',
      900: '#1A365D',
    },
  },
  components: {
    Text: {
      // Customizing text components globally
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'coolGray.50' : 'coolGray.800',
      }),
      defaultProps: {},
      sizes: {
        xl: {
          fontSize: "xl",
        },
        "2xl": {
          fontSize: "2xl",
        },
      },
      variants: {},
    },
    Button: {
      // Customizing button components globally
      baseStyle: {
        rounded: 'md',
      },
      defaultProps: {
        colorScheme: 'primary',
      },
      variants: {
        ghost: (props) => ({
          borderWidth: 2,
          borderColor: props.colorMode === 'dark' ? 'primary.300' : 'primary.500',
          _text: {
            color: props.colorMode === 'dark' ? 'primary.300' : 'primary.500',
          },
        }),
      },
      sizes: {
        lg: {
          py: 3,
          px: 5,
        },
      },
    },
    VStack: {
      // Customizing VStack components globally
      baseStyle: {
        space: 4,
        alignItems: 'center',
      },
    },
  },
});

export default customTheme;
