import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React,{useState} from 'react';
  import {Seperator, ToggleButton} from '../components';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Feather from 'react-native-vector-icons/Feather';
  import {Colors, Fonts, Images} from '../constants';
  import {Display} from '../utils';
  
export default function ForgotPasswordScreen({navigation}) {
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
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>
      <Text style={styles.title}> Forgot Password </Text>
      <Text style={styles.content}>
        Enter Your Email , So that we can help you to recover your password.
      </Text>
      <Seperator height={15} />
      <View style={styles.inputContainer}>
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
          />
        </View>
      </View>
      <Seperator height={15} />
      <TouchableOpacity style={styles.resetPasswordButton}>
        <Text style={styles.resetPasswordButtonText}> Reset Password </Text>
      </TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:Colors.DEFAULT_WHITE
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
       resetPasswordButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        marginHorizontal: 20,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      resetPasswordButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
})