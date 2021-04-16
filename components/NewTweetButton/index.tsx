import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const NewTweetButton = () => {
  const navigation = useNavigation()

  const onPress = () => {
    navigation.navigate('NewTweet')
  }

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons name={'feather'} size={30} color={'white'} />
    </TouchableOpacity>
  )
}

export default NewTweetButton

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: Colors.light.tint,
    bottom: 20,
    right: 30,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
