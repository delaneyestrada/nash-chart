import styles from "../../styles/Home.module.scss";
import Layout from "../../components/Layout";
import React from "react";
import UploadToS3 from "../../components/UploadToS3";

const Charts = () => {
    return (
        <Layout title="Number Charts | Charts">
            <div className={styles.container}>
                <main className={styles.main}>
                    <UploadToS3 />
                </main>
            </div>
        </Layout>
    );
};

export default Charts;
