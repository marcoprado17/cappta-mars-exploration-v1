import { useEffect } from "react";
import Layout from "../components/Layout";

function Docs() {
    useEffect(() => {
        document.title = 'Mars Exploration | Docs';
    }, []);
    
    return (
        <Layout>
            Docs
        </Layout>
    )
};

export default Docs;
