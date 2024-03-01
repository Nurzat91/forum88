import { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommentsForm from './CommentsForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CommentsWithoutId } from '../../types';
import { selectOnePost, selectOnePostLoading } from '../post/postSlice';
import { createComments, fetchComments } from './commentsThunks';
import { selectComments, selectCommentsLoading, selectCreateLoading } from './commentsSlice';
import { selectUser } from '../users/usersSlice';
import { fetchOnePosts } from '../post/postThunks';
import CommentsItem from './CommentsItem';

const Comments = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);
  const loadingPost = useAppSelector(selectOnePostLoading);
  const comment = useAppSelector(selectComments);
  const loadingComments = useAppSelector(selectCommentsLoading);
  const creatingComment = useAppSelector(selectCreateLoading);
  const user = useAppSelector(selectUser);

  const onFormSubmit = async (comment: CommentsWithoutId) => {
    await dispatch(createComments(comment));
    await dispatch(fetchComments(id));
  };

  useEffect(() => {
    dispatch(fetchOnePosts(id));
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  return (
    <>
      {loadingPost ? <CircularProgress/> : (
        <Grid container direction={"column"}>
          <Grid item sx={{mb: 3}}>
            <Typography fontSize={25}>{post?.title}</Typography>
            <Typography fontSize={15} color="grey"> <strong>{post?.user.username}</strong></Typography>
          </Grid>
          <Grid item sx={{mb: 5}}>
            {user ?
              (<CommentsForm id={id} onSubmit={onFormSubmit} isLoading={creatingComment}/>)
              :
              (<h3 style={{color: "grey"}}>Если хотите комментировать, надо зарегистрироваться.</h3>)
            }
          </Grid>
          <Grid item>
            <Typography variant="h5" color="primary.main">Comments:</Typography>
          </Grid>
          <Grid item container direction={"column"}>
            {loadingComments ? <CircularProgress/> : (
              comment.map(comment => (
                <CommentsItem key={comment._id} comment={comment}/>
              )))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Comments;