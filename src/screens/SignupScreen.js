import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Images} from '../constants';
import {Display} from '../utils';
import {Seperator, ToggleButton} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';
import {AuthenticationSerive} from '../services';

const inputStyle = state => {
  switch (state) {
    case 'valid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.SECONDARY_GREEN,
      };
    case 'invalid':
      return {
        ...styles.inputContainer,
        borderWidth: 1,
        borderColor: Colors.DEFAULT_RED,
      };
    default:
      return styles.inputContainer;
  }
};

export default function SignupScreen({navigation}) {
  const [PasswordShow, setPasswordShow] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [emailState, setEmailState] = useState('default');
  const [usernameState, setUsernameState] = useState('default');

  const register = async () => {
    let user = {
      username,
      email,
      password,
    };
    // console.log(user);
    setIsLoading(true);
    AuthenticationSerive.register(user).then(response => {
      setIsLoading(false);
      console.log(response);
      if (!response?.status) {
        setErrorMessage(response?.message);
      }
    });
    // navigation.navigate('phoneRegister')
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenticationSerive.checkUserExist(type, value).then(response => {
        if (response?.status) {
          type === 'email' && emailErrorMsg
            ? (setEmailErrorMsg(''), setEmailState('valid'))
            : null;
          type === 'username' && usernameErrorMsg
            ? (setUsernameErrorMsg(''), setUsernameState('valid'))
            : null;
        } else {
          type === 'email'
            ? (setEmailErrorMsg(response?.message), setEmailState('invalid'))
            : null;
          type === 'username'
            ? (setUsernameErrorMsg(response?.message),
              setUsernameState('invalid'))
            : null;
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Seperator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}> Sign Up</Text>
      </View>
      <Text style={styles.title}> Create Account </Text>
      <Text style={styles.content}>
        Enter Your Email , Choose a username and password.
      </Text>
      <Seperator height={15} />
      <View style={inputStyle(emailState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setEmail(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('email', text)
            }
          />
        </View>
      </View>
      {emailErrorMsg && <Text style={styles.error}>{emailErrorMsg}</Text>}
      <View style={inputStyle(usernameState)}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="user"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setUsername(text)}
            onEndEditing={({nativeEvent: {text}}) =>
              checkUserExist('username', text)
            }
          />
        </View>
      </View>
      {usernameErrorMsg && <Text style={styles.error}>{usernameErrorMsg}</Text>}
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="lock"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            secureTextEntry={PasswordShow ? false : true}
            placeholder="Password"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
            onChangeText={text => setPassword(text)}
          />
          <Feather
            name={PasswordShow ? 'eye-off' : 'eye'}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
            onPress={() => setPasswordShow(!PasswordShow)}
          />
        </View>
      </View>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <TouchableOpacity style={styles.signupButton} onPress={() => register()}>
        {isLoading ? (
          <LottieView source={Images.LOADING} autoPlay />
        ) : (
          <Text style={styles.signupButtonText}> Create Account</Text>
        )}
      </TouchableOpacity>
      <Seperator height={15} />
      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.FACEBOOK} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialButtonText}>Conncet with Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.GOOGLE} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialButtonText}>Conncet with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
    fontFamily: Fonts.POPPINS_EXTRA_LIGHT,
  },
  forgotPasswordContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 20,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_GREY,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  forgotPasswordText: {
    marginLeft: 20,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_GREEN,
    fontFamily: Fonts.POPPINS_BOLD,
  },
  signupButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    marginHorizontal: 20,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  orText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    alignSelf: 'center',
  },
  facebookButton: {
    backgroundColor: Colors.FABEBOOK_BLUE,
    marginHorizontal: 20,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    marginHorizontal: 20,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  signinButtonLogoContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    padding: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 25,
  },
  socialButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  socialButtonText: {
    fontSize: 15,
    lineHeight: 15 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
    alignSelf: 'center',
  },
  error: {
    marginLeft: 23,
    marginTop: 8,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});
