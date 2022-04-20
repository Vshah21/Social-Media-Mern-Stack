import {ImageList ,ImageListItem, Avatar, Typography} from '@material-ui/core';
import { Link} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import Styles from './Styles'

const FollowGrid = ({people}) =>{
    const classes = Styles();
    return (
        <div>
           <ImageList >
           {people.map( (person, i) =>{
              return <ImageListItem style={{'height':80}}  key={i}>
                        <Link className={classes.link} to={"/user/" + person._id}>
                            <Avatar>
                                <PersonIcon/>
                            </Avatar>
                            <Typography>
                                {person.name}
                            </Typography>
                        </Link>
               </ImageListItem>
            })
            }
           </ImageList>
        
        </div>
    )

}
export default FollowGrid;