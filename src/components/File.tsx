import Image from "next/image";
import Link from "next/link";

// SVGs
import DownloadIcon from "../../public/svgs/download.svg";

// TS INTERFACES
interface Props {
	file: any;
}

const File: React.FC<Props> = props => {
	const { file } = props;
	console.log("file:", file);

	return (
		<div className="p-2 overflow-hidden border rounded">
			<Image
				src={file.url}
				alt={file.name}
				height="200"
				width="200"
				className="object-cover rounded-md"
			/>

			<a
				className="link link-hover"
				href={file.url}
				target="_blank"
				rel="noreferrer"
			>
				<p className='w-[200px] truncate text-gray-500 text-center mt-2'>
					{file.name}
				</p>
			</a>
			{/* <a href={file.url} download className="p-2 cursor-pointer">
				<DownloadIcon />
			</a> */}
		</div>
	);
};

export default File;
