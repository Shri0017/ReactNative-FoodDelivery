import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Seperator({ height , width , ...extraProps}) {
  return <View style={ {height,width,...extraProps} } />
}

Seperator.defaultPorps = {
height: 0,
width: 0
}
const styles = StyleSheet.create({})