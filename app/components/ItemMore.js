import React, { PureComponent } from 'react';
import moreItemStyles from "../resources/styles/ItemMore";
import Images from "../resources/Images";
import {
    View,
    Text,
    ToastAndroid,
    TouchableOpacity,
    Image,
} from 'react-native';
import TimeUtil from "../utils/TimeUtil";
import NetUtil from "../utils/NetUtil";
import Api from "../network/Api";
import { Actions } from "react-native-router-flux";
/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/4/25 0025
 */
export default class ItemMore extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            praiseCount : 0,
            praiseStatus : false
        };
    }

    componentWillMount() {
        let item = this.props.item;
        this.setState({
            praiseCount : item.post.praise_count
        });
    }
    
    render() {
        //是否显示评论模块
        let isShowComment = this.props.isShowComment;
        let item = this.props.item;

        let commentCount = item.post.comment_count;

        let categoryTitle = item.post.category.title;
        let publishTime = TimeUtil.formatDate(item.post.publish_time, "yyyy-MM-dd hh:mm");

        return (
            <View style={moreItemStyles.more}>
                <Text style={moreItemStyles.moreTxt}>{categoryTitle}</Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ flexDirection : 'row' }}
                    onPress={() => this.goCommentList(item)}>

                    {<Image style={[ moreItemStyles.moreImg, { marginLeft : 10 } ]} source={Images.item.ic_comment_normal}/>}
                    {<Text style={moreItemStyles.moreTxt}>{commentCount}</Text>}

                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ flexDirection : 'row' }}
                    onPress={() => this.changePraise(item)}>

                    <Image style={[ moreItemStyles.moreImg, { marginLeft : 10 } ]} source={this.state.praiseStatus ? Images.item.ic_favor_press : Images.item.ic_favor_normal}/>
                    <Text style={moreItemStyles.moreTxt}>{this.state.praiseCount}</Text>

                </TouchableOpacity>
                <Text style={[ moreItemStyles.moreTxt, { marginLeft : 5 } ]}>{publishTime}</Text>
            </View>
        )
    }

    /**
     * 跳转到评论列表页
     * @param item
     */
    goCommentList(item){
        Actions.push('CommentPage',{id:item.post.id})
    }

    /**
     * 点赞
     */
     changePraise(item) {

        Actions.push('LoginPage')

        // let datatype = item.post.datatype;
        // let genre = item.post.genre;
        // let id = item.post.id;
        //
        // let params = new Map();
        // params.set('genre', genre + "");
        // params.set('id', id);
        // params.set('praise_type', datatype);
        //
        // await NetUtil.postJson(Api.createPraise,
        //     params,
        //     result => {
        //         console.log("result is :", result.response);
        //         this.setState({
        //             praiseCount : result.response.praise_count,
        //             praiseStatus : !this.state.praiseStatus,
        //         });
        //     }, err => {
        //         console.log("err is :", err.toString());
        //     })
    }
}