import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Premium from "../components/Premium";

export default function PremiumPage() {
	return (
		<>
			<Navbar />
			<Premium />
			<Footer classes={`fixed inset-x-0 bottom-0`} />
		</>
	);
}
