import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
	const [emailId, setEmailId] = useState("mark@gmail.com");
	const [password, setPassword] = useState("Mark@1234");
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
					<h2 className="card-title">Login</h2>
					<div className="my-2">
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
							onClick={handleLogin}
						>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
