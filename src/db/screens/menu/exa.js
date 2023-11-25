import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';



class Examp extends Component  {


    constructor(Props){
        super(Props);
        this.state={
            loading: false,
            data: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () =>{
        const url ='https://randomuser.me/api/?seed=1&page=1&results=20';

        this.setState({loading:true})

        fetch(url)
        .then(res => res.json())
        .then (res =>{
            this.setState({
                data: res.results,
                loading:false,
            })
        })
    };

  render() {

    return (
      <View>
        <FlatList
        
        data={this.state.data}
        renderItem={({item})=>(

          

          <Text onPress={console.log('pushing')} style={{margin:10, borderColor:'black',borderWidth:2 }}>{item.name.first}</Text>
        )          
      }
      keyExtractor={item => item.email}
        />
      </View>
    )
  }
}

export default Examp