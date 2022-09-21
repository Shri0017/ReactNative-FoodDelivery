import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SplashScreen,
  WelcomeScreen,
  SigninScreen,
  SignupScreen,
  ForgotPasswordScreen,
  RegisterPhone,
  VerificationScreen,
  HomeScreen,
} from '../screens';
import {useSelector, useDispatch} from 'react-redux';
import {GeneralAction} from '../actions';

const Stack = createStackNavigator();

const Navigator = () => {
  const {isAppLoading, token, isFirstTimeUse} = useSelector(
    state => state?.generalState,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="splash" component={SplashScreen} />
        ) : !token || token === null || token === '' ? (
          <>
            {isFirstTimeUse && (
              <Stack.Screen name="welcome" component={WelcomeScreen} />
            )}
            <Stack.Screen name="signin" component={SigninScreen} />
            <Stack.Screen name="signup" component={SignupScreen} />
            <Stack.Screen
              name="forgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="phoneRegister" component={RegisterPhone} />
            <Stack.Screen name="verification" component={VerificationScreen} />
          </>
        ) : (
          <Stack.Screen name="home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
