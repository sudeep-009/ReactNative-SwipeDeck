import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Deck from './src/screen/Deck';
import { Card, Button } from 'react-native-elements';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];

class App extends React.Component {
  renderItem = (item) => {
    return(
       <Card key={item.id}  image={{uri: item.uri}} title={item.text}>
         <Button
            icon={{name: "album"}}
            backgroundColor='green'
            title="View Now"
          />
        </Card>
    );
  }
  renderNoMoreCards = (item) => {
    return(
      <Card 
       title="All Done"
      >
        <Text>There is no more content to Show!</Text>
        <Button 
           title="Click To Load More"
           onPress={this.renderItem(item)}
        />
      </Card>
    )
  }
  render() {
    return(
      <View style={styles.screen}>
        <Deck 
           data={DATA}
           renderCard={this.renderItem}
           renderNoMoreCards={this.renderNoMoreCards}
        />
        {/* {DATA.map(item => this.renderItem(item)
          )} */}
      </View>
    )
  }
  
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'grey'
  }
});

export default App;