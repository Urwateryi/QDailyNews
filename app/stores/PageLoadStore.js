/**
 * Description:页面加载store
 *
 * Author: zoe
 * Time: 2018/5/28 0028
 */
import { observable, action } from 'mobx';

class PageLoadStore {

    @observable
    isLoad=false;

    @action
    showLoadPage(){
        isLoad=true;
    }

    @action
    hideLoadPage(){
        isLoad=false;
    }
}

export default new PageLoadStore();