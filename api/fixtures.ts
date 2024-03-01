import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comments from './models/Comment';

const dropCollection = async (db: mongoose.Connection, collectionName: string) =>{
  try {
    await db.dropCollection(collectionName);
  }catch (e){
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['categories', 'products', 'users'];

  for (const collectionName of collections){
    await dropCollection(db, collectionName);
  }

  const [firstUser, secondUser] = await User.create(
    {
      username: 'Nurzat',
      password: '123',
      token: crypto.randomUUID(),
    },
    {
      username: 'Sun',
      password: '1234',
      token: crypto.randomUUID(),
    }
  );

  const [firstPost, secondPost, ] =await Post.create(
    {
      user: firstUser,
      title: 'React / redux/toolkit',
      description: 'При отправке формы создания поста и комментария необходимо отправлять свой token в заголовке Authorization.',
      image: 'fixtures/post1.png',
      datetime: '2024-03-01 07:02:22',
    },
    {
      user: secondUser,
      title: 'Expressjs',
      description: 'Выводить даты в правильном формате с помощью библиотек dayjs или date-fns',
      image: 'fixtures/post2.png',
      datetime: '2024-03-01 17:02:22',
    },
  );

  await Comments.create(
    {
      userId: firstUser,
      postId: firstPost,
      comment: 'Текст комментария 1',
    },
    {
      userId: firstUser,
      postId: firstPost,
      comment: 'Текст комментария 2',
    },
    {
      userId: secondUser,
      postId: secondPost,
      comment: 'Текст комментария 3',
    },
    {
      userId: secondUser,
      postId: secondPost,
      comment: 'Текст комментария 4',
    }
  );

  await db.close();
};

void run();