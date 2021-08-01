import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// CONTEXTS
import { useAuth } from "@/contexts/AuthContext";

// COMPONENTS
import Alert from "@/components/Reusables/Alert";
import Spinner from "@/components/Reusables/Spinner";

export default function Signup() {
	const router = useRouter();
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const cPasswordRef = useRef(null);

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const { signup } = useAuth();

	async function handleSubmit() {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const cPassword = cPasswordRef.current.value;

		if (!email) {
			setError("Email is required");
			return;
		}
		if (!password) {
			setError("Password is required");
			return;
		}
		if (password !== cPassword) {
			setError("Password's do not match");
			return;
		}

		try {
			setError("");
			setLoading(true);
			await signup(email, password);
			router.push("/dashboard");
		} catch {
			setError("Failed to create an account");
		}
		emailRef.current.value = "";
		passwordRef.current.value = "";
		cPasswordRef.current.value = "";
		setLoading(false);
	}

	return (
		<div className="min-h-screen hero bg-base-200">
			<div className="flex-col justify-center hero-content lg:flex-row">
				<div className="text-center lg:text-left">
					<h1 className="mb-5 text-5xl font-bold">V-DRIVE</h1>
					<p className="mb-5">
						Store, access, and share your files in one secure place.
					</p>
					<p className="mb-5 font-extralight">
						Store any and every file. Access files anytime, anywhere from your
						desktop and mobile devices. Control how files are shared.
					</p>
				</div>
				<div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
					<div className="card-body">
						<h2 className="mb-4 text-3xl font-bold text-center">Sign Up</h2>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								className="input input-bordered"
								ref={emailRef}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								ref={passwordRef}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Confirm Password</span>
							</label>
							<input
								type="password"
								placeholder="Confirm password"
								className="input input-bordered"
								ref={cPasswordRef}
								required
							/>
						</div>

						{error && <Alert message={error} type="error" className="mt-4" />}

						<div className="mt-6 form-control">
							<button
								className={`space-x-2 btn btn-primary ${
									loading ? "opacity-50" : ""
								}`}
								onClick={handleSubmit}
								disabled={loading}
							>
								<span>Sign Up</span> {loading && <Spinner />}
							</button>
						</div>
						<label className="my-4 text-center label-text-alt">
							Have an account?{" "}
							<Link href="/">
								<a className="link link-hover link-secondary">Login</a>
							</Link>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
