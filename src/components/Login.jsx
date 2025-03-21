import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [isLoginForm, setIsLoginForm] = useState(true);
	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignUp = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/signup",
				{ firstName, lastName, emailId, password },
				{ withCredentials: true }
			);
			dispatch(addUser(res.data.data));
			return navigate("/profile");
		} catch (error) {
			setError(error?.response?.data || "Login Details are not Valid");
		}
	};

	const handleLogin = async () => {
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{
					emailId,
					password,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(addUser(res.data));
			return navigate("/");
		} catch (error) {
			setError(error?.response?.data || "Login Details are not Valid");
		}
	};

	return (
		<div className="flex justify-center items-center my-10">
			<div className="card bg-base-300 w-96 shadow-xl">
				<div className="card-body">
					<h2 className="card-title">
						{isLoginForm ? "Login" : "Sign Up"}
					</h2>
					<div className="my-2">
						{!isLoginForm && (
							<>
								<label className="form-control w-full max-w-xs my-2">
									<div className="label">
										<span className="label-text">
											First Name
										</span>
									</div>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
										value={firstName}
										onChange={(e) =>
											setFirstName(e.target.value)
										}
									/>
								</label>
								<label className="form-control w-full max-w-xs my-2">
									<div className="label">
										<span className="label-text">
											Last Name
										</span>
									</div>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
										value={lastName}
										onChange={(e) =>
											setLastName(e.target.value)
										}
									/>
								</label>
							</>
						)}
						<label className="form-control w-full max-w-xs my-2">
							<div className="label">
								<span className="label-text">Email ID</span>
							</div>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs"
								value={emailId}
								onChange={(e) => setEmailId(e.target.value)}
							/>
						</label>
						<label className="form-control w-full max-w-xs my-2">
							<div className="label">
								<span className="label-text">Password</span>
							</div>
							<input
								type="text"
								className="input input-bordered w-full max-w-xs"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</label>
					</div>
					<p className="text-red-500">{error}</p>
					<div className="card-actions justify-center">
						<button
							className="btn btn-primary"
							onClick={isLoginForm ? handleLogin : handleSignUp}
						>
							{isLoginForm ? "Login" : "Sign Up"}
						</button>
					</div>
					<p
						className="m-auto cursor-pointer my-2"
						onClick={() => setIsLoginForm((value) => !value)}
					>
						{isLoginForm
							? "New User? SigUp Here"
							: "Existing User? Login Here"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
