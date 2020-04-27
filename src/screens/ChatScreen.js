import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default class ChatScreen extends Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Вам необходима помощь?',
          createdAt: new Date(),
          quickReplies: {
            type: 'radio',
            keepIt: true,
            values: [
              {
                title: '😋 Да',
                value: 'yes',
              },
              {
                title: '😞 Нет',
                value: 'no',
              },
            ],
          },
          user: {
            _id: 2,
            name: 'Svyaznoy',
          },
        },
        {
          _id: 2,
          text: 'Добро пожаловать!',
          createdAt: new Date(),
          quickReplies: {
            type: 'checkbox',
            values: [
            {
                title: 'Yes',
                value: 'yes',
            },
            {
                title: 'Yes, let me show you with a picture!',
                value: 'yes_picture',
            },
            {
                title: 'Nope. What?',
                value: 'no',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'Svyaznoy',
        }},
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        bottomOffset={50}
        placeholder={'Напишите сообщение...'}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}
