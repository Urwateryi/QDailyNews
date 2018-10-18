/**
 * Description:搜索item
 *
 * Author: zoe
 * Time: 2018/5/8 0008
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Image,
    View,
    Text, Dimensions
} from 'react-native'
import Colors from "../../resources/Colors";
import TimeUtil from "../../utils/TimeUtil";
import Constants from "../../config/Constants";

export default class SearchItem extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let item = this.props.searchItem;

        let title = item.post.title;
        let description = item.post.description;
        let time = TimeUtil.formatDate(item.post.publish_time, "MM-dd hh:mm");

        let categoryTitle = item.post.category.title;
        let authorName = item.author.name;

        console.log("title:", title)
        console.log("description:", description)
        console.log("time:", time)
        console.log("categoryTitle:", categoryTitle)
        console.log("authorName:", authorName)

        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.container}>

                <Text style={styles.title} numberOfLines={2}>{title}</Text>
                <Text style={styles.description} numberOfLines={2}>{description}</Text>
                <View style={styles.moreContainer}>
                    <Text style={styles.category}>{categoryTitle}</Text>
                    <View style={styles.timeContainer}>
                        <Text style={styles.author}>{authorName}</Text>
                        <View style={styles.line}/>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.white,
        borderBottomColor: Colors.border,
        borderBottomWidth: Constants.divideLineWidth
    }, time: {
        fontSize: 12,
        color: Colors.light_gray,
    }, title: {
        fontSize: 17,
        color: Colors.black,
        fontWeight: 'bold'
    }, description: {
        marginTop: 10,
        fontSize: 13,
        color: Colors.gray,
    }, moreContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row'
    },
    timeContainer:{
        flex: 1,
        justifyContent:"flex-end",
        alignItems:'center',
        flexDirection: 'row'
    },
    category: {
        flex:1,
        fontSize: 12,
        color: Colors.light_gray,
    },
    line: {
        height: 13,
        width: 1,
        backgroundColor:Colors.light_gray,
        marginLeft: 10,
        marginRight: 10
    },
    author: {
        fontSize: 12,
        color: Colors.light_gray,
    },
});