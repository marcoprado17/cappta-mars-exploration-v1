import { useEffect } from "react";
import Layout from "../components/Layout";

function Home() {
    useEffect(() => {
        document.title = 'Mars Exploration | Home';
    }, []);
    
    return (
        <Layout>
            Home
        </Layout>
    )
};

export default Home;
