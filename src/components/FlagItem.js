import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../constants'
import { StaticImageService } from '../services'

export default function FlagItem({code , name , dial_code, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress = {() => onPress({code , name , dial_code})}>
        <Image source={{uri:`${StaticImageService.getFlagIcon(code)}`}} style={styles.flagimg}/>
      <Text style={styles.flagText}>{dial_code}</Text>
      <Text style={styles.flagText}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal:10,
        alignItems: 'center',
        flexDirection:'row',
        marginTop:10,
    },
    flagimg:{
        height: 17,
        width:26,
        marginRight:10
    },
    flagText:{
        fontSize:14,
        lineHeight:14*1.4,
        color:Colors.DEFAULT_BLACK,
        fontFamily:Fonts.POPPINS_MEDIUM,
        marginRight:10
    }
})