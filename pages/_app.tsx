import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import store from "../redux/store";
import withRedux from "next-redux-wrapper";

function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
const makeStore = () => store;

export default withRedux(makeStore)(App);
