import {HydratedDocument, model, Schema, Types} from 'mongoose';
import User from './User';
import {PostProps} from '../types';


const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) =>{
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    }
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: async function (this: HydratedDocument<PostProps>): Promise<boolean> {
        return Boolean(this.image || this.description);
      },
      message: "description or image required"
    }
  },
  image: {
    type: String,
    validate: {
      validator: async function (this: HydratedDocument<PostProps>): Promise<boolean> {
        return Boolean(this.image || this.description);
      },
      message: "description or image required"
    }
  },
  datetime: {
    required: true,
    type: Date,
    default: () => new Date(),
  }
});

const Post = model('Post', PostSchema);

export default Post;