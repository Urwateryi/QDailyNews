/**
 * Description:Labs页面的item
 *
 * Author: zoe
 * Time: 2018/4/23 0023
 */
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    ImageBackground,
    Image,
} from 'react-native';
import Images from "../../../resources/Images";
import labsItemStyles from "../../../resources/styles/LabsItem"
import ItemMore from "../../../components/ItemMore";
import Constants from "../../../config/Constants";

export default class LabsItem extends PureComponent {

    click(){
        ToastAndroid.show("点击了item",ToastAndroid.SHORT)
    }

    render() {
        let item = this.props.data;
        let type = this.props.type;

        console.info("item:", item)

        let image = item.post.image;
        let title = item.post.title;
        let description = item.post.description;

        console.log('title:', title)
        console.log('description:', description)
        return (
            <TouchableOpacity style={[ labsItemStyles.container, { marginBottom : 5 } ]} activeOpacity={0.5} onPress={() => this.click()}>
                <ImageBackground style={labsItemStyles.img} source={{ uri : image }} resizeMode='cover'>
                    <Image
                        style={labsItemStyles.join}
                        source={Images.item.ic_join_news}
                        resizeMode='contain'
                    />
                </ImageBackground>

                <View style={labsItemStyles.titleBg}>
                    <Text style={labsItemStyles.title} numberOfLines={2}>
                        {title}
                    </Text>
                </View>

                <Text style={labsItemStyles.bref}>
                    {description}
                </Text>

                {type === Constants.item_type_lab ? null : <ItemMore/>}

            </TouchableOpacity>
        );
    }
}