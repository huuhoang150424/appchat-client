import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar"
import Main from "../components/main"
import { selectIsAuthenticated } from "../redux/reducer/authReducer"



const Home = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const [receivedUser,setReceivedUser]=useState(null)
	const [conversationId,setConversationId]=useState("")
	const navigate = useNavigate()
	useEffect(() => {
		if (!isAuthenticated) navigate('/sign')
	}, [isAuthenticated])

	const getUser=(user:any,conversationId:string)=>{
		setConversationId(conversationId);
		setReceivedUser(user);
	}



	return (
		<div className="flex justify-center">
			<div className="w-[800px] h-[500px] flex overflow-hidden mt-[100px] fixed rounded-[8px] shadow-md">
				<Navbar 
					getUser={getUser}
				/>
				<Main 
					conversationId={conversationId}
					user={receivedUser}
				/>
			</div>
		</div>
	)
}
export default Home
