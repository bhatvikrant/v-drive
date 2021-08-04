import { useRouter } from "next/router";

// CONTEXT
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
	const router = useRouter();

	const { currentUser, logout } = useAuth();
	// console.log("currentUser:", currentUser);

	const handleLogout = async () => {
		console.log("user logged out:");
		try {
			await logout();
			router.push("/");
		} catch (err) {
			console.log("Failed to log out", err);
		}
	};

	return (
		<div className="mb-2 shadow-lg navbar bg-neutral text-neutral-content">
			<div className="flex-none hidden lg:flex">
				<button className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</button>
			</div>
			<div
				className="flex-1 hidden px-2 mx-2 cursor-pointer lg:flex"
				onClick={() => {
					if (currentUser) {
						router.push("/dashboard");
					} else {
						router.push("/");
					}
				}}
			>
				<span className="text-lg font-bold">V-DRIVE</span>
			</div>
			{/* <div className="flex-1 lg:flex-none">
				<div className="form-control">
					<input
						type="text"
						placeholder="Search"
						className="input input-ghost"
					/>
				</div>
			</div>
			<div className="flex-none">
				<button className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						></path>
					</svg>
				</button>
			</div>
			<div className="flex-none">
				<button className="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-6 h-6 stroke-current"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						></path>
					</svg>
				</button>
			</div> */}

			{currentUser && (
				<div className="flex-none">
					<div className="dropdown dropdown-end">
						<div className="avatar">
							<div
								className="w-10 h-10 m-1 rounded-full cursor-pointer"
								tabIndex={0}
							>
								<img src="https://i.pravatar.cc/500?img=32" />
							</div>
						</div>
						<ul className="text-black shadow menu dropdown-content bg-base-100 rounded-box w-52">
							<button onClick={() => handleLogout()}>
								<li>
									<a>Logout</a>
								</li>
							</button>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Navbar;
