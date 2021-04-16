import { AntDesign } from '@expo/vector-icons'
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import {API, Auth, graphqlOperation, Storage} from 'aws-amplify'
import ProfilePicture from '../components/ProfilePicture'
import Colors from '../constants/Colors'
import {createTweet} from '../graphql/mutations'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values'


const NewTweetScreen = () => {
  const [tweet, setTweet] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUrl(result.uri);
    }
  }

  const uploadImage = async () => {
    try {
      const response = await fetch(imageUrl)

      const blob = await response.blob()

      const urlParts =imageUrl.split('.')
      const extension = urlParts[urlParts.length - 1]
      console.log(extension);
      
      const key = `${uuidv4()}.${extension}`

      await Storage.put(key, blob)

      return key
      
    } catch (err) {
      console.log(err);
    }
    return ''
  }

  const navigation = useNavigation()

  const onPostTweet = async () => {
    let image
    if(!!imageUrl) {
      image = await uploadImage()
    }
  
    try {
      const currentUser = await Auth.currentAuthenticatedUser({bypassCache: true})

      const newTweet = {
        content: tweet,
        image,
        userID: currentUser.attributes.sub,
      }
      await API.graphql(graphqlOperation(createTweet, {input: newTweet}))
      navigation.goBack()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>

        <AntDesign name={'close'} size={30} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <ProfilePicture image={'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg'} />
        <View style={styles.inputsContainer}>
          <TextInput value={tweet} onChangeText={(value) => setTweet(value)} multiline={true} numberOfLines={3} style={styles.tweetInput} placeholder={"What's happening?"} />
          <TouchableOpacity>
            <Text style={styles.pickImage} onPress={pickImage}>Pick an image</Text>
          </TouchableOpacity>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        
      </View>
    </SafeAreaView>
  )
}

export default NewTweetScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    backgroundColor: 'white'
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  newTweetContainer: {
    flexDirection: 'row',
    padding: 15
  },
  inputsContainer: {
    marginLeft: 10
  },
  tweetInput: {
    height: 100,
    maxHeight: 300,
    fontSize: 18
  },
  pickImage: {
    color: Colors.light.tint,
    fontSize: 18,
    marginVertical: 10
  },
  image: {
    width: 150,
    height: 150,
  }
})
