import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React ,{useRef, useState} from 'react';
import {Colors, Fonts, General} from '../constants';
import {WelcomeCard, Seperator} from '../components';
import {Display} from '../utils';
import { StorageService } from '../services';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';

    const activeStyle = isActive => 
    isActive ? styles.page : {...styles.page ,backgroundColor:Colors.DEFAULT_GREY}


 const Pagination = ({index}) => {
  return (
    <View style={styles.pageContainer}>
        {[...Array(General.WELCOME_CONTENTS.length).keys()].map(( _,i ) => 

            i === index ? (<View style={activeStyle(true)} key={i} />) : (<View style={activeStyle(false)} key={i}/>)
        )
        }
   
    </View>
  );
};


export default function WelcomeScreen({navigation}) {

    const [welcomeListIndex , setWelcomeListIndex] = useState(0);
   
    const welcomeList = useRef();
    const onViewRef = useRef(( {changed} ) => {
        setWelcomeListIndex(changed[0].index);
    });


    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold : 50});

    const pageScroll = () => {
        welcomeList.current.scrollToIndex({
            index:welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
        })
    }

    const dispatch = useDispatch();
    const navigate = () => {
      StorageService.setFirstTimeUse().then(() => {
    dispatch(GeneralAction.setFirstTimeUse())
      })
      navigation.navigate('signin')
    }
    
    return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Seperator height={StatusBar.currentHeight} />
      <Seperator height={Display.setHeight(8)} />

      <View style={styles.welcomeListContainer}>
        <FlatList
            ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={item => item.title}
          horizontal
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <WelcomeCard {...item} />}
        />
      </View>
      <Seperator height={Display.setHeight(8)} />
      <Pagination index={welcomeListIndex}/>
      <Seperator height={Display.setHeight(8)} />
    
    {welcomeListIndex === 2 ? (
    <TouchableOpacity style={styles.gettingStartButton} activeOpacity={0.5} onPress={()=>navigate()} >
         <Text style={styles.gettingStartButtonText}>Get Started !</Text>
    </TouchableOpacity>
   
    ) : (
   <View style={styles.buttonContainer}>
         
          <TouchableOpacity activeOpacity={0.8} style={{marginLeft:10}} onPress={()=> welcomeList.current.scrollToEnd()}>
            <Text style = {styles.buttonText}> SKIP </Text>
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={pageScroll}>
            <Text style = {styles.buttonText}> NEXT </Text>
          </TouchableOpacity>
        
        </View>
     
    )}
      </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  welcomeListContainer: {
    height: Display.setHeight(60),
    // width: Display.setWidth(60)
  },
  pageContainer: {
    flexDirection: 'row',
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 32,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    width: Display.setWidth(90),
    alignItems:'center',
  },
  buttonText:{
    fontSize:16,
    fontFamily:Fonts.POPPINS_BOLD,
    lineHeight:16*1.4
  },
  button:{
    backgroundColor:Colors.LIGHT_GREEN,
    paddingVertical:20,
    paddingHorizontal:11,
    borderRadius:32
  },
  gettingStartButton:{
    paddingVertical:5,
    paddingHorizontal:40,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.DEFAULT_GREEN

  },
  gettingStartButtonText :{
        fontSize:20,
        color:Colors.DEFAULT_WHITE ,
        lineHeight:20*1.4,
        fontFamily:Fonts.POPPINS_MEDIUM
  }
});
