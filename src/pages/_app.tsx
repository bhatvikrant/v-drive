import type { AppProps /*, AppContext */ } from "next/app";

// GLOBAL STYLES
import "@/styles/globals.css";

// COMPONENTS
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// CONTEXTS
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Navbar />
			<Component {...pageProps} />
			<Footer />
		</AuthProvider>
	);
}

export default MyApp;
