import { useFormik } from "formik"
import Button from "../components/button"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { selectIsAuthenticated, selectIsError, selectIsLoading, selectMessage } from "../redux/reducer/authReducer"
import Loading from "../components/loading/loading"
import { signUser } from "../redux/action/auth";
import { AppDispatch } from "../redux/store";

const validateLogin = Yup.object().shape({
	email: Yup.string()
		.required("Tên không được để trống")
		.email("Trường này phải là email"),
	password: Yup.string().required("Mật khẩu không được để trống")
});


const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const isError = useSelector(selectIsError);
	const message = useSelector(selectMessage);
	const isLoading = useSelector(selectIsLoading);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const handleSubmit = () => {
		console.log("Form submitted with values: ", formik.values);
		const payload: any = formik.values;
		dispatch(signUser(payload));
	}
	useEffect(() => {
		if (isAuthenticated) navigate('/')
	}, [isAuthenticated])
	const formik = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		onSubmit: handleSubmit,
		validationSchema: validateLogin
	})
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
		if (isError) {
			alert(message)
		}
	}, [isAuthenticated])

	return (
		<div className="flex justify-center mt-[80px] ">
			<div className="w-[300px] h-[100%] bg-[#e7d9d9]  mt-[100px] rounded-[6px] shadow-sm p-[20px] ">
				<h1 className="text-textColor text-[20px] font-[400] leading-[30px] text-center">Đăng nhập</h1>
				<div className="w-full h-[1px] bg-iconColor rounded-[2px] mt-[10px]"></div>
				{
					isLoading ? (<Loading className="mx-auto my-[80px] " />) : (<form onSubmit={formik.handleSubmit} method="POST" className="mt-[20px] flex flex-col gap-[5px]">
						<div className="flex flex-col gap-[10px] ">
							<label htmlFor="email" className="text-[12px] text-textColor">Email</label>
							<input
								value={formik.values.email}
								className="outline-none border border-iconColor rounded-[4px] px-[14px] py-[8px] text-textColor"
								placeholder="Vui lòng nhập họ và tên"
								onChange={formik.handleChange}
								id="email"
								name="email"
							/>
						</div>
						<div className="flex flex-col gap-[10px] ">
							<label htmlFor="password" className="text-[12px] text-textColor">Mật khẩu</label>
							<input
								value={formik.values.password}
								className="outline-none border border-iconColor rounded-[4px] px-[14px] py-[8px] text-textColor"
								placeholder="Nhập mật khẩu"
								onChange={formik.handleChange}
								id="password"
								name="password"
							/>
						</div>
						<div className="flex items-center gap-[10px] ">
							<Button
								className="w-[100px] h-[30px] bg-[#425c88] mt-[15px] rounded-[4px] shadow-md hover:opacity-45 transition-all duration-200 ease-in-out"
								styleText="text-white"
								textButton="Đăng nhập"
								type="submit"
							/>
							<Button
								className="w-[100px] h-[30px] bg-[#425c88] mt-[15px] rounded-[4px] shadow-md hover:opacity-45 transition-all duration-200 ease-in-out"
								styleText="text-white"
								textButton="Đăng ký"
								onClick={(e: any) => {
									e.preventDefault()
									navigate("/register")
								}}
							/>
						</div>
					</form>)
				}

			</div>
		</div>
	)
}
export default Login
