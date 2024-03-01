import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import imageNotAvailable from '../../../assets/images/imageNotAvailable.png';
import { apiURL } from '../../../constants';

interface Props {
  id: string;
  title: string;
  date: string;
  image: string | null;
}
const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
const PostItem: React.FC<Props>  = ({id, title, date, image}) => {
  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }
  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}} id={id}>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <p>
            {date}
          </p>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostItem;