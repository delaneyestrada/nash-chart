import styles from "../../styles/Home.module.scss";
import Layout from "../../components/Layout";
import React from "react";
import { useRouter } from "next/router";

const Home = () => {
    const router = useRouter();
    const query = router.query;

    return (
        <Layout title={`Number Charts | Chart ${query.chart}`}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <p>Chart {query.chart}</p>
                </main>
            </div>
        </Layout>
    );
};

export default Home;
