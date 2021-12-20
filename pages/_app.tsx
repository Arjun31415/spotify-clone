import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import store from "../redux/store";
import { createWrapper } from "next-redux-wrapper";

function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);
