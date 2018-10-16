import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Colors";

/**
 * Description:ItemMore的样式表
 *
 * Author: zoe
 * Time: 2018/4/25 0025
 */
export default styles = StyleSheet.create({
    more:{
        flexDirection:'row',
        paddingLeft:15,
        marginTop:10,
    },moreTxt:{
        alignSelf:'center',
        fontSize:11,
        color :Colors.light_gray
    },moreImg:{
        alignSelf:'center',
        width:15,
        height:15,
        marginRight:5
    }
});