import styles from "../styles/Home.module.scss";
import Layout from "../components/Layout";
import React from "react";

const About = () => {
    return (
        <Layout title="Number Charts | About">
            <div className={styles.container}>
                <main className={styles.main}>
                    <p>About</p>
                </main>
            </div>
        </Layout>
    );
};

export default About;
