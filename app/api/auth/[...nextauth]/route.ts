import { authOptions } from '@/lib/auth-options';
import NextAuth from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { prisma } from '@/prisma/prisma-client';
// import { compare, hashSync } from 'bcrypt';
// import { UserRole } from '@prisma/client';

// export const authOptions: AuthOptions = {
//   providers: [
//     // провайдер для авторизации через GitHub
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID || '',
//       clientSecret: process.env.GITHUB_SECRET || '',
//       profile(profile) {
//         return {
//           id: profile.id,
//           name: profile.name || profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//           role: 'USER' as UserRole,
//         };
//       },
//     }),
//     // провайдер для авторизации через email и пароль
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         // здесь можно проверить, соответствует ли email и пароль пользователя
//         if (!credentials) {
//           return null;
//         }

//         const values = {
//           email: credentials.email,
//         };

//         // найти пользователя в БД
//         const findUser = await prisma.user.findFirst({
//           where: values,
//         });

//         if (!findUser) {
//           return null;
//         }

//         // compare - функция из библиотеки bcrypt, которая сравнит пароль с закешированным паролем в БД
//         const isPasswordValid = await compare(credentials.password, findUser.password);

//         if (!isPasswordValid) {
//           return null;
//         }

//         // если пароль верный, но не подтвержден, то возвращаем null
//         if (!findUser.verified) {
//           return null;
//         }

//         return {
//           id: findUser.id,
//           email: findUser.email,
//           name: findUser.fullName,
//           role: findUser.role,
//         };
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     // функция singIn проверяет, через какой провайдер происходит авторизация
//     async signIn({ user, account }) {
//       try {
//         // если авторизация через провайдер Credentials, то дальше не проверяем ничего
//         if (account?.provider === 'credentials') {
//           return true;
//         }

//         // если авторизация через другой провайдер, то проверяем email пользователя. Если его нет, то отказать в авторизации
//         if (!user.email) {
//           return false;
//         }

//         // если email есть, то найти пользователя в БД
//         const findUser = await prisma.user.findFirst({
//           where: {
//             OR: [
//               // ИЛИ искать по providerId
//               { provider: account?.provider, providerId: account?.providerAccountId },
//               // или искать по email
//               { email: user.email },
//             ],
//           },
//         });

//         // если такой пользователь есть, то обновить его данные в БД
//         if (findUser) {
//           await prisma.user.update({
//             where: {
//               id: findUser.id,
//             },
//             data: {
//               provider: account?.provider,
//               providerId: account?.providerAccountId,
//             },
//           });

//           return true;
//         }

//         // если такого пользователя нет, то создать его
//         await prisma.user.create({
//           data: {
//             email: user.email,
//             // если у пользователя нет имени в акаунте провайдера, то создать имя по Id
//             fullName: user.name || 'User #' + user.id,
//             // сгенерировать пароль по id (лучше так не делать)
//             password: hashSync(user.id.toString(), 10),
//             // аккаунт с другого провайдера уже верифицирован
//             verified: new Date(),
//             provider: account?.provider,
//             providerId: account?.providerAccountId,
//           },
//         });

//         return true;
//       } catch (err) {
//         console.error('Error [SIGNIN]:', err);
//         return false;
//       }
//     },
//     // взять jwt-токен, найти по email из него пользователя в БД и добавить дополнительные данные о пользователе из БД в токен
//     async jwt({ token }) {
//       if (!token.email) {
//         return token;
//       }

//       const findUser = await prisma.user.findFirst({
//         where: {
//           email: token.email,
//         },
//       });

//       if (findUser) {
//         token.id = String(findUser.id);
//         token.email = findUser.email;
//         token.fullName = findUser.fullName;
//         token.role = findUser.role;
//       }

//       return token;
//     },
//     session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//       }

//       return session;
//     },
//   },
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
