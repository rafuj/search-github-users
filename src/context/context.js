/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import mockFollowers from "./mockData.js/mockFollowers";
import mockRepos from "./mockData.js/mockRepos";
import mockUser from "./mockData.js/mockUser";
const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
	const [githubUser, setGithubUser] = useState(mockUser);
	const [repos, setRepos] = useState(mockRepos);
	const [followers, setFollowers] = useState(mockFollowers);
	//request loading
	const [request, setRequest] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: "" });

	const searchGithubUser = async (user) => {
		toggleError();
		setIsLoading(true);
		const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
			console.log(err)
		);
		if (response) {
			setGithubUser(response.data);
			const { login, followers_url } = response.data;
			// axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(
			// 	(response) => setRepos(response.data)
			// );
			// axios(`${followers_url}?per_page=100`).then((response) =>
			// 	setFollowers(response.data)
			// );
			await Promise.allSettled([
				axios(`${rootUrl}/users/${login}/repos?per_page=100`),
				axios(`${followers_url}?per_page=100`),
			])
				.then((results) => {
					const [repos, followers] = results;
					const status = "fulfilled";
					if (repos.status === status) {
						setRepos(repos.value.data);
					}
					if (followers.status === status) {
						setFollowers(followers.value.data);
					}
				})
				.catch((err) => console.log(err));
		} else {
			toggleError(true, "There is no user with that username");
		}
		checkRequest();
		setIsLoading(false);
	};

	const checkRequest = () => {
		axios(`${rootUrl}/rate_limit`)
			.then(({ data }) => {
				let {
					rate: { remaining },
				} = data;
				setRequest(remaining);
				if (remaining === 0) {
					toggleError(true, "Your Request Limit Exceeded hourly limit");
				}
			})
			.catch((err) => console.log(err));
	};
	//error
	const toggleError = (show = false, msg = "") => {
		setError({ show, msg });
	};

	useEffect(() => {
		checkRequest();
	}, [checkRequest]);

	return (
		<GithubContext.Provider
			value={{
				githubUser,
				repos,
				followers,
				request,
				isLoading,
				error,
				searchGithubUser,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};
export { GithubProvider, GithubContext };
