import{ useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext ,TabList , TabPanel } from '@material-ui/lab';
import {Paper} from '@mui/material'
import Styles from './Styles'
import PostList from '../post/PostList';
import FollowGrid from './FollowGrid';

const ProfileTabs = ({ posts ,removeUpdate, user })=>{
    const classes = Styles()
    
    const [ value, setValue] = useState("1")

    const handleChange = ( event, value) => {
        
        setValue(value);
      };


    return (
        <div>
            <Paper className={classes.root} elevation={4}>
                <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Posts" value="1" />
                    <Tab label="Following" value="2" />
                    <Tab label="Followers" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1"><PostList posts={posts} removeUpdate={removeUpdate}/></TabPanel>
                <TabPanel value="2"><FollowGrid people={user.following}/></TabPanel>
                <TabPanel value="3"><FollowGrid people={user.followers}/></TabPanel>
                </TabContext>
            </Paper>
            
            
        </div>
    )
}

export default ProfileTabs