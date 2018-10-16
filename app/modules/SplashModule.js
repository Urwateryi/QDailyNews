/**
 * Description:将原生模块封装成一个JavaScript模块，
 * 省下了每次都从NativeModules中获取对应模块的步骤。
 * 这个JS文件也可以用于添加一些其他JavaScript端实现的功能
 *
 * Author: zoe
 * Time: 2018/4/20 0020
 */
import { NativeModules } from 'react-native';

export default NativeModules.ActivitySplash;