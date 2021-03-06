/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/4/27 0027
 */

import React, {Component} from 'react';
import {ScrollView, StyleSheet, RefreshControl, FlatList} from "react-native";
import NetUtil from "../../../utils/NetUtil";
import Api from "../../../network/Api";
import LabsItem from "./../labs/LabsItem";
import Constants from "../../../config/Constants";
import LabsHorizontal from "./../labs/LabsHorizontal";
import Colors from "../../../resources/Colors";

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

export default class LabsPageScrollView extends Component {

    //构造函数
    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
            // 下拉刷新
            refreshing: false,
            loading: false,
            error: '',
            last_key: 0,
            feedsList: [],

            feeds: [],
            paperTopic: [],
        };
    }

    componentDidMount() {
        this.getContent(0)
    }

    /**
     * 获取数据
     *
     * @param last_key
     * @returns {Promise<void>}
     */
    async getContent(last_key) {

        let url = Api.papers.replace('{last_key}', last_key);

        console.log('last_key:' + last_key);
        console.log('url:' + url);

        await NetUtil.get(url, result => {
                console.log("response is :", result.response)
                this.setState({
                        paperTopic: this.state.paperTopic.concat(result.response.paper_topics),
                        feeds: this.state.feeds.concat(result.response.feeds),
                        loading: false,
                        has_more: result.response.has_more,
                        refreshing: false,
                    }
                );
            },
            err => {
                console.log("result is :", err.toString())

                this.setState({
                    error: err.toString(),
                    loading: false,
                    refreshing: false
                });
            });
    }

    /**
     * 渲染页面
     * @returns {Array}
     */
    renderItem = () => {
        let itemAry = [];
        if (this.state.feeds.length > 0) {
            for (let i = 0;
                 i < this.state.feeds.length;
                 i++) {
                let feedsItem = this.state.feeds[i];

                itemAry.push(
                    <LabsItem key={i} data={feedsItem} type={Constants.item_type_lab}/>
                );
            }

            this.renderPaperTopic(itemAry);
        }
        return itemAry;
    }

    /**
     * 渲染主题位
     *
     * @param itemAry
     * @returns {Array}
     */
    renderPaperTopic(itemAry) {

        let itemPaper = [];
        if (this.state.paperTopic.length > 0) {

            for (let j = 0;
                 j < this.state.paperTopic.length;
                 j++) {

                let paperTopicItem = this.state.paperTopic[j];
                let insertLocation = paperTopicItem.insert_location;
                let insertContent = paperTopicItem.insert_content;

                itemPaper.push(
                    <LabsHorizontal key={200 + j} data={insertContent}/>
                );

                itemAry.splice(insertLocation, 0, itemPaper);
            }
        }
    }

    /**
     * 绘制主页面
     *
     * @returns {*}
     */
    render() {
        return (
            <ScrollView
                style={styles.container}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                //加载更多
                onEndReached={() => this._onLoadMore()}
                onEndReachedThreshold={0.1}
            >{
                this.renderItem()
            }
            </ScrollView>
        );
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        this.setState({
            refreshing: true,
            last_key: 0,
            feedsList: [],

            feeds: [],
            paperTopic: [],
        })
        this.getContent(0);
    }

    /**
     * 上拉加载更多
     * @private
     */
    _onLoadMore = () => {
        console.log("loadmore.out")
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (this.state.has_more && this.state.feeds.length > 0) {
            console.log("loadmore.in")
            this.getContent(this.state.last_key)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',//当前容器使用什么布局
        backgroundColor: Colors.bg,
    }
})