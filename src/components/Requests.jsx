import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
	const dispatch = useDispatch();
	const requests = useSelector((store) => store.request);

	const fetchRequests = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/request/received", {
				withCredentials: true,
			});
			console.log(res?.data?.data);
			dispatch(addRequests(res.data.data));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchRequests();
	}, []);

	if (!requests) return;

	if (requests === 0)
		return (
			<>
				<h1>No Request found</h1>
			</>
		);

	return (
		<div>
			<h1 className="text-white text-center text-3xl font-semibold py-4">
				User Requests
			</h1>
			<div className="flex justify-center items-center flex-col">
				{requests.map((request) => {
					const {
						_id,
						firstName,
						lastName,
						age,
						gender,
						about,
						photoUrl,
					} = request.fromUserId;

					return (
						<div
							className="flex w-1/3 gap-5 items-center justify-between bg-gray-300 m-4 p-4"
							key={_id}
						>
							<div className="flex items-center">
								<img
									className="w-20 h-20 rounded-full"
									src={photoUrl}
									alt="user-photo"
								/>
								<div className="ml-4">
									<h2>{firstName + " " + lastName}</h2>
									{age && gender && (
										<p>{age + ", " + gender}</p>
									)}
									<p>{about}</p>
								</div>
							</div>
							<div className="flex gap-2">
								<button className="btn btn-primary">
									Reject
								</button>
								<button className="btn btn-secondary">
									Accept
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Requests;
