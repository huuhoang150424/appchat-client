import "./style1.scss";

interface Props {
	className?: string
}

export default function Loading1({className}:Props) {
	return (
		/* From Uiverse.io by abrahamcalsin */
		<div className={`dot-spinner ${className}`}>
			<div className="dot-spinner__dot" />
			<div className="dot-spinner__dot" />
			<div className="dot-spinner__dot" />
			<div className="dot-spinner__dot" />
			<div className="dot-spinner__dot" />
			<div className="dot-spinner__dot" />
			<div className="dot-spinner__dot" />
			<div className="dot-spinner__dot" />
		</div>

	)
}
