import React from "react";
import Meta from "./Meta";
import NavbarComponent from "./NavbarComponent";
import { fetchUser } from "../store/auth/action";
import { connect } from "react-redux";
import useLayoutEffect from "../utils/use-isomorphic-layout-effect";

const Layout = ({ title, children, fetchUser }) => {
    useLayoutEffect(() => {
        fetchUser();
    }, []);
    return (
        <React.Fragment>
            <Meta title={title} />
            <NavbarComponent />
            {children}
        </React.Fragment>
    );
};

export default connect(null, { fetchUser })(Layout);
