import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, Grid, styled, Typography } from '@mui/material';
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import imageNotAvailable from '../../../assets/images/imageNotAvailable.png';
import { apiURL } from '../../../constants';

interface Props {
  id: string;
  username: string;
  title: string;
  date: string;
  image: string | null;
}
const ImageCardMedia = styled(CardMedia)({
  width: '120px',
  paddingLeft: '15%',
});
const PostItem: React.FC<Props>  = ({id, username,  title, date, image}) => {
  const dateTime = dayjs(date).format('DD.MM.YYYY HH:mm');
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }
  return (
    <Grid item sm md={6} lg={4} id={id}>
      <Card sx={{display: "flex", margin: 1}}>
        <ImageCardMedia image={cardImage} title={title}/>
        <Grid>
          <CardHeader title={dateTime + ' by ' + username}/>
          <CardActions sx={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            <Typography variant="h5" component={Link} to={'/post/' + id} sx={{pl: 1}}>{title}</Typography>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PostItem;