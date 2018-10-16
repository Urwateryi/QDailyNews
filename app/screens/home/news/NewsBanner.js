/**
 * Description:News页轮播图
 *
 * Author: zoe
 * Time: 2018/4/23 0023
 */
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    Platform
} from 'react-native';
import Colors from "../../../resources/Colors";

let {width} = Dimensions.get('window');
const ios = Platform.OS;

export default class NewsBanner extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            duration: 4000   //每隔一秒开始轮播
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(scrollView) => this.onAnimationEnd(scrollView)}
                    onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
                    onScrollEndDrag={this.onScrollEndDrag.bind(this)}
                >
                    {this.renderAllImage(this.props.data)}
                </ScrollView>

                <View style={styles.circleContainer}>
                    {this.renderCircleIndicator()}
                </View>
            </View>
        );
    }

    /**
     * 一般在此方法中处理一些耗时操作
     */
    componentDidMount() {
        this.startTimer();

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /**
     * 演染图片
     * @returns {Array}
     * @private
     * 网络图片：source={{uri: imgData[i].icon}}
     * 本地图片：source={imgData[i].icon}
     */
    renderAllImage(datas) {

        let imgArr = [];
        let length = datas.length;

        for (let i = 0;
             i < length;
             i++) {
            let imageUrl = datas[i].post.image;
            imgArr.push(
                <Image
                    key={i}
                    source={{uri: imageUrl}}
                    style={{width: width, height: 220}}
                />
            )
        }

        return imgArr;
    }

    /**
     * 渲染圆点指示器
     * @private
     */
    renderCircleIndicator() {
        let circleArr = [];
        let imgData = this.props.data;
        let style;
        for (let i in
            imgData) {
            style = i === this.state.currentPage ? {color: Colors.primary} : {color: Colors.light_gray};
            circleArr.push(
                <Text key={i} style={[{fontSize: 30}, style, {marginLeft: 5}]}>&bull;</Text>
            );
        }

        return circleArr;
    }

    /**
     * 当一页滑动结束时调用
     * @param scrollView
     */
    onAnimationEnd(scrollView) {

        // 计算一页滑动的偏移量
        let offSetX = scrollView.nativeEvent.contentOffset.x;
        console.log(offSetX);
        // 算出当前为第几页
        let currentPage = Math.floor((offSetX / width));
        this.setState({
            currentPage: currentPage
        });
    }

    /**
     * 开始拖拽时的回调
     * @private
     */
    onScrollBeginDrag() {
        clearInterval(this.interval);
    }

    /**
     * 拖拽停止时的回调
     * @private
     */
    onScrollEndDrag() {
        this.startTimer();
    }

    /**
     * 开启定时器
     * @private
     */
    startTimer() {

        let scrollView = this.refs.scrollView;
        let imgCount = this.props.data.length;

        this.interval = setInterval(() => {

            //记录当前正在活动的图片
            let activePage = 0;
            if ((this.state.currentPage + 1) >= imgCount) { //防止越界
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }

            this.setState({
                currentPage: activePage
            });

            //让ScrollView动起来
            let offSetX = activePage * width;
            scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true});

        }, this.state.duration);
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: ios === 'ios' ? 25 : 0
    },
    circleContainer: {
        width: width,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});