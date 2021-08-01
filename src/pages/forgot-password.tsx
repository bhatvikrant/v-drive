import { useRef, useState } from "react";
import Link from "next/link";

// CONTEXTS
import { useAuth } from "@/contexts/AuthContext";

// COMPONENTS
import Alert from "@/components/Reusables/Alert";
import Spinner from "@/components/Reusables/Spinner";

export default function ForgotPassword() {
	const emailRef = useRef(null);

	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const { resetPassword } = useAuth();

	async function handleSubmit() {
		const email = emailRef.current.value;

		if (!email) {
			setError("Email is required");
			return;
		}

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(email);
			setMessage("Check your inbox for further instructions");
		} catch {
			setError("Failed to reset password");
		}
		emailRef.current.value = "";
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
						<h2 className="mb-4 text-3xl font-bold text-center">
							Password Reset
						</h2>
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

						{error && <Alert message={error} type="error" className="mt-4" />}
						{message && <Alert message={message} className="mt-4" />}

						<div className="mt-6 form-control">
							<button
								className={`space-x-2 btn btn-primary ${
									loading ? "opacity-50" : ""
								}`}
								onClick={handleSubmit}
								disabled={loading}
							>
								<span>Reset Password</span> {loading && <Spinner />}
							</button>
						</div>

						<br />

						<label className="my-4 text-center label-text-alt">
							Have an account?{" "}
							<Link href="/">
								<a className="link link-hover link-secondary">Login</a>
							</Link>
						</label>
						<label className="my-4 text-center label-text-alt">
							Need an account?{" "}
							<Link href="/signup">
								<a className="link link-hover link-secondary">Sign Up</a>
							</Link>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
