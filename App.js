/**
 * Description:页面配置
 *
 * Author: zoe
 * Time: 2018/4/20 0020
 */
import React, { PureComponent } from 'react';

import SplashModule from "./app/modules/SplashModule";
import AppRouter from "./app/AppRouter";

export default class App extends PureComponent {

    componentDidMount() {
        SplashModule.hide();
    }

    render() {
        return (
            <AppRouter/>
        );
    }
}
