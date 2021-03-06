// COMPONENTS
import AddFolderBtn from "./AddFolderBtn";
import Folder from "./Folder";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileBtn from "./AddFileBtn";
import File from "./File";

// CUSTOM HOOKS
import useFolder from "src/hooks/useFolder";

// TS INTERFACES
interface Props {
	folderId: string;
}

const FilesAndFoldersDisplay: React.FC<Props> = props => {
	const { folderId } = props;

	const folderState = useFolder(folderId);

	return (
		<div className="min-h-screen p-8 bg-base-200">
			<div className="flex items-center justify-between sm:pr-6">
				<FolderBreadcrumbs currentFolder={folderState.folder} />

				<div className="flex gap-2">
					<AddFileBtn currentFolder={folderState.folder} />
					<AddFolderBtn currentFolder={folderState.folder} />
				</div>
			</div>
			{folderState.childFolders.length === 0 && folderState.childFiles.length === 0 && <div className='grid px-8 py-16 my-8 border rounded-md place-items-center'>
				<p className='italic font-light text-gray-400'>Create a Folder or Upload a File to get started</p>
			</div>}
			<div className="py-4">
				{folderState.childFolders.length > 0 && (
					<div className="flex flex-wrap gap-4">
						{folderState.childFolders.map(childFolder => (
							<div key={childFolder.id}>
								<Folder folder={childFolder} />
							</div>
						))}
					</div>
				)}

				{folderState.childFolders.length > 0 &&
					folderState.childFiles.length > 0 && <hr className='my-8' />}

				{folderState.childFiles.length > 0 && (
					<div className="flex flex-wrap justify-center gap-4 mt-8 sm:justify-start">
						{folderState.childFiles.map(childFile => (
							<div key={childFile.id}>
								<File file={childFile} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default FilesAndFoldersDisplay;
