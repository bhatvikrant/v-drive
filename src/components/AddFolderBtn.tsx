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

	const [folderName, setFolderName] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	function closeCreateFolderModal() {
		setError(null)
		const checkboxEl = document.getElementById("create-folder-modal");
		(checkboxEl as HTMLInputElement).checked = false;
	}

	function createFolder() {
		if (currentFolder == null) return;
		if (!folderName) {
			setError('Folder name cannot be empty')
			return
		};
		setError(null)

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
		<>
			<div data-tip="Create folder" className="tooltip">
				<label
					htmlFor={"create-folder-modal"}
					className="btn btn-outline btn-accent modal-button"
				>
					<CreateFolderIcon />
				</label>
			</div>
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
							className={`input ${error ? 'input-error' : 'input-bordered'}`}
							value={folderName}
							onChange={e => setFolderName(e.target.value)}
						/>
						{error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
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
		</>
	);
};

export default AddFolderBtn;
