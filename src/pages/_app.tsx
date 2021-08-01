import type { AppProps /*, AppContext */ } from "next/app";

// GLOBAL STYLES
import "@/styles/globals.css";

// COMPONENTS
import Navbar from "@/components/Navbar";

// CONTEXTS
import { AuthProvider } from "@/contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Navbar />
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
