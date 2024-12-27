import "./style.scss"

interface Props {
	className?:string
}

export default function Loading({className}:Props) {
	return (
		/* From Uiverse.io by mobinkakei */
		<div className={`wrapper ${className}` }>
			<div className="circle" />
			<div className="circle" />
			<div className="circle" />
			<div className="shadow" />
			<div className="shadow" />
			<div className="shadow" />
		</div>

	)
}
