import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

export default class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'',
        }
    }

    /*recall that a class creates an object of serachinput with the property of props
    and super() is required in derived classes in order to reference this within
the constructor.
    Much like how we can access the component’s props with this.props, we can access the component’s
state via this.state. For example if we wanted to output our state property in a single Text
component, we could do this
class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'Hi there!',}};
    render() {
        return <Text>{this.state.text}</Text>
    }
    */
    handleChangeText=text=> {
        this.setState({text});
    }
    handleSubmitEditing =() => {
        const {onSubmit} = this.props;
        const {text} = this.state;

        if (!text) return;
        onSubmit (text);
        this.setState ({text: ''});
    }
    /*above: 
    check if this.state.text is not blank (which means the user has typed something into
the field), and if that’s the case:
1. Run an onSubmit function obtained from the component’s props. We pass text as an
argument here.
2. Clear the text property in state using this.setState()
     */
    
    render () {
        const {placeholder} = this.props;
        const {text} = this.state;
        /*above, we destructureboth objects into individual variables called placeholder and text instead of using
        state such as this.state and this.props.placeholder*/
        return (
            <View style={styles.container}>
                <TextInput 
                    autoCorrect = {false}
                    value ={text}
                    placeholder={placeholder}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    clearButtonMode ="always"
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}/>
            </View>
        /*underlinecolorandroid: in android, the default text will
        have an underline. we get rid of it by doing this
        
        value: now represents {text}, which itself is = this.state
        onSUbmitEditing: 
        onChangeText: alows TextInput to pass in a function called handleChangeTExt wihc returns the inptted text as an argument
        This is an example of a callback function
        this allows the child (textinput) to notify the parent (searchinput) of the result the user has inputted
        But because currently handlechangetext has a different local scope (rmb outisders don't have access to insider functions)
        we mjust use property initializers. Ie defining handlechangetext as an arrow function. 

        BUT we can't pass properties from child (searchinput) to app (parent). 
        Properties are owned by parent to child, so must use state instead
        */

        )
    }
}
const styles = StyleSheet.create ({
    container: {
         height: 40,
         marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
         borderRadius: 5,
    },
    textInput: {
        flex:1,
        color:'white',
    },
});

