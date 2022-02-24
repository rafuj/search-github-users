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
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState({ show: false, msg: "" });

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
			value={{ githubUser, repos, followers, request, loading, error }}
		>
			{children}
		</GithubContext.Provider>
	);
};
export { GithubProvider, GithubContext };
