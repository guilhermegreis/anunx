import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ffffff',
        },
        background: {
            default: 'rgb(242, 244, 245)',
            white: '#ffffff',
            black: '#000000',
        },
    }
})

export default theme