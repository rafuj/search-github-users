import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import loadingGif from "../images/preloader.gif";
function AuthWrapper({ children }) {
	const { isLoading, error } = useAuth0();
	if (isLoading) {
		return (
			<Wrapper>
				<img src={loadingGif} className="loading-img" alt="loading" />
			</Wrapper>
		);
	}
	if (error) {
		return (
			<Wrapper>
				<h2>Something wen't wrong please try again</h2>
			</Wrapper>
		);
	}
	return <>{children}</>;
}

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
	img {
		width: 150px;
	}
`;

export default AuthWrapper;
