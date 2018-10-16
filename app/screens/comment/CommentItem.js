/**
 * Description:评论item
 *
 * Author: zoe
 * Time: 2018/5/8 0008
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ToastAndroid,
    Image,
    View,
    Text, Dimensions
} from 'react-native'
import Colors from "../../resources/Colors";
import Images from "../../resources/Images";
import TimeUtil from "../../utils/TimeUtil";
import Constants from "../../config/Constants";
import Api from "../../network/Api";
import NetUtil from "../../utils/NetUtil";

export default class CommentItem extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            praiseCount : 0,
            praiseStatus : false,
        };
    }

    async createPraise(item) {

        let params = new Map();

        params.set('id', item.id);
        params.set('genre', (this.state.praiseStatus ? 2 : 1) + '');
        params.set('praise_type', 'comment');

        await NetUtil.postJson(Api.createPraise,
            params,
            result => {

                console.log("result is praise_count:", result.response.praise_count);
                console.log("result is target_id:", result.response.target_id);

                this.setState({
                    praiseCount : result.response.praise_count,
                    praiseStatus : !this.state.praiseStatus
                });
            }, err => {
                console.log("err is :", err.toString());
            })
    }

    createComment(item){
        let author = item.author;
        let name = author.name;

        this.props.mobx.parent_id=item.id;
        this.props.mobx.placeholder=('回复'+name+'：');

        console.log('placeholder1:',this.props.mobx.placeholder);
    };

    componentWillMount() {
        let item = this.props.data;
        this.setState({
            praiseCount : item.praise_count,
        });
    }

    render() {
        let item = this.props.data;

        let commentContent = item.content.trim();
        let time = TimeUtil.formatDate(item.publish_time, "MM-dd hh:mm");

        let author = item.author;
        let head = author.avatar;
        let name = author.name;

        return (

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.container}
                onPress={() => this.createComment(item)}>

                <Image style={styles.head} source={{ uri : head }}/>

                <View style={styles.containerRight}>
                    <View style={styles.headContainer}>

                        <View style={styles.nameTime}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.time}>{time}</Text>
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.praise}
                            onPress={() => this.createPraise(item)}>

                            <Text style={this.state.praiseStatus ? [ styles.praiseTxt, { color : Colors.primary } ] : styles.praiseTxt}>{this.state.praiseCount}</Text>
                            <Image style={styles.praiseImg} source={this.state.praiseStatus ? Images.item.ic_praise_press : Images.item.ic_praise_normal}/>

                        </TouchableOpacity>
                    </View>

                    <Text style={styles.content}>{commentContent}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 10,
        flexDirection : 'row',
        borderBottomColor : Colors.border,
        borderBottomWidth : Constants.divideLineWidth
    }, containerRight : {
        marginLeft : 10,
        flexDirection : 'column',
    }, headContainer : {
        flexDirection : 'row',
    }, head : {
        width : 30,
        height : 30,
        borderRadius : 30,
        justifyContent : 'flex-start',
    }, nameTime : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start'
    }, name : {
        fontSize : 14,
        color : Colors.black,
        textAlign : 'left',
        fontWeight : '100'
    }, content : {
        fontSize : 12,
        marginTop : 10,
        width : Dimensions.get('window').width - 60,
        marginBottom : 10,
        textAlign : 'left',
        color : Colors.black,
    }, time : {
        fontSize : 12,
        marginLeft : 10,
        alignSelf : 'center',
        color : Colors.light_gray,
    }, praise : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-end'
    }, praiseTxt : {
        fontSize : 14,
        color : Colors.light_gray,
    }, praiseImg : {
        width : 14,
        height : 14,
        marginLeft : 5,
    }
});