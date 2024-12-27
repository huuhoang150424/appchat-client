import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../redux/store"
import { logoutUser, selectIsAuthenticated, selectUser } from "../redux/reducer/authReducer"
import { createConversation, findUser, getConversation } from "../data/api"
import Loading1 from "./loading/loading1"
import { useNavigate } from "react-router-dom"

interface Props {
	getUser?: any
}


const Navbar = ({getUser}:Props) => {
	const [clicked, setClicked] = useState(0)
	const [loading, setLoading] = useState(false)
	const navigate=useNavigate()
	const isAuthenticated=useSelector(selectIsAuthenticated)
	const user=useSelector(selectUser)
	const dispatch = useDispatch<AppDispatch>()
	const [keyword,setKeyword]=useState("")
	const [refreshConversation,setRefreshConversation]=useState(true)
	const [allConversation,setConversation]=useState<any[]>([]);
	const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [findUsers,setFindUsers]=useState([]);
	const format = (data: any) => {
		return data.map((conversation: any) => {
			const recipient = conversation.participants.find((participant: any) => participant._id !== user._id);
			return { ...recipient, conversationId: conversation._id }; // Kèm theo conversationId nếu cần
		});
	};
	
	//getAllConversation
	useEffect(() => {
		const getAllConversation = async () => {
			setLoading(true);
			try {
				const response = await getConversation(user._id);
				const dataFormat: any = format(response.data.allConversation);
				setConversation(dataFormat);
			} catch (err: any) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
	
		if (isAuthenticated) {
			getAllConversation();
		}
	}, [isAuthenticated, refreshConversation]);
	useEffect(() => {
		if (allConversation.length > 0) {
			getUser(allConversation[0],allConversation[0].conversationId);
		}
	}, [allConversation]);
	

	useEffect(() => {
		if (debounceTimeout.current) {
			clearTimeout(debounceTimeout.current);
		}

		debounceTimeout.current = setTimeout(async () => {
			if (keyword.trim() !== "") {
				setClicked(NaN)
				setLoading(true)
				try {
					const response = await findUser(keyword)
					setFindUsers(response.data.allUser)
				} catch (err: any) {
					console.log(err)
				} finally {
					setLoading(false)
				}
			} else {
				setFindUsers([]); 
			}
		}, 300); 
		return () => {
			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
			}
		}
	}, [keyword])


	//create conversation
	const conversation = async (receiverId:string) => {
		try {
			const response = await createConversation({
				senderId: user._id,
				receiverId: receiverId
			})
			console.log(response.data)
			return response.data
		} catch (err: any) {
			console.log(err)
		}
	}

	return (
		<div className="w-[40%] h-[100%] relative border-r-[0.6px] border-[#c0c0c0]">
			<div className="bg-white w-[100%] h-[100%] absolute inset-0"></div>
			<div className="p-[20px] relative  z-10">
				<form method="POST" className="flex items-center gap-[15px] ">
					<input
						className="outline-none px-[14px] py-[8px] text-textColor rounded-[8px] border border-[#cecece] shadow-sm "
						value={keyword}
						placeholder="Search..."
						type="text"
						onChange={(e:any) => setKeyword(e.target.value)}
					/>
					<button onClick={(e:any)=>{e.preventDefault()}} className="w-[40px] h-[40px] cursor-pointer bg-[#91cce7] flex items-center justify-center rounded-[50%] shadow-xl border hover:bg-slate-500 hover:bg-opacity-55 transition-all duration-200 ease-in-out ">
						<i className="fa-solid fa-magnifying-glass text-white"></i>
					</button>
				</form>
				<div className="w-[85%] h-[1px] bg-[#c0c0c0] opacity-70 mt-[20px] mx-auto"></div>
				
				{
					loading ? (<Loading1 className="my-[165px] mx-auto "/>):(				<ul id="style-2" className="mt-[20px] h-[320px] overflow-hidden overflow-y-auto ">
						{
							((findUsers.length>0 && keyword!=="") ? findUsers:allConversation)
							.map((item:any, index: number) => {
								return (
									<li
										key={index}
										onClick={async () => {
											setClicked(index);
											getUser(item,item.conversationId);
											setKeyword("");
											const isExistsConversation = allConversation.some((conv: any) => conv._id === item._id);
											if (!isExistsConversation) {
												await conversation(item._id);
												setRefreshConversation(!refreshConversation);
											}
										}}
										className={`flex items-center ${clicked === index ? "bg-[#c1e8fa] border-r-[4px] border-[#2789b7]" : "hover:bg-slate-400 hover:bg-opacity-20"} cursor-pointer gap-3 px-[10px] py-[6px] rounded-[2px] border-b-[1px] border-gray-200  transition-all duration-200 ease-in-out`}
									>
										<div className="w-[40px] h-[40px] rounded-[50%]  overflow-hidden   ">
											<img
												src={item?.avatar}
												alt="user"
												className="w-full h-full  rounded-[50%] border-gray-200 object-cover"
											/>
										</div>
										<h2 className="text-[16px] font-[500] text-textColor ">{item?.username}</h2>
									</li>
								)
							})
						}
					</ul>)
				}

				<div onClick={() => {dispatch(
					logoutUser()) 
					navigate('/sign')
				} }
					className="mt-[25px] "
				>
					<i className="fa-solid fa-right-from-bracket text-[25px] text-[#7e7e7e] cursor-pointer hover:opacity-80 transition-all duration-200 ease-in-out"></i>
				</div>
			</div>
		</div>
	)
}
export default Navbar