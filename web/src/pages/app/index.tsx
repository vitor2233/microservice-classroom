import { useGetProductsQuery } from "@/graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "@/graphql/generated/page";
import { withApollo } from "@/lib/withApollo";
import { gql, useQuery } from "@apollo/client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSideProps } from "next";

function Home({ data }) {
    const { user } = useUser();

    return (
        <div>
            <h1>Hello</h1>
            <pre>
                {JSON.stringify(data.products, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
    getServerSideProps: async (ctx) => {
        return getServerPageGetProducts({}, ctx)
    }
});

export default withApollo(
    ssrGetProducts.withPage()(Home)
);