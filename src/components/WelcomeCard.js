import { StyleSheet, Text, View ,Image } from 'react-native'
import React from 'react'
import { Display } from '../utils'
import { Fonts, Images } from '../constants'

export default function WelcomeCard({title, content , image} ) {
  return (
    <View style = { styles.container }>
        <Image style = {styles.image} source={Images[image]} resizeMode='contain' />
      <Text style = {styles.title}> {title} </Text>
      <Text style = {styles.content}> {content} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        width: Display.setWidth(100),
    },
    image : {
            height: Display.setHeight(30),
            width: Display.setWidth(60)
    },
    title : {
            fontSize:22,
            fontFamily: Fonts.POPPINS_BOLD
    },
    content: {
        fontSize:18,
        fontFamily:Fonts.POPPINS_LIGHT,
        textAlign: 'center',
        marginHorizontal:20
    }

})