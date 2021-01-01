export default function Home({sidebar}) {



    return (
        <>
            <h1>Home page</h1>
        </>
    )
}

Home.getInitialProps = async (ctx) => {
    return {
        sidebar: {
            left: false
        }
    }
};
