import React, {PureComponent} from "react";
import {StyleSheet, View, TextInput, Dimensions, Text} from "react-native";
import Colors from "../resources/Colors";
import Images from "../resources/Images";


/**
 * Description:搜索框
 *
 * Author: zoe
 * Time: 2018/10/18
 * E-mail: 807861340@qq.com
 */
export default class SearchComponent extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            search: "",
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>

                    <TextInput
                        autoCapitalize={'words'}
                        autoCorrect={true}
                        autoFocus={true}
                        multiline={false}
                        style={styles.input}
                        onChangeText={(content) => {
                            this.props.onChangeText(content)
                        }}
                        keyboardAppearance={"light"}
                        ref={"searchinput"}
                        returnKeyType={"search"}
                        placeholder={"请输入您要搜索的内容"}
                        placeholderTextColor={Colors.light_gray}
                        maxLength={10}
                        blurOnSubmit={true}
                        underlineColorAndroid={'transparent'}
                    />
                </View>
                <Text style={styles.cacel}>取消</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding:10,
        height: 60,
        flex: 1,
        backgroundColor: Colors.white,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderWidth: 1,
        paddingLeft:15,
        paddingRight:15,
        borderColor: Colors.light_gray,
        borderRadius: 10,
        width: Dimensions.get('window').width - 100,
        height: 40
    },
    input: {
        paddingLeft:10,
    },
    cacel: {
        fontSize: 15,
        marginLeft:15,
        color: Colors.gray,
    }
})
