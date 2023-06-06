export default class UserRegistesrParameterHolder {

    userId: string = '';
    userName: string = '';
    userEmail: string = '';
    userPassword: string = '';
    userPhone: string = '';
    deviceToken: string = '';
    platformName: string = '';


    UserRegistesrParameterHolder() {
        this.userId = '';
        this.userName = '';
        this.userEmail = '';
        this.userPassword = '';
        this.userPhone = '';
        this.deviceToken = '';
        this.platformName = '';

    }

    toMap(): {} {
        const map = {};
        map['user_id'] = this.userId;
        map['user_name'] = this.userName;
        map['user_email'] = this.userEmail;
        map['user_password'] = this.userPassword;
        map['user_phone'] = this.userPhone;
        map['device_token'] = this.deviceToken;
        map['platform_name'] = this.platformName;


        return map;
    }
}