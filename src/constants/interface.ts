export interface router {
	path: string;
	element: JSX.Element;
}


export interface registerData {
	username: string;
	name: string;
	password: string;
	confirmPassword: string;
	gender: string;
}
export interface signData {
	username: string;
	password: string;
}
