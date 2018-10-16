import { StyleSheet } from "react-native";
import Colors from "../Colors";

/**
 * Description:NewsHeadline的样式表
 *
 * Author: zoe
 * Time: 2018/4/25 0025
 */
export default styles = StyleSheet.create({
    bg : {
        backgroundColor : 'white',
        borderRadius : 10,
        padding : 10,
        marginLeft : 5,
        marginRight : 5,
        marginTop : 10,
        marginBottom : 10
    },
    head : {},
    headTitle : {
        fontSize : 15,
        color : 'black',
        marginLeft:10
    },
    headPic : {},
    title : {
        letterSpacing : 10,
        lineHeight : 20,
        fontSize : 12
    },
    checkDetail : {
        color : Colors.light_gray,
        fontSize : 12,
    },
    headImg:{
        width :30,
        height:30
    },
    item : {
        flexDirection : 'row',
        paddingLeft : 10,
        paddingRight : 10,
    },
    dot : {
        fontSize : 30,
        color : Colors.primary,
        marginRight : 15
    }
})