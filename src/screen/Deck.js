import React, { Component } from 'react';
import { View, Animated,StyleSheet, PanResponder, Dimensions, LayoutAnimation, UIManager, zIndex } from 'react-native';
 
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_WIDTH = SCREEN_WIDTH * 0.35;

class Deck extends Component {
    static defaultProps = {
        swipeRight: ()=>{},
        swipeLeft: ()=>{}
    }
    constructor(props) {
        super(props); {
            const panResponder = PanResponder.create({
               onStartShouldSetPanResponder: () => true,
               onPanResponderMove: (event,gesture) => {
                   position.setValue({x: gesture.dx, y: gesture.dy})
               },
               onPanResponderRelease: (event,gesture) => {
                   if(gesture.dx > SWIPE_WIDTH) {
                      this.onSwipeExtreme('right');
                   }
                   else if (gesture.dx < -SWIPE_WIDTH) {
                       this.onSwipeExtreme('left')
                   }
                   else
                    this.resetAnimation();
               }
            });
            const position = new Animated.ValueXY();
            this.state = {panResponder, position, index: 0}
        }
    }
    componentDidUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }
    onSwipeExtreme(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH: -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: {x: x, y: 0},
            duration: 250,
            useNativeDriver: true
        }).start(()=> this.onSwipeComplete(direction));
    };
    resetAnimation () {
        Animated.timing(this.state.position,{
            toValue: {x: 0, y: 0},
            
        }).start();
    }
    
    cardStyle () {
        const rotate = this.state.position.x.interpolate({
            inputRange: [ -SCREEN_WIDTH*1.5, 0, SCREEN_WIDTH*1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });
        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate}]
        };            
    }
    onSwipeExtreme(direction) {
        const { swipeRight, swipeLeft } = this.props;
        const item = this.props.data[this.state.index];
        direction === 'right' ? swipeRight(item) : swipeLeft(item);
        this.state.position.setValue({x: 0, y: 0})
        this.setState({index: this.state.index + 1})
    }
    renderCards = () => {
        if(this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards(this.props.data)
        }
        else
        return this.props.data.map((item,i) => {
            if(i < this.state.index) {
                return null;
            }
            // if(i === this.state.index) {
            //     return(
            //         <Animated.View
            //         key={item.id}
            //          style={[this.cardStyle(), styles.cardStyle]}
            //          {...this.state.panResponder.panHandlers}
            //         >
            //             { this.props.renderCard(item)}
            //         </Animated.View>
            //     );
            // }
            else if( i > this.state.index) {
                return(
                    <Animated.View key={item.id} style={[styles.cardStyle,{top: (i- this.state.index)*10, zIndex: -i}]}>
                    {this.props.renderCard(item)}
                   </Animated.View>
                )
            }
            else if(i === this.state.index){
                return(
                    <Animated.View
                            key={item.id}
                             style={[this.cardStyle(), styles.cardStyle,zIndex: 99]}
                             {...this.state.panResponder.panHandlers}
                            >
                                { this.props.renderCard(item)}
                    </Animated.View>
                )
            }            
        }).reverse();
    }
   

    render() {
        return(
            <View>
                {this.renderCards()}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
});

export default Deck;