import React, { Component} from 'react';
import { Text, StyleSheet,View,Image,FlatList} from 'react-native';

export default class Nac extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        data: [],
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
      }

    }

    loadUsers = () => {

      // Retornar apenas um usuário na lista  
      //fetch("https://reqres.in/api/users/12") 
      fetch("https://reqres.in/api/users?page=2")
          .then( res => res.json() )
          .then( res => {

            var first_name = res['data']['first_name']
            var last_name = res['data']['last_name']
            var email = res['data']['email']
            var avatar = res['data']['avatar']

              this.setState({
                  data: res.data || [],
                  first_name: first_name,
                  last_name: last_name,
                  email: email,
                  avatar:avatar
              })
          })
          .catch(error=>console.log(error))
    }

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.line}>
                    <Image
                        source={{uri: this.state.avatar }}
                            style={styles.avatar}
                     />
                <View style={styles.info}> 
                    <Text style={styles.name}>{this.state.first_name} {this.state.last_name}</Text>
                    <Text style={styles.email}>{this.state.email}</Text>
                </View>
            </View>
                <FlatList
                    
                    data={this.state.data}
                    renderItem={({item}) => (

                        <View style={styles.line}>
                            <Image
                                source={{uri: item.avatar }}
                                style={styles.avatar}
                            />

                            <View style={styles.info}>
                                <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
                                <Text style={styles.email}>{item.email}</Text>
                            </View>

                        </View>

                    )}
                    keyExtractor={ item => item.id}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

  container:{
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 0,
    borderBottomWidth: 0
   },
   line: {
     height: 50,
     flexDirection: "row",
     borderBottomColor: "#ccc",
     borderBottomWidth: 1
   },
   avatar: {
     width: 40,
     height: 40,
     borderRadius: 50,
     marginRight: 10,
     alignSelf: "center"
   },
   info: {
     flexDirection: "column",
     justifyContent: "flex-start"
   },
   name: {
     fontSize: 12
   },
   email: {
     fontSize: 14,
     fontWeight: "bold"
   }
})