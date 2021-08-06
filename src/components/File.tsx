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
		<div className="flex flex-row items-center justify-center border rounded w-72 sm:w-64">
			<Image
				src={file.url}
				alt={file.name}
				height="150"
				width="250"
				className="object-cover rounded-md"
			/>

			<a
				className="p-2 text-gray-500 truncate w-72 sm:w-64 link link-hover"
				href={file.url}
				target="_blank"
				rel="noreferrer"
			>
				{file.name}
			</a>

			<a href={file.url} download className="p-2 cursor-pointer">
				<DownloadIcon />
			</a>
		</div>
	);
};

export default File;
