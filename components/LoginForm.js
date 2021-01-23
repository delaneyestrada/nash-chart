import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { vestResolver } from "@hookform/resolvers/vest";
import vest, { test, enforce } from "vest";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../store/auth/action";
import { auth } from "../utils/auth/auth-service";
import { useRouter } from "next/router";

import styles from "../styles/Login.module.scss";

const LoginForm = ({ login }) => {
    const router = useRouter();

    const schema = vest.create((data = {}) => {
        test("email", "Email is required", () => {
            enforce(data.email).isNotEmpty();
        });

        test("password", "Password is required", () => {
            enforce(data.password).isNotEmpty();
        });
    });

    const {
        register,
        errors,
        formState: { touched },
        handleSubmit,
    } = useForm({
        resolver: vestResolver(schema),
    });

    const onSubmit = (data) => {
        login(data.email, data.password)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={styles.form}
        >
            <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    ref={register}
                    isInvalid={touched.email && errors.email}
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                        <small className={styles.error}>{message}</small>
                    )}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register}
                    isInvalid={touched.password && errors.password}
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                        <small className={styles.error}>{message}</small>
                    )}
                />
            </Form.Group>
            <Form.Group controlId="rememberMe">
                <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    name="rememberMe"
                    ref={register}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Log In
            </Button>
        </Form>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(LoginForm);
