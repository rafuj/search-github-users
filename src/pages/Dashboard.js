import React from "react";
import { Info, Navbar, Repos, Search, User } from "../components";
import { GithubContext } from "../context/context";
import loadingImage from "../images/preloader.gif";
const Dashboard = () => {
	const { isLoading } = React.useContext(GithubContext);
	if (isLoading) {
		return (
			<main>
				<Navbar></Navbar>
				<Search />
				<img src={loadingImage} className="loading-img" alt="loading" />
			</main>
		);
	}
	return (
		<main>
			<Navbar></Navbar>
			<Search />
			<Info />
			<User />
			<Repos />
		</main>
	);
};

export default Dashboard;
