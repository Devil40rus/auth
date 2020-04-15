import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';

import { loginUser } from "../actions/auth.actions";
import InputText from "../components/InputText";
import Logo from "../components/Logo";
import Loader from "../components/Loader";

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  justify-content: center;
`;

const SignupTextCont = styled.View`
  flexGrow: 1;
  align-items: flex-end;
  justify-content: center;
  padding-vertical: 16;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  width: 270;
  background-color: #F4CB43;
  border-radius: 5;
  margin-vertical: 10;
  padding-vertical: 13;
`;

const ButtonText = styled.Text`
  fontSize: 13;
  font-weight: 500;
  text-transform: uppercase;
  color: #4A2481;
  textAlign: center;
`;

class Login extends Component<{}> {

	signup() {
		Actions.signup()
	}

  loginUser = async (values) => {
    try {
      const response =  await this.props.dispatch(loginUser(values));
      if (!response.success) {
        throw response;
      }
    } catch (error) {
      let errorText;
      if (error.message) {
        errorText = error.message
      }
      errorText = error.responseBody;
      Alert.alert(
        'Ошибка входа!',
        errorText,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Отмена'),
            style: 'cancel',
          },
        ]
      );
    }
  }

  onSubmit = (values) => {
    this.loginUser(values);
  }

  renderTextInput = (field) => {
    const {meta: {touched, error}, label, secureTextEntry, maxLength, keyboardType, placeholder, input: {onChange, ...restInput}} = field;
    return (
      <View>
        <InputText
          onChangeText={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          label={label}
          {...restInput} />
      {(touched && error) && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

	render() {
    const { handleSubmit, loginUser} = this.props;
		return(
			<Container>
        {(loginUser && loginUser.isLoading) && <Loader />}
        <Logo/>
        <Field
          name="email"
          placeholder="Email"
          component={this.renderTextInput} />
        <Field
          name="password"
          placeholder="Пароль"
          secureTextEntry={true}
          component={this.renderTextInput} />
        <Button onPress={handleSubmit(this.onSubmit)}>
          <ButtonText>Войти</ButtonText>
        </Button>
        <SignupTextCont />
      </Container>
      )
	}
}

const validate = (values) => {
    const errors = {};
    if(!values.email) {
      errors.email = "Укажите Email"
    }
    if(!values.password) {
      errors.password = "Укажите пароль"
    }
    return errors;
};

mapStateToProps = (state) => ({
  loginUser: state.authReducer.loginUser
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: "login",
    validate
  })
)(Login);
