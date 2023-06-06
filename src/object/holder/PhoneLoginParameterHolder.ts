export default class PhoneLoginParameterHolder {

    phoneId: string = '';
    userName: string = '';
    userPhone: string = '';
    deviceToken: string = '';
    platformName: string = '';

    PhoneLoginParameterHolder() {
        this.phoneId = '';
        this.userName = '';
        this.userPhone = '';
        this.deviceToken = '';
        this.platformName = '';

    }

    toMap(): {} {
        const map = {};
        map['phone_id'] = this.phoneId;
        map['user_name'] = this.userName;
        map['user_phone'] = this.userPhone;
        map['device_token'] = this.deviceToken;
        map['platform_name'] = this.platformName;


        return map;
    }
}