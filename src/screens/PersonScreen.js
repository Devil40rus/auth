import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import { Block, Card, Button } from 'galio-framework';

import { connect } from "react-redux";

import { logoutUser } from "../actions/auth.actions";

import Constants from 'expo-constants';
import theme from '../theme';

import { getData } from '../config/index';

const { statusBarHeight } = Constants;
const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  header: {
    paddingVertical: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    width,
  },
  navbar: {
    top: statusBarHeight,
    left: 0,
    right: 0,
    zIndex: 9999,
    position: 'absolute',
  },
  stats: {
    borderWidth: 0,
    width: width - theme.SIZES.BASE * 2,
    marginLeft: -10,
    height: theme.SIZES.BASE * 4,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  title: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  avatar: {
    width: theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 4,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  middle: {
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.SIZES.FONT * 0.875,
    lineHeight: theme.SIZES.FONT * 1.25,
  },
  cards: {
    width,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderRadius: 7,
    marginVertical: theme.SIZES.BASE * 0.600,
    padding: 15,
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  full: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  noRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rounded: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  gradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  }
});

class PersonScreen extends Component<{}> {
  constructor(props) {
    super(props);
    this.state= {
      events: [],
    };
  }

  navToEvent( eventID ) {
    this.props.navigation.navigate('Событие', { event: eventID} );
  }

  componentWillMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    let eventsQuery = `{
      events(studentID: "6631630712433484809"){
        event{
          id,
          name,
          startDate,
          place{
            name
          },
          lector{
            person{
              fullname,
            },
          },
        },
        isAssist,
      }
    }`;
    getData( eventsQuery, ( data ) => this.setState({
      events: data.events
    }))
  }

  logoutUser = () => {
    this.props.dispatch(logoutUser());
  }
	render() {
    const {getUser: {userDetails}} = this.props;
    const {authData: {isLoggedIn}} = this.props;
    console.log(this.state.events);

	  return(
      <Block>
        <Block style={{ marginTop: theme.SIZES.BASE * 3 }}>
          <Block style={{ alignSelf: 'flex-end', marginRight: 20, zIndex: 999 }}>
            <Button
              onlyIcon
              icon="home"
              iconFamily="antdesign"
              iconSize={20}
              color="#F4CB43"
              iconColor="#4A2481"
              style={{ width: 35, height: 35 }}
              onPress={this.logoutUser}
            />
          </Block>
          <Block center style={{ marginTop: -60 }}>
            <Block>
              <Block>
                <Card
                  borderless
                  style={styles.stats}
                  title={this.props.getUser.userDetails.person.fullname}
                  caption={this.props.getUser.userDetails.person.positionName}
                  avatar={`https://mc.svyaznoy.ru/api_5/avatar/big/${this.props.getUser.userDetails.person.tabNumber}`}
                ></Card>
              </Block>
              <ScrollView>
                {this.state.events.map((value) => (
                  <TouchableOpacity onPress={() => this.navToEvent( value.event.id ) } key={value.event.id}
                    key={value.event.id}
                    style={styles.card}
                  >
                    <Block style={{justifyContent: 'space-between'}}>
                      <Text style={{ color: "#EA329A", width: 250, fontWeight: 'bold', fontSize: '13' }}>{value.event.name}</Text>
                      <Text  ext style={{ color: "#4A2481", fontSize: '11' }}>Старт: {value.event.startDate}</Text>
                        {value.event.lector != null && <Text style={{ color: "#4A2481", fontSize: '11'}}>Тренер: {value.event.lector.person.fullname}</Text>}
                    </Block>
                    <Block style={{justifyContent: 'center'}}>
                      <Image style={{width: 20, height: 20}} source={require('../../assets/vector.png')} />
                    </Block>
                  </TouchableOpacity>
                ))}
                <Block>
                </Block>
              </ScrollView>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser,
  authData: state.authReducer.authData
});

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonScreen);