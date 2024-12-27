import { useEffect, useRef, useState } from "react";
import Button from "./button"
import MessageContainer from "./message-container"
import { getAllMessage, sendMessage } from "../data/api";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectUser } from "../redux/reducer/authReducer";
import { io } from "socket.io-client";
let socket: any;

interface Props {
	user?: any;
	conversationId?: string
}

const Main = ({ user, conversationId }: Props) => {
	const userSend=useSelector(selectUser)
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const [allMessage, setAllMessage] = useState<any[]>([])
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			console.log(messagesEndRef)
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	};
	//connect socket
	useEffect(() => {
		socket = io('http://localhost:3000', {
			query: { userId: userSend._id },
			reconnectionAttempts: 5,
			reconnectionDelay: 2000,
		})
		return () => {
			socket.disconnect()
		}
	}, [])
	useEffect(() => {
		if (socket && userSend) {
			socket.emit('setUserId', userSend._id);
		}
	}, [socket, userSend]);

	useEffect(() => {
		const getAllConversation = async () => {
			setLoading(true);
			try {
				const response = await getAllMessage(conversationId ?? "");
				setAllMessage(response.data.allMessage); 
			} catch (err: any) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
	
		if (isAuthenticated && conversationId && socket) {
			socket.emit('joinConversation', conversationId);
			getAllConversation();
		}
		return () => {
			socket.emit('leaveConversation', conversationId);
		};
	}, [isAuthenticated, conversationId]);
	useEffect(() => {
		if (allMessage?.length > 0) {
			scrollToBottom(); 
		}
	}, [allMessage]);  


	useEffect(() => {
		if (socket) {
			socket.on('newMessage', (newMessage: any) => {
				setAllMessage((prevMessages) => {
					return [...prevMessages, newMessage];
				});
				scrollToBottom(); 
			});
		}
		return () => {
			if (socket) {
				socket.off('newMessage');
			}
		};
	}, [socket]);
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); 
		if (!message.trim()) return; 
		const newMessage = {
			conversationId,
			senderId: userSend,
			content: message,
			receiverId: user._id,
			createdAt: new Date().toISOString(), 
		};
		try {
			await sendMessage(conversationId, {
				senderId: userSend._id,
				content: message,
				receiverId: user._id,
			});
			setAllMessage((prevMessages) => [...prevMessages, newMessage]);
			socket.emit('newMessage', newMessage);
			setMessage('');
			scrollToBottom();

		} catch (error) {
			console.error('Error sending message:', error);
		}
	};
	
	return (
		<div className="w-[60%] h-[100%] bg-[#f2faff]">

			<div className="w-full h-[40px] bg-slate-400 flex items-center gap-[10px]  px-[12px] ">
				<span className="text-gray-100 ">to: </span>
				<strong className="text-textColor ">{user?.username}</strong>
			</div>
			<div className="bg-red-200 w-[100%] h-[400px] ">
				<MessageContainer
					allMessage={allMessage}
					isLoading={loading}
					refContent={messagesEndRef}
				/>
			</div>
			<div>
				<form
					method="POST"
					className="flex gap-[15px] px-[12px] pt-[8px]"
					onSubmit={handleSubmit}
				>
					<input
						className="w-[85%] px-[12px] py-[8px] outline-none border-[0.6px] border-[#cecece] rounded-[8px] shadow-sm"
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Type your message"
					/>
					<Button
						textButton="Gửi"
						type="submit"
						styleText="text-white"
						className="px-[12px] py-[8px] bg-[#3b82f6] rounded-[14px] flex items-center justify-center hover:opacity-70 transition-all duration-200 ease-in-out"
					/>
				</form>
			</div>
		</div>
	)
}
export default Main