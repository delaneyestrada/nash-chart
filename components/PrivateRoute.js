import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

const PrivateRoute = ({ children, isLoggedIn }) => {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/");
        }
    }, []);

    return <React.Fragment>{isLoggedIn ? children : ""}</React.Fragment>;
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, null)(PrivateRoute);
