import { StyleSheet, Text, View ,TouchableOpacity,Animated, Easing} from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../constants'



const containerStyle = (size, isActive) => ({
  backgroundColor:isActive ?   Colors.DEFAULT_GREEN : Colors.DEFAULT_GREY,
  height: 32*size,
  width: 64*size,
  borderRadius:32,
  padding: 4*size
})

const toggleStyle = (size , animatedValue) => ({
  height: 24*size,
  width: 24*size,
  backgroundColor:Colors.DEFAULT_WHITE,
  borderRadius:32,
  transform:[
    {
    translateX : animatedValue
  }
] 
})

export default function ToggleButton({size}) {

  const [isActive , setIsActive] = useState(false);
  const [animatedValue , setAnimatedValue] = useState(new Animated.Value(0));

  const toggleHandle = (size) => {
    Animated.timing(animatedValue,  {
      toValue : isActive ? 0 :32*size,
      duration:250,
      easing : Easing.bounce,
      useNativeDriver:true
    }).start();
    setIsActive(!isActive)
  }

  return (
    <TouchableOpacity activeOpacity={0.8} style={containerStyle(size, isActive)} onPress = {() => toggleHandle(size)}>
     <Animated.View style={toggleStyle(size,animatedValue)} />
    </TouchableOpacity>
  )
}

