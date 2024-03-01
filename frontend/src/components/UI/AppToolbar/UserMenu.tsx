import React from 'react';
import { Button,  Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { User } from '../../../types';
import { logout } from '../../../features/users/usersThunks';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-posts');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button color="inherit">
        Hello, {user.username}!
      </Button>
      <Button color="inherit" onClick={handleClick}>
        Add new post
      </Button>
      <Typography variant="body1" color="inherit">
        |
      </Typography>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};

export default UserMenu;