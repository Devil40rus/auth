import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
  justify-content: center;
`;

export default class Loader extends Component<{}> {
	render() {
		return(
			<Container>
        <ActivityIndicator color="#fff" size="large" />
			</Container>
			)
	}
}
