import { getAccessToken, getSession, withApiAuthRequired, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSideProps } from "next";

export default function Home() {
    const { user } = useUser()

    return (
        <div>
            <h1>Hello</h1>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired();

/* PEGAR TOKEN async ({ req, res }) => {
    const token = await getAccessToken(req, res);
    console.log(token)
    return { props: {} }
}*/