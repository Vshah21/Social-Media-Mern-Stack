import { makeStyles } from '@mui/styles'

const Styles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(1),
      margin: theme.spacing(5),
      marginLeft: theme.spacing(10),
      display:'flex',
      flexDirection: 'column',
      width: "90%"
    },
    title:{
      padding: "8px",
      color:  theme.palette.openTitle, 
      textAlign: 'center'
    },
    link:{
        textDecoration: 'none',
        color:"inherit",
    },
    paper:{
        margin: 20,
        padding:20,
        width: 600,
        display: 'flex',
        flexDirection: 'column'
      },
    textField:{
      width: "90%"
    },
    commentDate: {
      display: 'block',
      color: 'gray',
      fontSize: '0.8em'
   },
  }))

export default Styles;