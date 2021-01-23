import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../utils/auth/auth-service";
import { setUserCookie } from "../utils/auth/userCookies";
import { mapUserData } from "../utils/auth/mapUserData";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../store/auth/action";

// Init the Firebase app.
initFirebase();

const FirebaseAuth = ({ dispatch }) => {
    const firebaseAuthConfig = {
        signInFlow: "popup",
        // Auth providers
        // https://github.com/firebase/firebaseui-web#configure-oauth-providers
        signInOptions: [
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false,
                fullLabel: "Email Address",
            },
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                fullLabel: "Google",
                customParameters: {
                    // Forces account selection even when one account
                    // is available.
                    prompt: "select_account",
                },
            },
            {
                provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                fullLabel: "Facebook",
            },
        ],
        signInSuccessUrl: "/",
        credentialHelper: "none",
        callbacks: {
            signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
                const userData = await mapUserData(user);
                setUserCookie(userData);
                console.log("test");
                dispatch({ type: "LOGIN" });
            },
        },
    };
    return (
        <div>
            <StyledFirebaseAuth
                uiConfig={firebaseAuthConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FirebaseAuth);
