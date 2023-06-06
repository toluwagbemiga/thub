export default class ChangePasswordParameterHolder {

    userId: string = '';
    userPassword: string = '';
    confPassword: string = '';

    ChangePasswordParameterHolder() {
        this.userId = '';
        this.userPassword = '';
        this.confPassword = '';
    }

    toMap(): {} {
        const map = {};
        map['user_id'] = this.userId;
        map['user_password'] = this.userPassword;
        map['conf_password'] = this.confPassword;

        return map;
    }
}