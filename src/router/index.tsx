import NotfoundScreen from "../screen/notfoundScreen";
import Login from "../screen/loginScreen";
import Register from "../screen/registerScreen";
import Home from "../screen/homeScreen";

export const publicRouter: any[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/register",
		element: <Register />,
	},
	{
		path: "/sign",
		element: <Login />,
	},
	{
		path: "*",
		element: <NotfoundScreen />,
	},
];
