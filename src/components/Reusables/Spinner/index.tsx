// TS INTERFACES
interface Props {
	className?: string;
}

const Spinner: React.FC<Props> = props => {
	const { className = "" } = props;

	return (
		<div
			style={{ borderTopColor: "transparent" }}
			className={`w-6 h-6 border-4 border-white border-solid rounded-full animate-spin ${className}`}
		/>
	);
};

export default Spinner;
