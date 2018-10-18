/**
 * Description:页面配置
 *
 * Author: zoe
 * Time: 2018/4/20 0020
 */
import React, { Component } from "react";
import {
    Router,
    Actions,
    Scene
} from 'react-native-router-flux';
import {
    StyleSheet,
} from 'react-native';
import Colors from "./resources/Colors";
import NewsPageFlatList from "./screens/home/news/NewsPageFlatList";
import LabsPageScrollView from "./screens/home/labs/LabsPageScrollView";
import WebViewPage from "./screens/home/WebViewPage";
import NewsDetailPage from "./screens/detail/NewsDetailPage";
import CommentPageFlatList from "./screens/comment/CommentPageFlatList";

import { Provider } from 'mobx-react';
import commentStore from './stores/CommentStore';
import loginStore from './stores/LoginStore';
import pageLoadStore from './stores/PageLoadStore';

import LoginPage from "./screens/setting/login/LoginPage";

import { YellowBox } from 'react-native';
import NetErrorPage from "./components/NetErrorPage";
import NoDataPage from "./components/NoDataPage";
import AccountPage from "./screens/setting/AccountPage";
import SettingPage from "./screens/setting/SettingPage";
import SearchPage from "./screens/search/SearchPage";
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

export default class AppRouter extends Component {
    render() {
        return (
            <Provider commentStore={commentStore} loginStore={loginStore} pageLoadStore={pageLoadStore}>
                <Router getSceneStyle={getSceneStyle} scenes={scenes}/>
            </Provider>
        );
    }
}

const getSceneStyle = () => ({
    backgroundColor : 'white',
    shadowOpacity : 1,
    shadowRadius : 3,
});

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "white",
        justifyContent : "center",
        alignItems : "center",
    },
    navigationBar : {
        backgroundColor : 'white',
    },
    routerFluxLabelStyle : {
        marginTop : 5,
        textAlign : 'center',
        fontSize : 15,
        fontFamily : 'monospace',
        fontWeight : '100'
    }, tabBarStyle : {
        justifyContent : "center",
        alignItems : "center",
        paddingBottom : 10,
        height : 45,
        backgroundColor : 'white'
    }
});

//各个界面
const scenes = Actions.create(
    <Scene hideNavBar key="root">
        <Scene tabs
               tabBarStyle={styles.tabBarStyle}
               labelStyle={styles.routerFluxLabelStyle}
               activeTintColor='black'
               inactiveTintColor={Colors.gray}>
            <Scene key="NewsPage" title="NEWS" hideNavBar component={NewsPageFlatList}/>
            <Scene key="LabsPage" title="LABS" hideNavBar component={LabsPageScrollView}/>
        </Scene>
        <Scene key="WebViewPage" component={WebViewPage}/>
        <Scene key="NewsDetailPage" component={NewsDetailPage}/>
        <Scene key="CommentPageFlatList" component={CommentPageFlatList}/>
        <Scene key="LoginPage" component={LoginPage}/>
        <Scene key="NetErrorPage" component={NetErrorPage}/>
        <Scene key="NoDataPage" component={NoDataPage}/>
        <Scene key="AccountPage" component={AccountPage}/>
        <Scene key="SettingPage" component={SettingPage}/>
        <Scene key="SearchPage" component={SearchPage}/>
    </Scene>
);