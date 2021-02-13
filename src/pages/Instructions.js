import { useEffect } from "react";
import Layout from "../components/Layout";

function Instructions() {
    useEffect(() => {
        document.title = 'Mars Exploration | Instructions';
    }, []);
    
    return (
        <Layout>
            Instructions
        </Layout>
    )
};

export default Instructions;
