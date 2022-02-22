import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard, Error, Login } from "./pages";

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact={true}>
					<Dashboard></Dashboard>
				</Route>
				<Route path="/login" exact={true}>
					<Login />
				</Route>
				<Route path="*" exact={true}>
					<Error />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
