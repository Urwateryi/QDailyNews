/**
 * Description:
 *
 * Author: zoe
 * Time: 2018/5/22 0022
 */
import { observable, action } from 'mobx';

class LoginStore {

    @observable
    id = 0;

    @observable
    user_id = 0;

    @observable
    _alias = '';

    @observable
    username = '';

    @observable
    face = '';

    @observable
    description = '';

    @observable
    email = '';

    @observable
    phone = '';
}

export default new LoginStore();