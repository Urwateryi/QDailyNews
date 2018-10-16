import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Colors";

/**
 * Description:LabsItem的样式表
 *
 * Author: zoe
 * Time: 2018/4/25 0025
 */
export default styles = StyleSheet.create({
    container : {
        width : Dimensions.get('window').width,
        backgroundColor : 'white',
        paddingBottom:15
    }, img : {
        flexDirection : 'row',
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').width / 2,
        justifyContent : 'flex-end',
        paddingTop : 10
    }, join : {
        width : 80,
        height : 60,
    }, title : {
        paddingLeft : 15,
        color : 'black',
        fontSize : 15,
        letterSpacing : 25
    }, bref : {
        marginTop : 10,
        paddingLeft : 15,
        fontSize : 12,
        color : Colors.gray,
        letterSpacing : 25,
        lineHeight : 18,
    }, titleBg : {
        paddingTop : 15
    }, brefBg : {
        margin : 15
    }
});