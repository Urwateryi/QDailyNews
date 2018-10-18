/**
 * Description:账号设置
 *
 * Author: zoe
 * Time: 2018/5/22 0022
 */
import React from 'react';
import {View, Image, Text, StyleSheet, Alert, TouchableOpacity,ActionSheetIOS} from "react-native";
import BaseComponent from "../../base/BaseComponent";
import Images from "../../resources/Images";
import Colors from "../../resources/Colors";
import Constants from "../../config/Constants";

let BUTTONS = [
    '相册',
    '拍照',
    '取消',
];

const PHOTO = 0;
const PICTURE = 1 ;
const CANCEL_INDEX = 2;

export default class SettingPage extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            head: "",
            name:"Zoey",
            bref:"DO U LUV ME TOO?"
        };
    }

    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: PHOTO,
            },
            (index) => {
                this.setState({ clicked: BUTTONS[index] });
            });
    }

    renderComponent() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.changeHead}
                    style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Image style={styles.head}
                               source={this.state.head == "" ? Images.all.ic_default_head : {uri: this.state.head}}/>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.changeName}
                    style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.tag}>名字</Text>
                        <Text style={styles.content}>{this.state.name}</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.tag}>简介</Text>
                        <Text style={styles.content}>{this.state.bref}</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>

                </TouchableOpacity>
                <View style={styles.space}/>
                <View style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.content}>修改密碼</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.content}>清除缓存</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.subItem}>
                        <Text style={styles.content}>关于我们</Text>
                    </View>
                    <Image style={styles.next} source={Images.all.ic_next}/>
                </View>
            </View>
        );
    }

    initTitle() {
        this.setTitleCenter('設置');
    }

    initData() {
        this.showLoad()
        this.hideLoad()
    }

    changeName=()=>{
        Alert.alert("修改姓名")
    }

    changeHead=()=>{
        this.showActionSheet()
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
    content:{
        fontSize:15,
        color:Colors.black
    },
    subItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
    }

});