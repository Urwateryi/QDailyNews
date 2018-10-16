/**
 * Description:评论的相关store
 *
 * Author: zoe
 * Time: 2018/5/22 0022
 */

import { observable, action } from 'mobx';
import Constants from "../config/Constants";

class CommentStore {
    //评论数量
    @observable
    commentCount = 0;

    //评论内容
    @observable
    placeholder = "添加评论...";

    //评论的type_id
    @observable
    id = 0;

    //评论的type
    @observable
    type = '';

    //父评论的id
    @observable
    parent_id = 0;

    //评论框状态
    @observable
    state = Constants.EMPTY;

    @action
    reset() {
        console.log('~~~~~~~~~reset~~~~~~~~~');

        this.commentCount = 0;
        this.placeholder = "添加评论...";
        this.id = 0;
        this.type = '';
        this.parent_id = 0;
        this.state = Constants.EMPTY;
    }
}

export default new CommentStore();