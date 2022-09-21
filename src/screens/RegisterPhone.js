import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {FlagItem, Seperator, ToggleButton} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts, CountryCode} from '../constants';
import {Display} from '../utils';
import {StaticImageService} from '../services';

const getDropdownStyle = y => ({...styles.countryDropdown, top: y + 60});

export default function RegisterPhone({navigation}) {
  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find(country => country.name == 'India'),
  );
  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});
  const [phoneNumber, setPhoneNumber] = useState(null);

  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout?.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <View
      onStartShouldSetResponder={({nativeEvent: {pageX, pageY}}) =>
        closeDropdown(pageX, pageY)
      }>
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
        <Text style={styles.headerTitle}>Register Phone</Text>
      </View>

      <Text style={styles.title}> Register Phone </Text>
      <Text style={styles.content}>
        Enter Your Registered Phone number to login.
      </Text>

      <View
        style={styles.inputContainer}
        onLayout={({
          nativeEvent: {
            layout: {y},
          },
        }) => setInputsContainerY(y)}>
        <TouchableOpacity
          style={styles.countryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Image
            source={{uri: StaticImageService.getFlagIcon(selectedCountry.code)}}
            style={styles.flagIcon}
          />
          <Text style={styles.countryCodeText}>
            {' '}
            {selectedCountry.dial_code}{' '}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} />
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            keyboardType="number-pad"
            style={styles.inputText}
            onFocus={() => setIsDropdownOpen(false)}
            onChangeText={text =>
              setPhoneNumber(selectedCountry?.dial_code + text)
            }
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => {
          console.log(phoneNumber);
          navigation.navigate('verification',{phoneNumber});
        }}>
        <Text style={styles.signinButtonText}> Continue </Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={getDropdownStyle(inputsContainerY)}
          onLayout={({
            nativeEvent: {
              layout: {x, y, height, width},
            },
          }) => setDropdownLayout({x, y, height, width})}>
          <FlatList
            data={CountryCode}
            keyExtractor={item => item.code}
            renderItem={({item}) => (
              <FlagItem
                {...item}
                onPress={country => {
                  setSelectedCountry(country);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          />
        </View>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 50,
  },
  countryListContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    width: Display.setWidth(23),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(7),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    flexDirection: 'row',
  },
  phoneInputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
    flex: 1,
  },
  flagIcon: {
    height: 14,
    width: 20,
  },
  countryCodeText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(7),
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  countryDropdown: {
    backgroundColor: Colors.LIGHT_GREY,
    position: 'absolute',
    width: Display.setWidth(80),
    height: Display.setHeight(50),
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    zIndex: 3,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    marginHorizontal: 20,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});
