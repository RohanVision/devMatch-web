import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
	const dispatch = useDispatch();
	const feed = useSelector((store) => store.feed);
	const getFeed = async () => {
		try {
			if (feed) return;
			const res = await axios.get(BASE_URL + "/feed", {
				withCredentials: true,
			});
			dispatch(addFeed(res?.data));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if (!feed) return;
	if (feed.length <= 0) {
		return <h1 className="flex justify-center">No New Users found...!!</h1>;
	}
	return (
		feed && (
			<div className="flex justify-center items-center">
				<UserCard user={feed[0]} />
			</div>
		)
	);
};

export default Feed;
