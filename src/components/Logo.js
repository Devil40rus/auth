import React, { Component } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`;

export default class Logo extends Component<{}> {
	render(){
		return(
			<Container>
				<Image source={require('')} />
  			</Container>
			)
	}
}
