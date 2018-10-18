/**
 * Description:搜索页面
 *
 * Author: zoe
 * Time: 2018/5/22 0022
 */
import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, Text, Dimensions,RefreshControl, FlatList} from "react-native";
import {SearchBar} from 'react-native-elements'
import Api from "../../network/Api";
import NetUtil from "../../utils/NetUtil";
import SearchItem from "./SearchItem";
import Colors from "../../resources/Colors";
import Images from "../../resources/Images";

export default class SearchPage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            searched: false,
            refreshing: false,
            last_key: 0,
            has_more: true,
            searches: [],
            content: ""
        };
    }

    _initState() {
        this.setState({
            refreshing: false,
            searches: [],
        })
    }

    /**
     * 渲染
     *
     * @param item
     * @param index
     * @returns {*}
     */
    renderItem = ({item}) => {
        return (
            <SearchItem searchItem={item}/>
        )
    };

    keyExtractor = (item) => (item.post.id).toString();

    async doSearch(content, last_key) {
        let url = Api.search.replace('{last_key}', last_key).replace("{content}", content);

        console.log('last_key:' + last_key);
        console.log('content:' + content);
        console.log('url:' + url);

        await NetUtil.get(url, result => {
                console.log("response is :", result.response);

                this.setState({
                        searches: this.state.searches.concat(result.response.searches),

                        last_key: result.response.last_key,
                        has_more: result.response.has_more,

                        loading: false,
                        refreshing: false,
                        content: content
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

    renderContent() {
        if (this.state.searches.length == 0 && !this.state.searched) {
            return (<View style={styles.defaultContainer}>
                <Image style={styles.defaultImage} source={Images.all.ic_default_book}/>
                <Text style={styles.defaultTxt}>请在输入框中输入你要搜索的内容</Text>
            </View>)
        }
        else if (this.state.searches.length == 0 && this.state.searched) {
            return (<View style={styles.defaultContainer}>
                <Image style={styles.defaultImage} source={Images.all.ic_no_data}/>
                <Text style={styles.defaultTxt}>暂无数据</Text>
            </View>)
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.searches}
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
                        onEndReached={() => this._onLoadMore()}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    lightTheme
                    searchIcon={<Image style={styles.searchIcon} source={Images.all.ic_search}/>}
                    onChangeText={this._onChangeText}
                    onSubmitEditing={(e) => this._onSubmit(e.nativeEvent.text)}
                    onClear={this._onClear}
                    // cancelButtonTitle="取消"
                    // platform = "{Platform.OS == 'ios'?'ios':'android'}"
                    showLoading
                    platform="android"
                    cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    placeholder={"搜索"}/>

                {this.renderContent()}
            </View>
        );
    }

    _onSubmit = (content) => {
        this.setState({
            searched: true
        })
        this._initState();
        this.doSearch(content, this.state.last_key)
    }

    _onClear = () => {
        console.log("清除内容")
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh = () => {
        this._initState();
        this.doSearch(this.state.content, this.state.last_key);
    }

    _onLoadMore = () => {
        if (this.state.has_more && this.state.searches.length > 0) {
            this.doSearch(this.state.content, this.state.last_key);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    defaultContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100
    },
    defaultImage: {
        height: 80,
        width: 80,
    }, defaultTxt: {
        marginTop: 30,
        fontSize: 15,
        color: Colors.light_gray,
    }, searchIcon: {
        width: 15,
        height: 15
    }
});