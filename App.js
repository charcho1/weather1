import React from 'react';
import { StyleSheet, Text, View,KeyboardAvoidingView, Platform, TextInput, ImageBackground,
ActivityIndicator,
StatusBar } from 'react-native';
//keyboardavoiding view allows auto-avoidance of keyboard and can be used instead of view
//note that must also specify behavior in KAV below
//AI: displays a loading spinner
// statusbar: allows modification of app status bar
import SearchInput from "./components/SearchInput"
import getImageForWeather from './utils/getImageForWeather'
import {fetchLocationId, fetchWeather} from './utils/api'
//export default function App() must be changed to below in order to define classes
export default class App extends React.Component {
  /*constructor (props) {
    super(props); RN allows us to do wihtout constructor and super using class properties transformation*/
    state ={
      loading: false,//add loading and error in the state
      error: false,
      location: ' ',//ComponentDidMount already sets place to SF so no need to specify here
      temperature: 0,
      weather:'',
    }
  

  componentDidMount(){
    this.handleUpdateLocation('San Francisco');
  }
    handleUpdateLocation =async city=> {
      if (!city) return;

      this.setState({loading:true}, async() =>{
        try{
          const locationId= await fetchLocationId(city);
          const {location,weather,temperature} = await fetchWeather(
            locationId,
          );

          this.setState({
            loading:false,
            error:false,
            location,
            weather,
            temperature,
          });
        } catch (e) {
          this.setState({
            loading:false,
            error:true,
          })
        }
      })
    }
  //put asynchronous function here (eventually). 
  //we want to have a default city when user opens up the app
  //but we can't put this default city in the constructor because the constructor 
  //runs before the component is created while CDM happens AFTER

 
    render () {
      const{location, loading, error, weather, temperature}=this.state
    //Now we must have a way for child component to retrieve the inputted location and communciate this to the App
    //we must put render () on top because we must define and pass in {location} within the return
    return (
    
      <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"> 
          <StatusBar barStyle="light-content"/>
         
          <ImageBackground 
            source={getImageForWeather(weather)}
            style={styles.imageContainer}
            imageStyle={styles.image}>
            <View style={styles.detailsContainer}>
              <ActivityIndicator animating ={loading} color={"white"} size = "large"/>
              {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any city"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
            </View>
            </ImageBackground>
      </KeyboardAvoidingView>


      //clearbuttonmode is only for ios
    );
  }
}
/*Above, App: parent; SearchInput: child. 
<statusbar: allows us to change status bar using barStyle prop which changes color of text in the bar
<Activityindicator: animating prop is set to state.loading attribute
<Imagebackground: a builtin compnent that is basically <View> <Image>.
We set its source to 
Note we can put <view> inside <KAV> although both are views(?)
 */

 /*this whole {(!loading && onwards is called conditional rendinering. basically, if not loading
  1. and error, display could not display weather
  2. and no error, display the info we are interested in*/

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
