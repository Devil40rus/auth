import React, { Component } from 'react';
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import Onboarding from 'react-native-onboarding-swiper';

const Avatar = styled.Image`
	width: 300;
	height: 300;
	border-radius: 200;
	border-color: #F4CB43;
	border-width: 2;
`;

class Profile extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
    };
  }
 
  navigator() {
		Actions.navigator()
  }

  componentDidMount() {
    setInterval(function(){
      this.setState({
        profile: this.props.getUser.userDetails.person.firstname
      })
    }.bind(this));
  }

	render() {
    const {getUser: {userDetails}} = this.props;

		return(
      <Onboarding
        reset={() => this.forceUpdate()}
        showNext={false}
        bottomBarColor={'#fff'}
        showSkip={false}
        onDone={() => {
          {this.navigator()};
        }}
        controlStatusBar={false}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Avatar />,
            title: `Привет, ${this.state.profile}`,
            subtitle: 'Мы приветствуем тебя в нашем приложении для офлайн мероприятий',
            titleStyles: { color: '#4A2481' },
            subTitleStyles: { color: '#EA329A' }
          },
          {
            backgroundColor: '#fff',
            title: 'Приветствуем тебя!',
            subtitle: 'Привет!',
          },
          {
            backgroundColor: '#fff',
            title: 'Начать!',
            subtitle: "Вперед!",
          },
        ]}
      />
		)
	}
}

mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
