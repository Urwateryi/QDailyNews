/**
 * Description:账号设置
 *
 * Author: zoe
 * Time: 2018/5/22 0022
 */
import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity,Dimensions} from "react-native";
import BaseComponent from "../../base/BaseComponent";
import Images from "../../resources/Images";
import Colors from "../../resources/Colors";
import Constants from "../../config/Constants";
import { Actions } from "react-native-router-flux";

export default class AccountPage extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            head: "",
            name:"Zoey",
            bref:"DO U LUV ME TOO?"
        };
    }

    renderComponent() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this._goSetting}
                    style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Image style={styles.head}
                               source={this.state.head == "" ? Images.all.ic_default_head : {uri: this.state.head}}/>
                        <View style={styles.userInfo}>
                            <Text style={styles.name}>{this.state.name}</Text>
                            <Text style={styles.content}>{this.state.bref}</Text>
                        </View>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </TouchableOpacity>

                <View style={styles.space}/>

                <View style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.content}>我的收藏</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.content}>我的評論</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.content}>我的消息</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </View>

                <TouchableOpacity
                    activeOpacity={0.5}//点击时的透明度
                    style={styles.btn}
                    //点击事件，要记得绑定
                    onPress={this.logOut}>
                    <Text style={{fontSize:15,color:Colors.primary,fontWeight:'bold'}}>
                        注 销
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    initTitle() {
        this.setTitleCenter('个人中心');
    }

    initData() {
        this.showLoad()
        this.hideLoad()
    }

    _goSetting=()=>{
        Actions.push('SettingPage')
    }

    logOut=()=>{

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },tag:{
        fontSize:15,
        color:Colors.light_gray,
        marginRight: 15
    },
    name:{
        fontSize:18,
        fontWeight:'bold',
        color:Colors.black,
        marginBottom: 10
    },
    content:{
        fontSize:15,
        color:Colors.black
    },
    subItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo:{
        justifyContent:'center',
        flexDirection:'column'
    },
    head: {
        width: 80,
        height: 80,
        borderRadius: 30,
        marginRight:15,
        justifyContent: 'flex-start',
    }, itemContainer: {
        padding:15,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor : Colors.border,
        borderBottomWidth : Constants.divideLineWidth
    }, next: {
        width: 15,
        height: 20,
        justifyContent: 'flex-end',
    },space:{
        marginTop: 30
    },btn:{
        height:50,
        width:Dimensions.get('window').width-100,
        borderRadius: 10,//按钮圆角
        alignSelf:'center',
        backgroundColor:Colors.bg,
        borderColor:Colors.primary,
        borderWidth:1,
        marginTop:100,
        justifyContent:'center',
        alignItems:'center'//显示Text组件居中
    }
});