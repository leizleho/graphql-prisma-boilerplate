import getUserId from '../utils/getUserId';

const User = {
  email(parent, args, context, info) {
    const userId = getUserId(context, false);

    if (userId && userId === parent.id) {
      return parent.email;
    } else {
      return null;
    }
  }
};

export { User as default };
