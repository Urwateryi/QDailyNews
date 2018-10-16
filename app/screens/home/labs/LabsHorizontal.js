/**
 * Description:Labs页面，水平广告位
 *
 * Author: zoe
 * Time: 2018/4/23 0023
 */
import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ToastAndroid,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

export default class LabsHorizontal extends PureComponent {

    click(id) {
        ToastAndroid.show(id + "", ToastAndroid.SHORT)
    }

    renderItemH() {
        let itemAry = [];
        for (let i = 0;
            i < this.props.data.length;
            i++) {
            let img = this.props.data[ i ].image;
            itemAry.push(
                <TouchableOpacity key={1000+i} activeOpacity={0.5} onPress={() => this.click(this.props.data[ i ].id)}>
                    <ImageBackground style={styles.itemBg} source={{ uri : img }}>
                        <Text style={styles.title}>{this.props.data[ i ].title}</Text>
                        <Text style={styles.description}>{this.props.data[ i ].description}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }
        return itemAry;
    }

    render() {
        return (
            <View>
                <ScrollView
                    style={styles.bg}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}>{
                    this.renderItemH()
                }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bg : {
        backgroundColor : 'white',
        padding:18,
    },
    itemBg : {
        marginRight : 18,
        width : 300,
        height : 150,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor:'#22222222'
    },
    title : {
        color : 'white',
        fontSize : 15,
        fontWeight:'bold',
    },
    description : {
        color : 'white',
        fontSize : 12,
    }
});