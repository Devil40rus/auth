import React, { Component } from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { FloatingAction } from "react-native-floating-action";

import { Block } from 'galio-framework';

import { connect } from "react-redux";

import { getData } from '../config/index';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: theme.SIZES.BASE * 2
  },
  profileBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 200,
    overflow: "hidden"
  },
  valuesTraining: {
    color: "#4A2481"
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 7,
    marginVertical: theme.SIZES.BASE * 0.600,
    padding: 15,
    marginTop: theme.SIZES.BASE * 2,
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  }
});

const actions = [
  {
    text: "Присутствие",
    icon: require("../../assets/icons/presence.png"),
    name: "bt_presence",
    position: 1
  },
  {
    text: "Тест",
    icon: require("../../assets/icons/test.png"),
    name: "bt_text",
    position: 2
  },
  {
    text: "Опрос",
    icon: require("../../assets/icons/poll.png"),
    name: "bt_poll",
    position: 3
  },
  {
    text: "Оценки",
    icon: require("../../assets/icons/assessments.png"),
    name: "bt_assessments",
    position: 4
  },
  {
    text: "Вопросы",
    icon: require("../../assets/icons/questions.png"),
    name: "bt_questions",
    position: 4
  }
];

class TrainingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      oEvent: Object()
    };
  }

  getNavParams(){
    return this.props.navigation.state.params.id
  }

  async getEventData(){
    let eventQuery = ``;
    
    getData( eventQuery, ( data ) => this.setState({
      oEvent: data.event
    }));
  }

  getEvent() {
    return this.state.oEvent.id ? this.state.oEvent : null;
  }

  getEventLector() {
    return ( this.getEvent() && this.getEvent().lector )  ? this.getEvent().lector.person : null
  }

  getEventPlace(){
    return ( this.getEvent() && this.getEvent.place ) ? this.getEvent().place : null
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    this.props.navigation.addListener('willBlur',( event )=>{
      this.state.oEvent = Object();
    })
  }

  loader(){
    return (
      <Block style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#EA329A"
        />
      </Block>
    )
  }

  render() {
    const {getUser: {userDetails}} = this.props;
    const {authData: {isLoggedIn}} = this.props;
    console.log('------');
    console.log(this.state);
    console.log('------');
    if (
      !this.getNavParams() 
      || !this.getNavParams().event
    ) {
      this.props.navigation.navigate('Главная');
    }
    if (
      !this.getEvent()
    ) {
      this.getEventData();
      return this.loader();
    }
    return (
      <Block style={styles.container}>
        <Block style={{ padding: 30 }}>
          <Block key={this.getEvent().id}>
            <Block>
              <Text
                style={{
                  color: "#4A2481",
                  fontSize: 17,
                  textAlign: "center",
                  width: 300
                }}>{this.getEvent().name}</Text>
            </Block>
            <Block>
              <Block
                style={{
                  flexDirection: 'row',
                  marginTop: 30
                }}>
                <Block style={styles.profileImage} />
                <Block
                  style={{
                    marginLeft: 14,
                    justifyContent: "center"
                  }}>
                  <Block style={{ color: "#EA329A" }}>
                    <Text style={{ color: "#EA329A" }}>Тренер: <Text style={{ fontSize: 14, fontWeight: "bold" }}>{this.getEventLector() ? this.getEventLector().firstname + " " + this.getEventLector().lastname : 'Нет данных'}</Text></Text>
                  </Block>
                  <Block>
                    <Text style={styles.valuesTraining}>Старт: <Text style={{ fontWeight: "bold" }}>{this.getEvent().startDate}</Text>
                    </Text>
                  </Block>
                  <Block>
                    <Text style={styles.valuesTraining}>Место: <Text style={{ fontWeight: "bold" }}>{this.getEventPlace() ? this.getEventPlace() : 'Нет данных'}</Text>
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block style={styles.card}></Block>
              <Block style={styles.card}></Block>
              <Block style={styles.card}></Block>
            </Block>
          </Block>
        </Block>
        <Block>
          <FloatingAction
            animated={true}
            position={"right"}
            color={"#4A2481"}
            overlayColor={"none"}
            actions={actions}
            textBackground={"#4A2481"}
            textColor={"#4A2481"}
          />
        </Block>
      </Block>
    )
  }
}

mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData
});

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainingScreen);
