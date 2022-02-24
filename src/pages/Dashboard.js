import React from "react";
import { Info, Navbar, Repos, Search, User } from "../components";
// import loadingImage from '../images/preloader.gif';
// import { GithubContext } from '../context/context';
const Dashboard = () => {
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
