import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Script from "next/script";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";

function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
			<Script
				src="https://kit.fontawesome.com/2bb60e7899.js"
				crossOrigin="anonymous"
			/>
		</Provider>
	);
}
const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
