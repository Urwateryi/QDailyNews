import React, { PureComponent } from "react";
import {
    ImageBackground,
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    Dimensions
} from 'react-native';
import {Actions } from 'react-native-router-flux';
import Images from "../../../resources/Images";

/**
 * Description:Lab的广告栏
 *
 * Author: zoe
 * Time: 2018/5/2 0002
 */
export default class LabsAds extends PureComponent {

    clickAd(url) {
        Actions.WebViewPage({'url':url})
    }

    render() {
        let image = this.props.image;
        let url = this.props.url;

        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.clickAd(url)}>
                <ImageBackground style={styles.bg} source={{ uri : image }}>
                    <View style={styles.info}>
                        <Image style={styles.img} source={Images.item.ic_ad}/>
                        <Text style={styles.infoTxt}>广告</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    bg : {
        width : Dimensions.get('window').width,
        height : Dimensions.get('window').width / 3,
        justifyContent : 'flex-end',
        padding : 7
    },
    info : {
        flexDirection : 'row',
        alignItems : 'center',
        marginLeft:15
    },
    img : {
        width : 20,
        height : 20
    },
    infoTxt : {
        color : 'white',
        fontSize : 12,
        marginLeft : 5,
    }
})