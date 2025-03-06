/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
	const dispatch = useDispatch();
	const requests = useSelector((store) => store.request);

	const reviewRequests = async (status, _id) => {
		try {
			const res = await axios.post(
				BASE_URL + "/request/review/" + status + "/" + _id,
				{},
				{
					withCredentials: true,
				}
			);
			dispatch(removeRequest(_id));
		} catch (error) {
			console.log(error);
		}
	};

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
		return <h1 className="flex  justify-center m-4">No Request found</h1>;

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
								<button
									className="btn btn-primary"
									onClick={() => {
										reviewRequests("rejected", request._id);
									}}
								>
									Reject
								</button>
								<button
									className="btn btn-secondary"
									onClick={() => {
										reviewRequests("accepted", request._id);
									}}
								>
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
