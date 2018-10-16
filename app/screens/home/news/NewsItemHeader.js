import React,{ PureComponent } from "react";
import { StyleSheet ,Image,View,Text} from "react-native";
import Images from "../../../resources/Images";

/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/4/24 0024
 */
export default class NewsItemHeader extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={Images.menu.ic_menu_about}/>
                <Text style={styles.title}>这个设计了不起</Text>
                <Image style={[styles.img,{ marginRight : 15}]} source={Images.item.ic_new}/>
                <Image style={styles.img} source={Images.item.ic_login}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor:'white',
        padding:15,
        flexDirection : 'row',
        alignItems:'center'
    },img:{
        width:20,
        height:20,
        resizeMode:'center'
    }, title : {
        flex:1,
        marginLeft:10,
        fontSize :15,
        color :'black'
    }
});