import { ChangeEvent, useState } from "react";

// FIREBASE
import firebase, { db } from "@/lib/firebase";

// SVGs
import AddDocumentIcon from "../../public/svgs/add-document.svg";

// CONTEXTS
import { useAuth } from "@/contexts/AuthContext";

// UUID
import { v4 as uuidV4 } from "uuid";

// TS INTERFACES
import { IFolder, ROOT_FOLDER } from "src/hooks/useFolder";
interface Props {
	currentFolder: IFolder;
}

const AddFileBtn: React.FC<Props> = props => {
	const { currentFolder } = props;

	const { currentUser } = useAuth();

	const [uploadingFiles, setUploadingFiles] = useState([]);

	function handleUpload(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files[0];

		if (currentFolder == null || file == null) return;

		const id = uuidV4();

		// Set loading state
		setUploadingFiles(prev => [
			...prev,
			{ id, name: file.name, progress: 0, error: false },
		]);

		console.log("currentFolder:", currentFolder);

		const filePath =
			currentFolder === ROOT_FOLDER
				? `${currentFolder.path.join("/")}/${file.name}`
				: `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;

		console.log("filePath:", filePath);

		// 1. Upload to firebase storage
		const storage = firebase.storage();

		const uploadTask = storage
			.ref(`/files/${currentUser.uid}/${filePath}`)
			.put(file);

		uploadTask.on(
			"state_changed",
			snapshot => {
				// Upload progress
				const progress = snapshot.bytesTransferred / snapshot.totalBytes;
				setUploadingFiles(prev => {
					return prev.map(file => {
						if (file.id === id) {
							return { ...file, progress };
						}

						return file;
					});
				});
			},
			() => {
				//  Error
				setUploadingFiles(prev => {
					return prev.map(file => {
						if (file.id === id) {
							return { ...file, error: true };
						}

						return file;
					});
				});
			},
			() => {
				//  Upload complete

				setUploadingFiles(prev => {
					return prev.filter(file => file.id !== id);
				});

				uploadTask.snapshot.ref.getDownloadURL().then(url => {
					console.log("url:", url);

					db.files
						.where("name", "==", file.name)
						.where("userId", "==", currentUser.uid)
						.where("folderId", "==", currentFolder.id)
						.get()
						.then(existingFiles => {
							const existingFile = existingFiles[0];

							if (existingFile) {
								// If file with same name already exists then update the url
								existingFile.ref.update({ url });
							} else {
								// else upload the file
								db.files.add({
									url,
									name: file.name,
									createdAt: db.getCurrentTimeStamp(),
									folderId: currentFolder.id,
									userId: currentUser.uid,
								});
							}
						});
				});
			},
		);
	}

	return (
		<>
			<div data-tip="Upload file" className="tooltip">
				<label className={`space-x-2 btn btn-outline btn-accent`}>
					<input type="file" onChange={handleUpload} hidden accept="image/*" value='' />
					<AddDocumentIcon />
				</label>
			</div>

			{uploadingFiles.length > 0 &&
				(<div className={`alert alert-info fixed bottom-6 md:right-10 right-3`}>
					<div className="flex-1">
						{uploadingFiles.map(file => (
							<div key={file.id}>
								<div className="p-3 space-y-2 md:p-4 artboard phone">
									<div className="flex justify-between">

										<p className='truncate max-w-[200px]'>{file.name}</p>
										<p>
											{file.error ? <span className='text-red-500'>Error</span> : `${Math.round(file.progress) * 100}%`}
										</p>
									</div>
									<progress className={`progress ${file.error ? 'progress-error' : 'progress-success'}`} value={file.progress * 100} max="100" />
								</div>
							</div>
						))}
					</div>
				</div>)}
		</>
	);
};

export default AddFileBtn;
