import React, { useState } from 'react';
import { Card, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CommentsWithoutId } from '../../types';

interface Props {
  id: string;
  onSubmit: (mutation: CommentsWithoutId) => void;
  isLoading?: boolean;
}
const CommentsForm: React.FC<Props> = ({id, onSubmit, isLoading = false}) => {
  const [state, setState] = useState<CommentsWithoutId>({
    postId: id,
    comment: '',
  });

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
    setState({
      postId: id,
      comment: '',
    });
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <Card sx={{padding: 2, marginTop: 0}}>
      <Typography variant="h5" color="primary">Add your comment:</Typography>
      <form
        autoComplete="off"
        onSubmit={submitFormHandler}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              multiline
              id="comment" label="Your comments"
              value={state.comment}
              onChange={inputChangeHandler}
              name="comment"
              required
            />
          </Grid>
          <Grid item xs>
            <LoadingButton
              type="submit"
              color="primary"
              variant="contained"
              loading={isLoading}
              disabled={isLoading}
            >Add comment</LoadingButton>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default CommentsForm;