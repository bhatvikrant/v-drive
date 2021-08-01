import { alertIconsMap } from "./data";

// TS INTERFACES
interface Props {
	type?: "success" | "error" | "warning" | "info";
	message: string;
	className?: string;
}

const Alert: React.FC<Props> = ({
	type = "success",
	message,
	className = "",
}) => {
	return (
		<div className={`alert ${alertIconsMap[type].className} ${className}`}>
			<div className="flex-1">
				{alertIconsMap[type].icon}
				<label>{message}</label>
			</div>
		</div>
	);
};

export default Alert;
