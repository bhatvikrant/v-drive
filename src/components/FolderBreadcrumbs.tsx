import Link from "next/link"

// TS INTERFACES
import { IFolder, ROOT_FOLDER } from "src/hooks/useFolder"
interface Props {
    currentFolder: IFolder
}

const FolderBreadcrumbs: React.FC<Props> = (props) => {

    const { currentFolder } = props

    let path: any = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) {
        path = [...path, currentFolder.path].flat()
    }

    return (
        <div className="text-sm breadcrumbs">
            <ul>
                {path.flat().length > 0 && path.map((folder, idx) => (
                    <li key={idx}>
                        <Link href={folder.id ? `/folder/${folder.id}` : '/dashboard'}>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                {folder.name}
                            </a>
                        </Link>
                    </li>
                ))}

                {currentFolder && (
                    <li>
                        <a className='text-gray-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                            </svg>
                            {currentFolder.name}
                        </a>
                    </li>
                )}
            </ul>

        </div>
    )
}

export default FolderBreadcrumbs
