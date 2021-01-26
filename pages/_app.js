import { useStore } from "../store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CloudinaryContext } from "cloudinary-react";
import CloudinaryConfig from "../utils/config/cloudinary";
import "../styles/globals.scss";

export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);
    const persistor = persistStore(store, {}, function () {
        persistor.persist();
    });

    return (
        <Provider store={store}>
            <PersistGate loading={<div>loading</div>} persistor={persistor}>
                <CloudinaryContext
                    cloudName={CloudinaryConfig.cloud_name}
                    uploadPreset={CloudinaryConfig.upload_preset}
                >
                    <Component {...pageProps} />
                </CloudinaryContext>
            </PersistGate>
        </Provider>
    );
}
