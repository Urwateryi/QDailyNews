/**
 * Description:评论列表页
 *
 * Author: zoe
 * Time: 2018/5/8 0008
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View, RefreshControl, FlatList,
} from 'react-native'
import NetUtil from "../../utils/NetUtil";
import Api from "../../network/Api";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

import {inject, observer} from "mobx-react";

import {YellowBox} from 'react-native';
import BaseComponent from "../../base/BaseComponent";
import FeedsItem from "../home/news/FeedsItem";

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

@inject('commentStore')
@observer
export default class CommentPageFlatList extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            comments: [],
            topComments: [],
            commentCount: 0,
            lastKey: 0,
            has_more: true,
        };
    }

    initTitle() {
        this.setTitleCenter('评论列表');
    }

    _initState() {
        this.setState({
            comments: [],
            topComments: [],
            commentCount: 0,
            lastKey: 0,
            has_more: true,
            refreshing: false
        })
    }

    initData() {
        this.props.commentStore.reset();
        this.props.commentStore.id = this.props.id;

        this.props.commentStore.type = 'article';

        this.showLoad();
        this.getCommentList(0)
    }

    renderItem = ({item}) => {
        return (
            <CommentItem key={item.id} data={item} mobx={this.props.commentStore}/>
        )
    };

    keyExtractor = (item) => (item.id).toString();

    renderComponent() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.comments}
                    style={styles.list}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}

                    getItemLayout={(data, index) => (
                        {length: 130, offset: 130 * index, index}
                    )}

                    refreshing={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />}
                    //加载更多
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.1}
                />

                <CommentInput mobx={this.props.commentStore}/>
            </View>

        );
    }

    /**
     * 获取评论列表
     * @returns {Promise<void>}
     */
    async getCommentList(last_key) {
        let url = Api.getCommentList.replace("{id}", this.props.id).replace("{last_key}", last_key);

        await NetUtil.get(url, result => {
            console.log("response is :", result.response);
            this.hideLoad();
            this.setState({
                comments: this.state.comments.concat(result.response.comments),
                topComments: result.response.top_comments,

                commentCount: result.response.comment_count,
                last_key: result.response.last_key,
                has_more: result.response.has_more,
                refreshing: false,
            });
        }, err => {
            this.hideLoad();
            console.log("err is :", err.toString());
        })
    }


    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        this._initState();
        this.getCommentList(0);
    }

    _onLoadMore = () => {
        console.log("loadmore.out")
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (this.state.has_more && this.state.comments.length > 0) {
            console.log("loadmore.in")
            this.getCommentList(this.state.last_key)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        marginBottom: 51
    }
});