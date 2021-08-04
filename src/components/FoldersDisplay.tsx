// COMPONENTS
import AddFolderBtn from "@/components/AddFolderBtn";
import Folder from "@/components/Folder";

// CUSTOM HOOKS
import useFolder from "src/hooks/useFolder";

// SVGs
import AddDocumentIcon from "../../public/svgs/add-document.svg";

// TS INTERFACES
interface Props {
    folderId: string
}

const FoldersDisplay: React.FC<Props> = (props) => {

    const { folderId } = props

    const folderState = useFolder(folderId);
    console.log("folderState:", folderState);

    return <div className="min-h-screen p-4 bg-base-200">
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
        <div className='py-4'>
            {folderState.childFolders.length > 0 && (
                <div className="flex gap-4">
                    {folderState.childFolders.map(childFolder => (
                        <div key={childFolder.id}>
                            <Folder folder={childFolder} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
}

export default FoldersDisplay
