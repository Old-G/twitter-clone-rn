import React from 'react'
import { StyleSheet, View } from 'react-native'
import LeftContainer from './LeftContainer'
import MainContainer from './MainContainer'

import {TweetType} from '../../types'

export type TweetProps = {
  tweet: TweetType,
}

const Tweet = ({tweet}: TweetProps) => (
  <View style={styles.container}>
    <LeftContainer user={tweet.user}/>

    <MainContainer tweet={tweet} />
  </View>
)

export default Tweet

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor:'lightgrey',
  }
})