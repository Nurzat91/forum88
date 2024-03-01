import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { CommentsUser } from '../../types';

interface Props {
  comment: CommentsUser;
}
const CommentsItem: React.FC<Props> = ({comment}) => {
  return (
    <Grid item>
      <Card sx={{padding: 2, mt: 1}}>
        <Typography color="grey" fontSize={15}>
          {comment.userId.username}
        </Typography>
        <Typography fontSize={20}>
          {comment.comment}
        </Typography>
      </Card>
    </Grid>
  );
};

export default CommentsItem;