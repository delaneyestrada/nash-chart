import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import LoginForm from "../components/LoginForm";
import Layout from "../components/Layout";

import styles from "../styles/Login.module.scss";
const Login = () => {
    return (
        <Layout>
            <Container
                fluid="sm"
                className="d-flex flex-column h-100 justify-content-center align-items-center"
            >
                <Card bg="light" className={styles.card}>
                    <Card.Body>
                        <LoginForm />
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    );
};

export default Login;
