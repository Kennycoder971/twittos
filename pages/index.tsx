import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useGetCurrentUserQuery } from "@/store";

export default function Home() {
  const { data: user, error, isFetching } = useGetCurrentUserQuery("");

  if (isFetching) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>An error occured</h1>;
  }

  return (
    <>
      <h1>Hello {user?.name} </h1>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
