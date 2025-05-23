import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import rootThem from '../../app/Theme';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: rootThem.palette.background.default,
    },
    heroContent: {
      maxWidth: 600,
      padding: rootThem.spacing(3),
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: rootThem.spacing(2),
    },
    subtitle: {
      fontSize: '1.2rem',
      marginBottom: rootThem.spacing(4),
    },
    searchField: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }));

  export default useStyles;