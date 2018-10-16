import React,{ PureComponent } from "react";
import { StyleSheet,View } from "react-native";

/**
 * Description:圆角背景
 *
 * Author: zoe
 * Time: 2018/4/24 0024
 */

export default class BgFillet extends PureComponent {
    render() {
        return (
            <View style={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : 'white',
        borderRadius:10
    }
})