import { useMeQuery } from "@/graphql/generated/graphql";
import { ssrGetProducts } from "@/graphql/generated/page";
import { withApollo } from "@/lib/withApollo";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSideProps } from "next";

function Home({ data }) {
    const { user } = useUser();
    const { data: me } = useMeQuery()

    return (
        <div className="text-violet-500">
            <h1>Hello</h1>
            <pre>
                {JSON.stringify(me, null, 2)}
            </pre>

            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    getServerSideProps: async (ctx) => {
        return { props: {} }
    }
});

export default withApollo(
    ssrGetProducts.withPage()(Home)
);