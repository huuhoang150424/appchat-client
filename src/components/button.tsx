
interface btnProps {
	textButton?: string;
	onClick?: any;
	className?: string;
	styleText?: string;
	type?: "button" | "submit" | "reset";
}

const Button = ({ textButton = '', onClick, className = "", styleText = "", type = "button" }: btnProps) => {
	const handleClick = onClick || (() => { })
	return (
		<button type={type} className={`${className}`} onClick={handleClick}>
			<span className={`${styleText}`}>{textButton}</span>
		</button>
	)
}
export default Button