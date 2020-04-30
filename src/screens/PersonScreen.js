import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Query} from  'react-apollo';
import gql from  'graphql-tag';  

import { connect } from "react-redux";
import Constants from 'expo-constants';

const { statusBarHeight } = Constants;

import { Block, Card } from 'galio-framework';
import theme from '../theme';

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
    width: width - theme.SIZES.BASE * 3,
    marginVertical: theme.SIZES.BASE * 0.600,
    elevation: theme.SIZES.BASE / 2,
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

const cards = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=840&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1503631285924-e1544dce8b28?&w=1200&h=1600&fit=crop&crop=entropy&q=300',
    avatar: 'http://i.pravatar.cc/100',
    title: 'Christopher Moon',
    caption: '138 minutes ago'
  }
];

const FETCH_ALL_PRODUCT = gql `{
  events(studentID: "${this.props.getUser.userDetails.person.id}"){
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

class PersonScreen extends Component<{}> {
	render() {
    const {getUser: {userDetails}} = this.props;
    console.log(this.props.getUser.userDetails);
    console.log(FETCH_ALL_PRODUCT);

		return(
      <Block>
        <Block center style={{ marginTop: theme.SIZES.BASE * 2 }}>
          <Block style={styles.header}>
            <Block>
              <Card
                borderless
                style={styles.stats}
                title={this.props.getUser.userDetails.person.fullname}
                caption={this.props.getUser.userDetails.person.positionName}
                avatar={`https://mc.svyaznoy.ru/api_5/avatar/big/${this.props.getUser.userDetails.person.tabNumber}`}
              />
            </Block>
            <ScrollView>
              <Block flex space="between">
                {cards && cards.map((card, id) => (
                  <Card
                    key={`card-${card.image}`}
                    flex
                    borderless
                    shadowColor={theme.COLORS.BLACK}
                    titleColor={card.full ? theme.COLORS.WHITE : null}
                    style={styles.card}
                    title={card.title}
                    caption={card.caption}
                    location={card.location}
                    avatar={`${card.avatar}?${id}`}
                    image={card.image}
                    imageStyle={[card.padded ? styles.rounded : null]}
                    imageBlockStyle={[
                      card.padded ? { padding: theme.SIZES.BASE / 2 } : null,
                      card.full ? null : styles.noRadius,
                    ]}
                    footerStyle={card.full ? styles.full : null}
                  >
                    {card.full ? <LinearGradient colors={['transparent', 'rgba(0,0,0, 0.8)']} style={styles.gradient} /> : null}
                  </Card>
                ))}
              </Block>
            </ScrollView>
          </Block>
        </Block>
      </Block>
    );
  }
}

mapStateToProps = (state) => ({
  getUser: state.userReducer.getUser
});

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonScreen);
