
import React from 'react'
//import { Typography,AppBar } from '@material-ui/core'
import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notifications from './components/Notifications'


const App = () => {
  //const classes=useStyles()
  //className={classes.wrapper}
  //className={classes.appBar}
  return (
    <div >
        <h1>Video Chat</h1>       
        <VideoPlayer/>
        <Options>
            <Notifications/>
        </Options>
    </div>
  )
}

export default App