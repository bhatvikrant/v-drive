import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

// COMPONENTS
import AddFolderBtn from "@/components/AddFolderBtn";

// CONTEXT
import { useAuth } from "@/contexts/AuthContext";

// CUSTOM HOOKS
import useFolder from "src/hooks/useFolder";

// SVGs
import AddDocumentIcon from "../../public/svgs/add-document.svg";

// TS INTERFACES
interface Props {}

const Dashboard: React.FC<Props> = props => {
	const {} = props;

	const router = useRouter();
	const { currentUser } = useAuth();

	useLayoutEffect(() => {
		if (!currentUser) {
			router.push("/");
		}
	}, [currentUser, router]);

	const folderState = useFolder("VKETDsxOCYeaCRqJN2rP");
	console.log("folderState:", folderState);

	return (
		<div className="min-h-screen p-4 bg-base-200">
			<div className="flex space-x-2">
				<div data-tip="Upload file" className="tooltip">
					<button
						className={`space-x-2 btn btn-outline btn-accent`}
						// onClick={handleSubmit}
					>
						<AddDocumentIcon />
					</button>
				</div>

				<AddFolderBtn currentFolder={folderState.folder} />
			</div>
		</div>
	);
};

export default Dashboard;
