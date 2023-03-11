import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "./context/authContext";

const App = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (authCtx.isLoggedIn) {
			navigate("/home");
		} else {
			navigate("/");
		}
	}, []);

	return (
		<>
			<Routes>
				{!authCtx.isLoggedIn && <Route path="/" element={<Login />} />}
				{authCtx.isLoggedIn && (
					<Route path="/home" element={<Home />} />
				)}
			</Routes>
			<Toaster />
		</>
	);
};

export default App;
