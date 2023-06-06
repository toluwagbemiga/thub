

export default class ForgotpasswordParameterHolder {

    userEmail: string = '';


    ForgotpasswordParameterHolder() {
        this.userEmail = '';

    }


    toMap(): {} {
        const map = {};
        map['user_email'] = this.userEmail;
        return map;
    }
}