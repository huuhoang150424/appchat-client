
import Loading1 from "./loading/loading1";
import Message from "./message"

interface Props {
	allMessage?: any[];
	isLoading?: boolean;
	refContent?: any
}

const MessageContainer = ({ allMessage, isLoading,refContent }: Props) => {
	return (
		<div id="style-2" className=" w-[100%] h-[100%]  px-[12px] py-[20px]  overflow-hidden overflow-y-auto">
			{
				isLoading ? (<Loading1 className="mt-[160px] mx-auto " />) : (<div className=" flex flex-col gap-[10px] ">
					{
						allMessage?.map((message: any,index:number) => {
							return (
								<Message
									message={message}
									key={index}
								/>
							)
						})
					}
					<div ref={refContent} className="" /> 
				</div>)
			}
		</div>
	)
}
export default MessageContainer
