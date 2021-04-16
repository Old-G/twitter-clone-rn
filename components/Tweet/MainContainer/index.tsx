import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import {S3Image} from 'aws-amplify-react-native'
import moment from 'moment'
import {TweetType} from '../../../types'
import Footer from './Footer'

export type MainContainerProps = {
  tweet: TweetType
}

const MainContainer = ({tweet}: MainContainerProps) => (
  <View style={styles.container}>
    <View style={styles.tweetHeaderContainer}>
      <View style={styles.tweetHeaderNames}>
      <Text style={styles.name}>{tweet.user.name}</Text>
      <Text style={styles.username}>{tweet.user.username}</Text>
      <Text style={styles.time}>{moment(tweet.createdAt).fromNow()}</Text>
      </View>
      <View>
        <Ionicons name={'chevron-down'} size={16} color={'grey'} />
      </View>
    </View>
    <View>
      <Text style={styles.content}>{tweet.content}</Text>
      {!!tweet.image && <S3Image style={styles.image} imgKey={tweet.image}/>}
    </View>
    <Footer tweet={tweet} />
  </View>
)

export default MainContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  tweetHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tweetHeaderNames: {
    flexDirection: 'row'
  },
  name: {
    marginRight: 5,
    fontWeight: 'bold',
  },
  username: {
    marginRight: 5,
    color: 'grey'
  },
  time: {
    marginRight: 5,
    color: 'grey'
  },
  content: {
    marginTop: 5,
    lineHeight: 18,
  },
  image: {
    marginVertical: 10,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15,
    overflow: 'hidden'
  }
})