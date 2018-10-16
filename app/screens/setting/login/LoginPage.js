/**
 * Description:登录
 *
 * Author: zoe
 * Time: 2018/5/22 0022
 */
import React, { PureComponent } from 'react';
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../../../resources/Colors";
import Constants from "../../../config/Constants";
import Images from "../../../resources/Images";
import NetUtil from "../../../utils/NetUtil";
import Api from "../../../network/Api";

export default class LoginPage extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            account : '',//初始值
            password : '',//初始值
        };
    }

    /**
     * 登录
     * @param type 登录的类型
     * @returns {Promise<void>}
     */
    async login(type) {

        let params = new Map();

        if (type === Constants.LOGIN_PHONE) {
            params.set('user[phone]', this.state.account);
        } else if (type === Constants.LOGIN_EMAIL) {
            params.set('user[email]', this.state.account);
        }
        params.set('user[password]', this.state.password);
        params.set('user[remember_me]', Constants.LOGIN_REMEMBER);

        await NetUtil.postForm(type === Constants.LOGIN_PHONE ? Api.loginPhone : Api.loginEmail,
            params,
            result => {
                console.log("result is :", result);

                let response = result.response;

                this.props.loginStore.id = response.id;
                this.props.loginStore.user_id = response.user_id;
                this.props.loginStore._alias = response._alias;
                this.props.loginStore.username = response.username;
                this.props.loginStore.face = response.face;
                this.props.loginStore.description = response.description;
                this.props.loginStore.email = response.email;
                this.props.loginStore.phone = response.phone;
            },
            err => {
                console.log("err is :", err.toString());

            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.backImg} source={Images.all.ic_back}/>
                    <Text style={styles.title}>登录</Text>
                </View>

                <Image style={styles.head} source={Images.home.ic_more}/>

                <TextInput
                    placeholder='手机号码/邮箱'
                    placeholderTextColor={Colors.light_gray}
                    underlineColorAndroid='transparent'
                    maxLength={20}
                    onChangeText={(event) => this.setState({ account : event })}
                    style={styles.inputPhone}
                />

                <TextInput
                    placeholder='密码'
                    placeholderTextColor={Colors.light_gray}
                    underlineColorAndroid='transparent'
                    maxLength={20}
                    onChangeText={(event) => this.setState({ password : event })}
                    style={styles.inputPassWord}
                />

                <Text style={styles.forget}>忘记密码</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.login(Constants.LOGIN_PHONE)}>
                    <Text style={styles.loginBtn}>登录</Text>
                </TouchableOpacity>
                <Text style={styles.register}>注册新账号</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 20,
        alignItems : 'center',
        backgroundColor : 'white'
    },
    header : {
        width : Dimensions.get('window').width,
        alignItems : 'center',
        flexDirection : 'row',
    },
    backImg : {
        alignSelf : 'flex-start',
        width : 35,
        height : 35
    },
    title : {
        flex : 1,
        alignSelf : 'center',
        fontSize : 15,
        color : 'black'
    },
    head : {
        marginTop : 40,
        width : 100,
        height : 100,
        borderRadius : 100,
    },
    inputPhone : {
        marginTop : 30,
        width : Dimensions.get('window').width,
        height : 50,
        alignSelf : 'flex-start',
        borderBottomColor : Colors.border,
        borderBottomWidth : Constants.divideLineWidth
    },
    inputPassWord : {
        height : 50,
        width : Dimensions.get('window').width,
        alignSelf : 'flex-start',
        borderBottomColor : Colors.border,
        borderBottomWidth : Constants.divideLineWidth
    },
    forget : {
        marginTop : 20,
        flexDirection : 'row',
        alignSelf : 'flex-end',
        fontSize : 12,
        color : 'gray'
    },
    loginBtn : {
        marginTop : 20,
        fontSize : 18,
        color : 'white',
        fontWeight : '200',
        width : 150,
        backgroundColor : Colors.primary,
        textAlignVertical : 'center',
        textAlign : 'center',
        height : 50,
        borderRadius : 20
    },
    register : {
        marginTop : 20,
        fontSize : 15,
        color : 'black'
    }
});