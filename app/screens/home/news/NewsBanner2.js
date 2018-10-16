/**
 * Description:News页轮播图
 *
 * Author: zoe
 * Time: 2018/4/23 0023
 */
import React, {PureComponent} from 'react';
import {
    Image,
    Dimensions,
} from 'react-native';
import Swiper from "react-native-swiper";
import Colors from "../../../resources/Colors";

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
            <Swiper
                height={200}
                loop={true}
                autoPlay={true}
                index={0}
                activeDotColor={Colors.primary}
                dotColor={Colors.light_gray}
            >
                {this.renderImgs()}
            </Swiper>
        );
    }
}