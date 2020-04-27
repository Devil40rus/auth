import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class PersonScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Персон</Text>
      </View>
    );
  }
}