/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/4/20 0020
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
} from 'react-native';

import Colors from "../../../resources/Colors";
import FeedsItem from "./FeedsItem";
import Api from "../../../network/Api";
import NetUtil from "../../../utils/NetUtil";
import NewsBanner from "./NewsBanner";

const MAX_RESULT = 20;//每页最大记录数

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

export default class NewsPageFlatList extends Component {

    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;

        this.state = {
            // 下拉刷新
            refreshing: false,
            loading: false,
            error: '',
            last_key: 0,
            has_more: true,
            my_subscription_location: 0,

            feedsList: [],

            feeds: [],
            banners: [],
            columns: [],
            featuredArticle: [],
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
                        feeds: this.state.feeds.concat(result.response.feeds),
                        banners: this.state.banners.concat(result.response.banners),
                        columns: this.state.columns.concat(result.response.columns),
                        featuredArticle: this.state.featuredArticle.concat(result.response.featured_article),

                        last_key: result.response.last_key,
                        has_more: result.response.has_more,
                        my_subscription_location: result.response.my_subscription_location,

                        loading: false,
                        refreshing: false,
                    }
                );
            },
            err => {
                console.log("err is :", err.toString());

                this.setState({
                    error: err.toString(),
                    loading: false,
                    refreshing: false
                });
            });
    }

    /**
     * 渲染头部
     * @param banners
     * @returns {*}
     */
    renderHeader = (banners) => {
        return (
            <NewsBanner data={banners}/>
        )
    };

    /**
     * 渲染
     *
     * @param item
     * @param index
     * @returns {*}
     */
    renderItem = ({item}) => {
        return (
            <FeedsItem data={item}/>
        )
    };

    keyExtractor = (item) => (item.post.id).toString();

    render() {
        return (
            <FlatList
                data={this.state.feeds}
                style={styles.container}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}

                ListHeaderComponent={this.renderHeader(this.state.banners)}

                getItemLayout={(data, index) => (
                    {length: 130, offset: 130 * index, index}
                )}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',//当前容器使用什么布局
        backgroundColor: Colors.bg,
    }, text: {
        fontSize: 50,
        textAlign: 'center',
        color: Colors.gray,
    }
});