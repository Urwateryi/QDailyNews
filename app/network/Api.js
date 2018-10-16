/**
 * Description:Api
 *
 * Author: zoe
 * Time: 2018/4/27 0027
 */

//服务器地址
const host = 'http://app3.qdaily.com/';

export default {

    /**
     * 首页
     * GET请求
     */
    news : host + 'app3/homes/index/0.json?',

    /**
     * Label页
     * GET 请求
     */
    papers : host + 'app3/papers/index/0.json',

    /**
     * 新闻详情页
     * GET 请求
     */
    newsDetail : host + 'app3/articles/detail/{id}.json',

    /**
     * 点赞
     * POST请求
     *
     * genre 点赞：1，取消点赞：2
     * id
     * praise_type :评论：comment，新闻：article
     */
    createPraise : host + 'app3/praises/create_praise',

    /**
     * 评论
     * POST请求
     *
     * comment_type
     * content
     * id
     * parent_id
     */
    createComment : host + 'app3/comments/create_comment',

    /**
     * 获取新闻评论列表
     * GET请求
     *
     * id:文章id
     */
    getCommentList : host + 'app3/comments/index/article/{id}/0.json',

    /**
     * 手机号登录
     *
     * POST
     *
     * phone
     * password
     * remember_me 1或者0
     */
    loginPhone:host+'users/phone_sign_in',


    /**
     * 邮箱登录
     *
     * POST
     *
     * email
     * password
     * remember_me 1或者0
     */
    loginEmail:host+'users/sign_in',
}

