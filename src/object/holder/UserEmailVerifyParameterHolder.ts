export default class UserEmailVerifyParameterHolder {

     userId: string = '';
     code: string = '';

   UserEmailVerifyParameterHolder() {
       this. userId = '';
       this. code = '';
   }

   toMap(): {} {
       const map = {};
       map['user_id'] = this. userId;
       map['code'] = this. code;

       return map;
   }
}