import { useState } from "react";

// CONTEXT
import { useAuth } from "@/contexts/AuthContext";

// SVGs
import CreateFolderIcon from "../../public/svgs/create-folder.svg";

// FIREBASE
import { db } from "@/lib/firebase";

// TS INTERFACES
import { IFolder, ROOT_FOLDER } from "src/hooks/useFolder";

interface Props {
	currentFolder: IFolder;
}

const AddFolderBtn: React.FC<Props> = props => {
	const { currentFolder } = props;

	const { currentUser } = useAuth();

	const [folderName, setFolderName] = useState("");

	function closeCreateFolderModal() {
		const checkboxEl = document.getElementById("create-folder-modal");

		(checkboxEl as HTMLInputElement).checked = false;
	}

	function createFolder() {
		if (currentFolder == null) return;

		const path: any =
			currentFolder.path.length === 0 ? [] : [{ ...currentFolder.path }];

		if (currentFolder !== ROOT_FOLDER) {
			path.push({ name: currentFolder.name, id: currentFolder.id });
		}

		db.folders.add({
			name: folderName,
			parentId: currentFolder.id,
			userId: currentUser.uid,
			path,
			createdAt: db.getCurrentTimeStamp(),
		});

		closeCreateFolderModal();
		setFolderName("");
	}

	return (
		<div data-tip="Create folder" className="tooltip">
			<label
				htmlFor={"create-folder-modal"}
				className="btn btn-outline btn-accent modal-button"
			>
				<CreateFolderIcon />
			</label>
			<input
				type="checkbox"
				id={"create-folder-modal"}
				className="modal-toggle"
			/>
			<div className="modal">
				<div className="modal-box">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Folder Name</span>
						</label>
						<input
							type="text"
							placeholder="Folder name"
							className="input input-bordered"
							value={folderName}
							onChange={e => setFolderName(e.target.value)}
						/>
					</div>

					<div className="modal-action">
						<button className="btn btn-primary" onClick={createFolder}>
							Create
						</button>
						<button
							onClick={() => {
								closeCreateFolderModal();
								setFolderName("");
							}}
							className="btn"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddFolderBtn;
