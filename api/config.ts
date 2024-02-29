import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mongoose: {
    // db: 'mongodb://localhost/forum',
    db: "mongodb://127.0.0.1:27017/forum",
  }
};

export default config;