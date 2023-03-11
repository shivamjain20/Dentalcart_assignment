import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import backendURL from "../../util/backendURL";
import readCSVFile from "../../util/readCSVFile";
import downloadCSV from "../../util/downloadCSV";
import styles from "./Home.module.css";
import toast from "react-hot-toast";

const Home = () => {
	const [studentsData, setStudentsData] = useState([]);
	const inputRef = useRef();

	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	const onFileChangeHandler = async (e) => {
		var file = e.target.files[0];

		const data = await readCSVFile(file);

		if (data) {
			var resData;
			try {
				const res = await fetch(`${backendURL}/api/addStudents`, {
					method: "POST",
					headers: {
						Authorization: "Bearer " + authCtx.token,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ data: data }),
				});

				resData = await res.json();
			} catch (e) {
				console.log(e.message);
			} finally {
				if (resData.success) {
					toast.success(resData.msg);
					fetchStudents();
				} else {
					toast.error(resData.msg);
				}
			}
		}
	};

	const exportCSVClickHandler = () => {
		downloadCSV(studentsData, "students");
	};

	const fetchStudents = async () => {
		var resData;
		try {
			const res = await fetch(`${backendURL}/api/getStudents`, {
				headers: { Authorization: "Bearer " + authCtx.token },
			});

			resData = await res.json();
		} catch (e) {
			console.log(e.message);
		} finally {
			if (resData.success) {
				toast.success(resData.msg);
				setStudentsData(resData?.data);
			} else {
				toast.error(resData.msg);
			}
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	return (
		<div className={styles.container}>
			<button
				className={styles["logout-btn"]}
				onClick={() => {
					authCtx.logout();
					navigate("/");
					toast.success("Successfully Logged out!");
				}}
			>
				Logout
			</button>
			<div className={styles.header}>
				<h1>Students</h1>
				<div>
					<input
						type="file"
						ref={inputRef}
						hidden
						accept="text/csv"
						onChange={onFileChangeHandler}
					/>
					<button onClick={() => inputRef.current.click()}>
						Import Students
					</button>
					<button onClick={exportCSVClickHandler}>
						<div>
							<img src="/img/download-icon.svg" alt="download" />
							Export as CSV
						</div>
					</button>
				</div>
			</div>
			<p>List of all the students in the database</p>
			<div className={styles["table-wrapper"]}>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Roll No</th>
							<th>Address</th>
							<th>Institute</th>
							<th>Course</th>
						</tr>
					</thead>
					<tbody>
						{studentsData.map((data) => (
							<tr key={data.id}>
								<td>{data.name}</td>
								<td>{data.roll_no}</td>
								<td>{data.address}</td>
								<td>{data.institute}</td>
								<td>{data.course}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Home;
