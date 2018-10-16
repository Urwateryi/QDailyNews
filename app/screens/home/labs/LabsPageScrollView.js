/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/4/27 0027
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import NetUtil from "../../../utils/NetUtil";
import Api from "../../../network/Api";
import LabsItem from "./../labs/LabsItem";
import Constants from "../../../config/Constants";
import LabsHorizontal from "./../labs/LabsHorizontal";
import LabsAds from "./LabsAds";
import Colors from "../../../resources/Colors";

import { YellowBox } from 'react-native';
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
            refreshing : false,
            loading : false,
            error : '',
            last_key : 0,
            feedsList : [],

            feeds : [],
            paperTopic : [],
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

        let params = new Map();
        if (last_key !== 0) {
            params.set('last_key', last_key);
        } else {
            params = null;
        }

        console.log('last_key:' + last_key);

        await NetUtil.get(Api.papers, params, result => {

                this.setState({
                        paperTopic : this.state.paperTopic.concat(result.response.paper_topics),
                        feeds : this.state.feeds.concat(result.response.feeds),
                        loading : false,
                        refreshing : false,
                    }
                );
            },
            err => {
                console.log("result is :", err.toString())

                this.setState({
                    error : err.toString(),
                    loading : false,
                    refreshing : false
                });
            });
    }

    /**
     * 渲染页面
     * @returns {Array}
     */
    renderItem = () => {
        let itemAry = [];
        if (this.state.feeds.length>0){
            for (let i = 0;
                i < this.state.feeds.length;
                i++) {
                let feedsItem = this.state.feeds[ i ];

                console.log("key i:"+i);
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
        if (this.state.paperTopic.length>0){

            for (let j = 0;
                j < this.state.paperTopic.length;
                j++) {

                let paperTopicItem = this.state.paperTopic[ j ];
                let insertLocation = paperTopicItem.insert_location;
                let insertContent = paperTopicItem.insert_content;

                itemPaper.push(
                    <LabsHorizontal key={200+j} data={insertContent}/>
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
                showsHorizontalScrollIndicator={false}>{
                this.renderItem()
            }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',//当前容器使用什么布局
        backgroundColor : Colors.bg,
    }
})