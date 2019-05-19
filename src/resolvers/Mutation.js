import bcrypt from 'bcryptjs';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

async function register(parent, args, ctx, info) {
  const password = await hashPassword(args.password);
  const user = await ctx.prisma.createUser({
    ...args,
    password
  });

  return {
    user,
    token: generateToken(user.id)
  };
}

async function login(parent, args, ctx, info) {
  const user = await ctx.prisma.user({
    email: args.email
  });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(args.password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return {
    user,
    token: generateToken(user.id)
  };
}

async function deleteUser(parent, args, ctx, info) {
  const userId = getUserId(ctx);
  const deletedUser = await ctx.prisma.deleteUser({ id: userId });
  console.log('DeletedUser', deletedUser);
  return {
    ...deletedUser
  };
}

async function updateUser(parent, args, ctx, info) {
  const userId = getUserId(ctx);

  if (typeof args.data.password === 'string') {
    args.data.password = await hashPassword(args.data.password);
  }

  const updatedUser = await ctx.prisma.updateUser({
    where: { id: userId },
    data: { ...args.data }
  });

  return {
    ...updatedUser
  };
}

module.exports = {
  register,
  login,
  deleteUser,
  updateUser
};
