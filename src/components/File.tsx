// TS INTERFACES
interface Props {
	file: any;
}

const File: React.FC<Props> = props => {
	const { file } = props;

	return (
		<div>
			<a href={file.url} target="_blank" rel="noreferrer">
				{file.name}
			</a>
		</div>
	);
};

export default File;
