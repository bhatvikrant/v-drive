import React, { useContext, useState, useEffect } from "react";
import firebase from "@/lib/firebase";

// Type definition for the 'value' object passed to AuthContext
type ContextValueType = {
	currentUser: firebase.User;
	login: (
		email: string,
		password: string,
	) => Promise<firebase.auth.UserCredential>;
	signup: (
		email: string,
		password: string,
	) => Promise<firebase.auth.UserCredential>;
	logout: () => Promise<void>;
	resetPassword: (email: string) => Promise<void>;
	updateEmail: (email: string) => Promise<void>;
	updatePassword: (password: string) => Promise<void>;
};

const AuthContext = React.createContext<ContextValueType | null>(null);

// Custom hook to use the AuthContext
export function useAuth() {
	return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
	const [loading, setLoading] = useState(true);

	const auth = firebase.auth();

	function signup(email: string, password: string) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email: string, password: string) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email: string) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email: string) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password: string) {
		return currentUser.updatePassword(password);
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value: ContextValueType = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
