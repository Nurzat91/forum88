import { Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {LoadingButton} from '@mui/lab';
import FileInput from '../../../components/UI/FileInput/FileInput';
import { PostMutation } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectCreateLoading } from '../postSlice';


interface Props {
  onSubmit: (mutation: PostMutation) => void;
}
const PostForm: React.FC<Props> = ({onSubmit}) => {
  const user = useAppSelector(selectUser);
  const createLoading = useAppSelector(selectCreateLoading);
  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.description.length || state.image) {
      setLoading(false);
    }

    if (state.description.length === 0  && state.image === null) {
      setLoading(true);
    }
  }, [state]);

  if (!user) {
    return <Navigate to="/login"/>
  }

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };
  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    > <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton disabled={loading} loading={createLoading} type="submit" color="primary" variant="contained">
            Create
          </LoadingButton >
        </Grid>
      </Grid>
    </form>
  );
};

export default PostForm;