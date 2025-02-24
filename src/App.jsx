import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					{/* Parent */}
					<Route path="/" element={<Body />}>
						{/* Children */}
						<Route path="/login" element={<Login />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
