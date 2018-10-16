/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/4/24 0024
 */
import React, { PureComponent } from 'react';
import {
    View,
    Image,
    ScrollView,
    Text,
} from 'react-native';
import Images from "../../../resources/Images";
import styles from "../../../resources/styles/NewsHeadline"

class ListItem extends PureComponent {
    render() {
        let data=this.props.data;
        return (
            <View style={styles.item}>
                <Text style={styles.dot}>&bull;</Text>
                <Text style={styles.title}>
                    {data.description}
                </Text>
            </View>
        )
    }
}

export default class NewsHeadline extends PureComponent {

    renderItemTitle(list) {
        let itemAry=[];
        for (let i = 0;
            i < list.length;
            i++) {
            itemAry.push(
                <ListItem key={i} data={list[i]}/>
            );
        }
        return itemAry;
    }

    render() {
        let datas=this.props.data;

        let name=datas.post.column.name;
        let list=datas.list;

        return (
            <View style={styles.bg}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={styles.headImg} source={Images.menu.ic_menu_about}/>
                    <Text style={styles.headTitle}>
                        {name}
                    </Text>
                </View>
                <ScrollView style={{marginTop:10}}>{this.renderItemTitle(list)}</ScrollView>
                <View style={{ flexDirection:'row', justifyContent : 'flex-end',paddingRight:10}}>
                    <Text style={styles.checkDetail}>
                        查看详情>>
                    </Text>
                </View>
            </View>
        );
    }
}