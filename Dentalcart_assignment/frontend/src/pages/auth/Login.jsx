import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import backendURL from "../../util/backendURL";
import toast from "react-hot-toast";
import AuthContext from "../../context/authContext";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUpActive, setIsSignUpActive] = useState(false);

	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		var resData;
		try {
			const res = await fetch(
				isSignUpActive
					? `${backendURL}/api/signup`
					: `${backendURL}/api/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				}
			);

			resData = await res.json();
		} catch (e) {
			console.log(e.message);
		} finally {
			if (resData.success) {
				if (isSignUpActive) {
					toast.success(resData.msg);
				} else {
					const expirationTime = new Date(
						new Date().getTime() + resData.expiresIn * 1000
					);
					authCtx.login(
						resData.token,
						expirationTime.toISOString(),
						resData.userId
					);
					navigate("/home", { replace: true });
					toast.success("Successfully logged in");
				}
			} else {
				toast.error(resData.msg);
			}
		}
	};

	return (
		<div className={styles.main}>
			<form onSubmit={onSubmitHandler}>
				<input
					type="email"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<div onClick={() => setIsSignUpActive(!isSignUpActive)}>
					{isSignUpActive
						? "Already have an account? Login"
						: "Don't have an account? Signup Insted"}
				</div>
				<button type="submit">
					{isSignUpActive ? "Signup" : "Submit"}
				</button>
				<h3>OR</h3>
				<button>
					<img src="/img/google-icon.svg" alt="google" />
					Login with Google
				</button>
			</form>
		</div>
	);
};

export default Login;
