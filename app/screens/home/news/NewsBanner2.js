/**
 * Description:News页轮播图
 *
 * Author: zoe
 * Time: 2018/4/23 0023
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Image,
    Dimensions,
    Platform
} from 'react-native';
import Swiper from "react-native-swiper";

let {width} = Dimensions.get('window');
const ios = Platform.OS;

export default class NewsBanner2 extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderImgs(){
        let bannersList=this.props.data;
        let bannerViews = [];
        for(let i=0;i<bannersList.length;i++){
            let imageUrl=bannersList[i].post.image;
            bannerViews.push(
                <Image
                    key={i}
                    source={{uri: imageUrl}}
                    style={{width: Dimensions.get('window').width, height: 220}}
                />
            )
        }
        return bannerViews;
    }

    render() {
        return (
            <Swiper height={200} showsButtons={true} loop={true} autoPlay={true} index={0}>
                {this.renderImgs()}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: ios === 'ios' ? 25 : 0
    },
    circleContainer: {
        width: width,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});