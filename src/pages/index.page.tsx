import { GetServerSideProps } from "next";

import { getSession } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession()
  // const router = useRouter()
  // if (typeof window === 'undefined') return null
  // console.log(session)
  // if (session) {
  //   router.push('/company')
  // }
  // router.push('/auth/login')
}
// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext,
// ) => {
//   return {
//     props: {
//       session: await getServerSession(ctx.req, ctx.res, authOptions),
//     },
//   }
// }
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  // const { 'next-auth.session-token': token } = parseCookies(ctx)
  const session = await getSession(ctx);
  console.log(session);
  if (session) {
    return {
      redirect: {
        destination: "/company",
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
