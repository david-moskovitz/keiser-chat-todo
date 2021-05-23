import SignIn from '../SignIn'
import { useHistory } from "react-router-dom";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';


const HomePage = (props) => {
  let history = useHistory();
  if (props.user) {
    return (
      <div className="home-page">
        <div className="home-page-card" onClick={ () => history.push('/feed') }>
          <AlternateEmailIcon />
          <h3>Feeds</h3>
        </div>
        <div className="home-page-card" onClick={ () => history.push('/todos') }>
          <PlaylistAddCheckIcon />
          <h3>All Todos</h3>
        </div>
        <div className="home-page-card" onClick={ () => history.push('/debits') }>
          <ReceiptIcon />
          <h3>Debits</h3>
        </div>
        <div className="home-page-card" onClick={ () => history.push('/work') }>
          <TimelapseIcon />
          <h3>Work Hours</h3>
        </div>
        <div className="home-page-card" onClick={ () => history.push('/goal') }>
          <TrendingUpIcon />
          <h3>Edit Goals</h3>
        </div>
      </div>
    )
  } else {
    return <SignIn signInWithGoogle={ props.signInWithGoogle } />
  }

}

export default HomePage
