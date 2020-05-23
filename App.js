import React from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView, Platform, TextInput, ImageBackground } from 'react-native';
//keyboardavoiding view allows auto-avoidance of keyboard and can be used instead of view
//note that must also specify behavior in KAV below
import SearchInput from "./components/SearchInput"
import getImageForWeather from './utils/getImageForWeather'

//export default function App() must be changed to below in order to define classes
export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state ={
      location: 'San Francisco'
    }
  }

  handleUpdateLocation =(city) => {
    this.setState ({
      location:city,
    })
  }
    render () {
      const{location}=this.state
    //Now we must have a way for child component to retrieve the inputted location and communciate this to the App
    //we must put render () on top because we must define and pass in {location} within the return
    return (
    
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"> 
          <ImageBackground 
            source={getImageForWeather('Clear')}
            style={styles.imageContainer}
            imageStyle={styles.image}/>
            <View style={styles.detailsContainer}>
          <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
          <Text style={[styles.smallText, styles.textStyle]}>Light Cloud</Text>
          <Text style={[styles.largeText, styles.textStyle]}>24</Text>
          <SearchInput
            autoCorrect = {false}
            placeholder = "Search any city"
            placeholderTextColor="white"
            style = {styles.textInput}
            clearButtonMode="always"
            onSubmit={this.handleUpdateLocation} />
            </View>
            
      </KeyboardAvoidingView>


      //clearbuttonmode is only for ios
    );
  }
}
/*Above, App: parent; SearchInput: child. 
<Imagebackground: a builtin compnent that is basically <View> <Image>.
We set its source to 
Note we can put <view> inside <KAV> although both are views(?)
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    //we must comment out the AI and JC above such that the background image will take up the entire space
  },
  textStyle: {
    textAlign: 'center',
    fontFamily:Platform.OS === 'ios' ? 'AvenirNext-Regular': 'Roboto',
    color: 'white'
  },
  largeText: {
    fontSize:44,
  },
  smallText: {
    fontSize: 18,
  },
    imageContainer: {
      flex:1,
//rmb flex:1 means the component will take up any remaining room relative to sibling omponents
// since IB is the only nested element within KAV, this means it will take up the whole space
//the container is like view, and image is a component within that view.. so both must take up flex=1?
    },
  image: {
    flex:1,
    width:null,
    height:null,
    resizeMode: 'cover',
    //by default, images have width and height = to that of source image. so we must disable it to fill it up

    //resizemode: allows us to resize the pic to fit the component size
    
  },
  detailsContainer: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  }
  //this allows the container in imagebackground to fill up entire space of parent component and adds a semi-transparent overlay 



});
