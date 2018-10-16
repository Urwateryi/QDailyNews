/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/4/20 0020
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
} from 'react-native';

import Colors from "../../../resources/Colors";
import NewsBanner from "./NewsBanner";
import Images from "../../../resources/Images";
import NewsHeadline from "./NewsHeadline";
import FeedsItem from "./FeedsItem";
import Api from "../../../network/Api";
import NetUtil from "../../../utils/NetUtil";

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

const datas = [
    {
        "icon" : Images.test.test_1,
        "title" : "你那一笑倾国倾城"
    },
    {
        "icon" : Images.test.test_2,
        "title" : "那里记录了最唯美的爱情故事"
    },
    {
        "icon" : Images.test.test_3,
        "title" : "我怎么是一个剩女"
    }
]

export default class NewsPageScrollView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // 下拉刷新
            refreshing : false,
            loading : false,
            error : '',
            last_key : 0,
            has_more : true,
            my_subscription_location : 0,

            feedsList : [],

            feeds : [],
            feedsAd : [],
            banners : [],
            bannersAd : [],
            columns : [],
            columnsAd : [],
            headline : [],
            featuredArticle : [],
        };
    }

    componentDidMount() {
        this.getContent(0)
    }

    async getContent(last_key) {
        let params = new Map();
        if (last_key !== 0) {
            params.set('last_key', last_key);
        } else {
            params = null;
        }

        console.log('last_key:' + last_key);

        await NetUtil.get(Api.news, params, result => {
                this.setState({
                        feeds : this.state.feeds.concat(result.response.feeds),
                        feedsAd : this.state.feedsAd.concat(result.response.feeds_ad),
                        banners : this.state.banners.concat(result.response.banners),
                        bannersAd : this.state.bannersAd.concat(result.response.banners_ad),

                        columns : this.state.columns.concat(result.response.columns),
                        columnsAd : this.state.columnsAd.concat(result.response.columns_ad),

                        headline : this.state.headline.concat(result.response.headline),
                        featuredArticle : this.state.featuredArticle.concat(result.response.featured_article),

                        last_key : result.response.last_key,
                        has_more : result.response.has_more,
                        my_subscription_location : result.response.my_subscription_location,

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

    renderItem = () => {
        let itemAry = [];
        if(this.state.feeds.length>0){
            for (let i = 0;
                i < this.state.feeds.length;
                i++) {
                let feedsItem = this.state.feeds[ i ];
                itemAry.push(
                    <FeedsItem key={i} data={feedsItem}/>
                );
            }

            this.renderBanner(itemAry);
            this.renderHeadline(itemAry);
        }

        return itemAry;
    }

    /**
     * 渲染banner
     * @param itemAry
     */
    renderBanner = (itemAry) => {
        let itemBanner = [];
        let banners = this.state.banners;

        let length = banners.length;
        if (length > 0) {
            itemBanner.push(
                <NewsBanner data={banners}/>
            );

            itemAry.splice(0, 0, itemBanner);
        }
    }

    /**
     * 渲染headline
     * @param itemAry
     */
    renderHeadline(itemAry) {
        let itemHeadline = [];
        let headline = this.state.headline;

        let length = headline.length;
        if (length > 0) {
            itemHeadline.push(
                <NewsHeadline data={headline}/>
            );

            itemAry.splice(1, 0, itemHeadline);
        }
    }

    renderColumns(itemAry) {
        console.log("imgData:columns:", this.state.columns);
    }

    renderFeedsAd(itemAry) {
        console.log("imgData:feedsAd:", this.state.feedsAd);
        let itemFeedsAd=[];
        let feedsAd=this.state.feedsAd;

        let length=feedsAd.length;
        if (length>0){
            itemFeedsAd.push(
                <LabsAds image={} url={}/>
            );

            itemAry.splice(3, 0, itemFeedsAd);
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}
                        showsHorizontalScrollIndicator={false}>{
                this.renderItem()
            }</ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',//当前容器使用什么布局
        backgroundColor : Colors.bg,
    }, text : {
        fontSize : 50,
        textAlign : 'center',
        color : Colors.gray,
    }
});