import { useEffect } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PostItem from './components/PostItem';
import { fetchPosts } from './postThunks';
import { selectPosts, selectPostsLoading } from './postSlice';

const Post = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  let postData;
  if(postData) {

  }

  return(
    <Grid container direction="column" spacing={2}>
      <Grid item container spacing={2}>
        {loading ? (
          <CircularProgress />
        ) : (
          posts.map(post => (
            <PostItem
              key={post._id}
              id={post._id}
              title={post.title}
              date={post.date}
              image={post.image}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
};


export default Post;