import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) =>( {
    boxContainer: {
        paddingBottom: theme.spacing(3),
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        // boxShadow: '0px 4px 8px rgba(0, 0, 0, 10)',
    },

    InputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
    },
}))

export default useStyles