/* eslint-disable react/prop-types */
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
	const [shotToast, setShowToast] = useState(false);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastname] = useState(user.lastName);
	const [age, setAge] = useState(user.age || "");
	const [gender, setGender] = useState(user.gender || "");
	const [about, setAbout] = useState(user.about || "");
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
	const [error, setError] = useState("");
	const dispatch = useDispatch();

	const updateProfile = async () => {
		setError("");
		try {
			const res = await axios.patch(
				BASE_URL + "/profile/edit",
				{ firstName, lastName, age, about, gender, photoUrl },
				{ withCredentials: true }
			);
			dispatch(addUser(res?.data?.data));
			setShowToast(true);
			setTimeout(() => setShowToast(false), 3000);
		} catch (error) {
			setError(error.response.data);
		}
	};

	return (
		<>
			<div className="flex justify-evenly">
				<div className="flex justify-center items-center my-10">
					<div className="card bg-base-300 w-96 shadow-xl">
						<div className="card-body">
							<h2 className="card-title">Edit Profile</h2>
							<div className="my-2">
								<label className="form-control w-full max-w-xs my-2">
									<div className="label">
										<span className="label-text">
											FirstName
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
											LastName
										</span>
									</div>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
										value={lastName}
										onChange={(e) =>
											setLastname(e.target.value)
										}
									/>
								</label>
								<label className="form-control w-full max-w-xs my-2">
									<div className="label">
										<span className="label-text">Age</span>
									</div>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
										value={age}
										onChange={(e) => setAge(e.target.value)}
									/>
								</label>
								<label className="form-control w-full max-w-xs my-2">
									<div className="label">
										<span className="label-text">
											Gender
										</span>
									</div>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
										value={gender}
										onChange={(e) =>
											setGender(e.target.value)
										}
									/>
								</label>
								<label className="form-control w-full max-w-xs my-2">
									<div className="label">
										<span className="label-text">
											About
										</span>
									</div>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
										value={about}
										onChange={(e) =>
											setAbout(e.target.value)
										}
									/>
								</label>
								<label className="form-control w-full max-w-xs my-2">
									<div className="label">
										<span className="label-text">
											Photo
										</span>
									</div>
									<input
										type="text"
										className="input input-bordered w-full max-w-xs"
										value={photoUrl}
										onChange={(e) =>
											setPhotoUrl(e.target.value)
										}
									/>
								</label>
							</div>
							<p className="text-red-500">{error}</p>
							<div className="card-actions justify-center">
								<button
									className="btn btn-primary"
									onClick={updateProfile}
								>
									Update Profile
								</button>
							</div>
						</div>
					</div>
				</div>
				<UserCard
					user={{ firstName, lastName, age, gender, about, photoUrl }}
				/>
			</div>
			{shotToast && (
				<div className="toast toast-top toast-center">
					<div className="alert alert-success">
						<span>Profile Updated successfully.</span>
					</div>
				</div>
			)}
		</>
	);
};

export default EditProfile;
