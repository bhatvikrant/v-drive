import Link from "next/link";

// SVGs
import FolderIcon from "../../public/svgs/folder.svg";

// TS INTERFACES
import { IFolder } from "src/hooks/useFolder"

interface Props {
    folder: IFolder
}

const Folder: React.FC<Props> = (props) => {

    const { folder } = props

    return <Link href={`/folder/${folder.id}`}>
        <a>
            <div className='flex items-center px-4 py-2 space-x-2 border-2 rounded-lg hover:opacity-75 '>
                <FolderIcon className='h-8 text-secondary' /> <p className='truncate max-w-[200px] text-accent'>{folder.name}</p>
            </div>
        </a>
    </Link>
}

export default Folder
