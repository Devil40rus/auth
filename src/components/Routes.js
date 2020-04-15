import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Login from '../pages/Login';
import Profile from "../pages/Profile";
import Home from '../pages/Home';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Scene>
					<Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
						<Scene key="login" component={Login} initial={true} />
					</Scene>
					<Scene key="app" hideNavBar={true} initial={this.props.isLoggedIn}>
						<Scene key="profile" component={Profile} />
						<Scene key="home" component={Home} />
					</Scene>
				</Scene>
			</Router>
		)
	}
}
