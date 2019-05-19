import getUserId from '../utils/getUserId';

async function users(parent, args, { prisma }, info) {
  const where = args.filter
    ? {
        OR: [{ name_contains: args.filter }]
      }
    : {};
  const users = await prisma.users({
    where,
    first: args.first,
    skip: args.skip,
    after: args.after,
    orderBy: args.orderBy
  });
  return users;
}

async function me(parent, args, ctx, info) {
  const userId = getUserId(ctx);
  const user = await ctx.prisma.user({ id: userId });

  return user;
}

module.exports = {
  users,
  me
};
