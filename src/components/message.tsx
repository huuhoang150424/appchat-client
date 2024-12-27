import { useSelector } from "react-redux";
import { selectUser } from "../redux/reducer/authReducer";

interface Props {
	message?: any;
	className?: string;
	type?: string
}


const Message = ({ message }: Props) => {
	const userSender = useSelector(selectUser);
	return (
		<div className={`${message.senderId._id===userSender._id?"self-end":"self-start"}  `}>
			<div className={`w-[100%] flex  ${message.senderId._id===userSender._id?"flex-row-reverse":""} gap-[10px]`}>
				<div className="w-[30px] h-[30px] rounded-[50%] border border-gray-200 ">
					<img
						className="w-full h-full object-cover rounded-[50%] cursor-pointer "
						src={`${message.senderId._id===userSender._id?userSender.avatar:message.senderId.avatar}`}
						alt="user"
					/>
				</div>
				<div className="h-auto bg-blue-400 rounded-[6px] px-[8px] py-[4px] ">
					<p className="text-white text-[14px] font-[500] leading-[21px] ">
						{message.content}
					</p>
				</div>

			</div>
		</div>
	)
}
export default Message
