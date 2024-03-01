import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { PostMutation } from '../../types';
import { createPost } from './postThunks';
import PostForm from './components/PostForm';

const NewPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (data: PostMutation) => {
    await dispatch(createPost(data)).unwrap();
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4">New post</Typography>
      <PostForm onSubmit={onFormSubmit}/>
    </>
  );
};

export default NewPost;