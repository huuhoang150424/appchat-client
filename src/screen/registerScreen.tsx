import { useFormik } from "formik"
import Button from "../components/button"
import * as Yup from "yup";

import { useNavigate } from "react-router-dom"
import Loading from "../components/loading/loading"
import { register } from "../data/api";
import { useState } from "react";

const validateRegister = Yup.object().shape({
	username: Yup.string()
		.required("Họ tên không được để trống")
		.min(3, "Họ tên phải có ít nhất 3 ký tự"),
	email: Yup.string()
		.required("Tên không được để trống")
		.email("Trường này phải là email"),
	password: Yup.string()
		.required("Mật khẩu không được để trống")
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Mật khẩu không khớp")
		.required("Vui lòng xác nhận lại mật khẩu")
});

const Register = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (): Promise<void> => {
		setLoading(true)
		try {
			const payload: any = formik.values;
			console.log("Dữ liệu gửi đi:", payload);
			const response = await register(payload);
			console.log(response.data.message)
			if (response.status === 201) {
				navigate('/sign')
			}
			return response.data.message
		} catch (err) {
			console.log(`Lỗi ${err}`)
		} finally {
			setLoading(false);
		}
	}
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: ""
		},
		onSubmit: handleSubmit,
		validationSchema: validateRegister
	})

	return (
		<div className="flex justify-center mt-[20px] ">

			<div className="w-[300px] h-[100%] bg-[#e7d9d9]  mt-[100px] rounded-[6px] shadow-sm p-[20px] ">

				<h1 className="text-textColor text-[20px] font-[400] leading-[30px] text-center">Đăng ký</h1>
				<div className="w-full h-[1px] bg-iconColor rounded-[2px] mt-[10px]"></div>
				{
					loading ? (<Loading className="mx-auto my-[180px] " />) : (
						<form onSubmit={formik.handleSubmit} method="POST" className="mt-[20px] flex flex-col gap-[5px]">
							<div className="flex flex-col gap-[10px] ">
								<label htmlFor="username" className="text-[12px] text-textColor">Họ tên đầy đủ</label>
								<input
									value={formik.values.username}
									className="outline-none border border-iconColor rounded-[4px] px-[14px] py-[8px] text-textColor"
									placeholder="Vui lòng nhập họ và tên"
									onChange={formik.handleChange}
									id="username"
									name="username"
								/>
							</div>
							<div className="flex flex-col gap-[10px] ">
								<label htmlFor="email" className="text-[12px] text-textColor">Email</label>
								<input
									value={formik.values.email}
									className="outline-none border border-iconColor rounded-[4px] px-[14px] py-[8px] text-textColor"
									placeholder="Vui lòng nhập Email"
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
							<div className="flex flex-col gap-[10px] ">
								<label htmlFor="confirmPassword" className="text-[12px] text-textColor">Nhắc lại mật khẩu</label>
								<input
									value={formik.values.confirmPassword}
									className="outline-none border border-iconColor rounded-[4px] px-[14px] py-[8px] text-textColor"
									placeholder="Nhập lại mật khẩu"
									onChange={formik.handleChange}
									id="confirmPassword"
									name="confirmPassword"
								/>
							</div>
							<div className="flex items-center gap-[10px] ">
								<Button
									className="w-[100px] h-[30px] bg-[#425c88] mt-[15px] rounded-[4px] shadow-md hover:opacity-45 transition-all duration-200 ease-in-out"
									styleText="text-white"
									textButton="Đăng ký"
									type="submit"
								/>
								<Button
									className="w-[100px] h-[30px] bg-[#425c88] mt-[15px] rounded-[4px] shadow-md hover:opacity-45 transition-all duration-200 ease-in-out"
									styleText="text-white"
									textButton="Đăng Nhặp"
									onClick={(e: any) => {
										e.preventDefault()
										navigate("/sign")
									}}
								/>
							</div>
						</form>)
				}

			</div>


		</div>
	)
}
export default Register
