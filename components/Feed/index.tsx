import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import {API, graphqlOperation} from 'aws-amplify'
import Tweet from '../Tweet'
import {listTweets} from '../../graphql/queries'

const Feed = () => {
  const [tweets, setTweets] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchTweets =  async () => {
    setLoading(true)
    try {
      const tweetsData = await API.graphql(graphqlOperation(listTweets))
      setTweets(tweetsData.data.listTweets.items)
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    fetchTweets()
  }, [])

  return (
    <View style={{width: '100%'}}>
      <FlatList 
      data={tweets} 
      renderItem={({item}) => <Tweet tweet={item} />} 
      keyExtractor={(item) => item.id}
      refreshing={loading}
      onRefresh={fetchTweets}
      />
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})
