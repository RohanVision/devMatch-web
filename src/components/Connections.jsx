import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";

const Connections = () => {
	const dispatch = useDispatch();
	const connections = useSelector((store) => store.connections);

	const fetchConnections = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/connection", {
				withCredentials: true,
			});
			console.log(res);
			dispatch(addConnection(res?.data?.data));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchConnections();
	}, []);

	if (!connections) return;

	if (connections === 0)
		return (
			<>
				<h1>No Connections found</h1>
			</>
		);

	return (
		<div>
			<h1 className="text-white text-center text-3xl font-semibold py-4">
				Connections
			</h1>
			<div className="flex justify-center items-center flex-col">
				{connections.map((connection) => {
					const {
						firstName,
						lastName,
						age,
						gender,
						about,
						photoUrl,
					} = connection;

					return (
						<div
							className="flex w-1/2 gap-5 items-center bg-gray-300 m-4 p-4"
							key={connection._id}
						>
							<div>
								<img
									className="w-20 h-20 rounded-full"
									src={photoUrl}
									alt="user-photo"
								/>
							</div>
							<div>
								<h2>{firstName + " " + lastName}</h2>
								<p>{about}</p>
								{age && gender && <p>{age + ", " + gender}</p>}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Connections;
