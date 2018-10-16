/**
 * Description:评论列表页
 *
 * Author: zoe
 * Time: 2018/5/8 0008
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
} from 'react-native'
import NetUtil from "../../utils/NetUtil";
import Api from "../../network/Api";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";

import { inject, observer } from "mobx-react";

import { YellowBox } from 'react-native';
import BaseComponent from "../../base/BaseComponent";
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

@inject('commentStore')
@observer
export default class CommentPage extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            comments : [],
            topComments : [],
            commentCount : 0,
            lastKey : 0,
            hasMore : true,
        };
    }

    initTitle(){
        this.setTitleCenter('评论列表');
    }

    initData(){
        this.props.commentStore.reset();
        this.props.commentStore.id = this.props.id;

        this.props.commentStore.type='article';

        this.showLoad();
        this.getCommentList();
    }

    renderItem = () => {
        let itemAry = [];

        if (this.state.comments.length > 0) {
            for (let i = 0;
                i < this.state.comments.length;
                i++) {
                let commentItem = this.state.comments[ i ];
                itemAry.push(
                    <CommentItem key={commentItem.id} data={commentItem} mobx={this.props.commentStore}/>
                );
            }
        }

        return itemAry;
    };

    renderComponent() {
        console.log('placeholder page:', this.props.commentStore.placeholder);

        return (

            <View style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false}
                            style={{ marginBottom : 51 }}>{
                    this.renderItem()
                }</ScrollView>

                <CommentInput mobx={this.props.commentStore}/>
            </View>

        );
    }

    /**
     * 获取评论列表
     * @returns {Promise<void>}
     */
    async getCommentList() {

        await NetUtil.get(Api.getCommentList.replace("{id}", this.props.id),
            null,
            result => {
                this.hideLoad();

                console.log("result is :", result.response.comments);
                console.log("result is commentCount:", result.response.comment_count);
                console.log("result is lastKey:", result.response.last_key);
                console.log("result is hasMore:", result.response.has_more);

                this.setState({

                    comments : result.response.comments,
                    topComments : result.response.top_comments,

                    commentCount : result.response.comment_count,
                    lastKey : result.response.last_key,
                    hasMore : result.response.has_more
                });
            }, err => {
                this.hideLoad();

                console.log("err is :", err.toString());
            })
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
    }
});