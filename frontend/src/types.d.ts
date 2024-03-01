
export interface RegisterMutation {
  username: string;
  password: string;
}
export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface GlobalError {
  error: string;
}

export interface PostGet {
  _id: string;
  user: {
    _id: string,
    username: string,
  };
  title: string;
  date: string;
  image: string | null;
}
export type ApiPostGet = Omit<PostGet, 'id', 'date'>;

export interface PostMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface CommentsGet {
  _id: string;
  postId: string;
  comment: string;
}

export type CommentsWithoutId = Omit<CommentsGet, '_id'>;

export interface CommentsUser {
  _id: string;
  userId: {
    _id: string;
    username: string;
  }
  postId: string;
  comment: string;
}