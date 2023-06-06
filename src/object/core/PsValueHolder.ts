import { inject, provide, reactive } from "vue";
import firebaseApp from 'firebase/app';
import "firebase/auth";
import PsConst from "../constant/ps_constants";
import PsConfig from '@/config/PsConfig';

export class PsValueHolder {

    private loginExpiryTime : number = 0;
    private loginUserId : string = '';
    locationId : string = '';
    locationName : string = '';
    subLocationId : string = '';
    subLocationName : string = '';
    locationLat : string = '';
    locationLng : string = '';    
    loginUserName : string = '';
    userIdToVerify : string = '';
    userNameToVerify : string = '';
    userEmailToVerify : string = '';
    userPasswordToVerify : string = '';
    deviceToken : string = '';
    notiSetting : string = 'true';
    isCustomCamera : boolean = true;
    overAllTaxLabel : string = '';
    overAllTaxValue : string = '';
    shippingTaxLabel : string = '';
    shopId : string = '';
    messenger : string = '';
    whatsApp : string = '';
    phone : string = '';
    shippingTaxValue : string = '';
    appInfoVersionNo : string = '';
    appInfoForceUpdate : boolean = false;
    appInfoForceUpdateTitle : string = '';
    appInfoForceUpdateMsg : string = '';
    startDate : string = '';
    endDate : string = '';
    paypalEnabled : string = '';
    stripeEnabled : string = '';
    codEnabled : string = '';
    bankEnabled : string = '';
    publishKey : string = '';
    depositPercent : string = '';
    coolDownPeriod : string = '';
    bidFee : string = '';
    uploadFee : string = '';
    memberShipDuration : string = '';
    membershipAmount : string = '';
    shippingId : string = '';
    standardShippingEnable : string = '';
    zoneShippingEnable : string = '';
    noShippingEnable : string = '';
    creditCardNo : string = '';
    creditCardMonth : string = '';
    creditCardYear : string = '';
    creditCardCVC : string = '';
    creditCardName : string = '';
    creditCardValid : Boolean = false;
    resultStartTime : number = 0;
    userPassword : string = '';
    languageCode : string = '';
    showProfile : string = '';

    constructor() {
        this.loadData();
    }

    init(
        locationId : string,
        locationName : string,
        subLocationId : string,
        subLocationName : string,
        locationLat : string,
        locationLng : string,
        loginUserId : string,
        loginUserName : string,
        userIdToVerify : string,
        userNameToVerify : string,
        userEmailToVerify : string,
        userPasswordToVerify : string,
        deviceToken : string,
        notiSetting : string,
        isCustomCamera : boolean,
        overAllTaxLabel : string,
        overAllTaxValue : string,
        shippingTaxLabel : string,
        shopId : string,
        messenger : string,
        whatsApp : string,
        phone : string,
        shippingTaxValue : string,
        appInfoVersionNo : string,
        appInfoForceUpdate : boolean,
        appInfoForceUpdateTitle : string,
        appInfoForceUpdateMsg : string,
        startDate : string,
        endDate : string,
        paypalEnabled : string,
        stripeEnabled : string,
        codEnabled : string,
        bankEnabled : string,
        publishKey : string,
        depositPercent : string,
        coolDownPeriod : string,
        bidFee : string,
        uploadFee : string,
        memberShipDuration : string,
        membershipAmount : string,
        shippingId : string,
        standardShippingEnable : string,
        zoneShippingEnable : string,
        noShippingEnable : string,
        creditCardNo: string,
        creditCardMonth: string,
        creditCardYear: string,
        creditCardCVC: string,
        creditCardName: string,
        creditCardValid: Boolean,
        resultStartTime: number,
        userPassword : string,
        languageCode :string,
        showProfile : string,
    ) {

        
        this.locationId = locationId;
        this.locationName = locationName;
        this.subLocationId = subLocationId;
        this.subLocationName = subLocationName;
        this.locationLat = locationLat;
        this.locationLng = locationLng;
        this.loginUserId = loginUserId;
        this.loginUserName = loginUserName;
        this.userIdToVerify = userIdToVerify;
        this.userNameToVerify = userNameToVerify;
        this.userEmailToVerify = userEmailToVerify;
        this.userPasswordToVerify = userPasswordToVerify;
        this.deviceToken = deviceToken;
        this.notiSetting = notiSetting;
        this.isCustomCamera = isCustomCamera;
        this.overAllTaxLabel = overAllTaxLabel;
        this.overAllTaxValue = overAllTaxValue;
        this.shippingTaxLabel = shippingTaxLabel;
        this.shopId = shopId;
        this.messenger = messenger;
        this.whatsApp = whatsApp;
        this.phone = phone;
        this.shippingTaxValue = shippingTaxValue;
        this.appInfoVersionNo = appInfoVersionNo;
        this.appInfoForceUpdate = appInfoForceUpdate;
        this.appInfoForceUpdateTitle = appInfoForceUpdateTitle;
        this.appInfoForceUpdateMsg = appInfoForceUpdateMsg;
        this.startDate = startDate;
        this.endDate = endDate;
        this.paypalEnabled = paypalEnabled;
        this.stripeEnabled = stripeEnabled;
        this.codEnabled = codEnabled;
        this.bankEnabled = bankEnabled;
        this.publishKey = publishKey;
        this.depositPercent = depositPercent;
        this.coolDownPeriod = coolDownPeriod;
        this.bidFee = bidFee ;
        this.uploadFee = uploadFee;
        this.memberShipDuration = memberShipDuration;
        this.membershipAmount = membershipAmount;
        this.depositPercent = depositPercent;
        this.shippingId = shippingId;
        this.standardShippingEnable = standardShippingEnable;
        this.zoneShippingEnable = zoneShippingEnable;
        this.noShippingEnable = noShippingEnable;
        this.creditCardNo = creditCardNo;
        this.creditCardValid = creditCardValid;
        this.creditCardMonth = creditCardMonth;
        this.creditCardYear = creditCardYear;
        this.creditCardCVC = creditCardCVC;
        this.creditCardName = creditCardName;
        this.resultStartTime = resultStartTime;
        this.userPassword = userPassword;
        this.languageCode = languageCode;
        this.showProfile = showProfile;

    }

    loadData() {
        this.loginExpiryTime = localStorage.loginExpiryTime;
        this.locationId = localStorage.locationId;
        this.locationName = localStorage.locationName;
        this.subLocationId = localStorage.subLocationId;
        this.subLocationName = localStorage.subLocationName;
        this.locationLat = localStorage.locationLat;
        this.locationLng = localStorage.locationLng;
        this.loginUserId = localStorage.loginUserId;
        this.loginUserName = localStorage.loginUserName;
        this.userIdToVerify = localStorage.userIdToVerify;
        this.userNameToVerify = localStorage.userNameToVerify;
        this.userEmailToVerify = localStorage.userEmailToVerify;
        this.userPasswordToVerify = localStorage.userPasswordToVerify;
        this.deviceToken = localStorage.deviceToken;
        this.notiSetting = localStorage.notiSetting;
        // this.notiSetting = localStorage.notiSetting ?? appInfo('enableNotification');
        this.isCustomCamera = localStorage.isCustomCamera;
        this.overAllTaxLabel = localStorage.overAllTaxLabel;
        this.overAllTaxValue = localStorage.overAllTaxValue;
        this.shippingTaxLabel = localStorage.shippingTaxLabel;
        this.shopId = localStorage.shopId;
        this.messenger = localStorage.messenger;
        this.whatsApp = localStorage.whatsApp;
        this.phone = localStorage.phone;
        this.shippingTaxValue = localStorage.shippingTaxValue;
        this.appInfoVersionNo = localStorage.appInfoVersionNo;
        this.appInfoForceUpdate = localStorage.appInfoForceUpdate;
        this.appInfoForceUpdateTitle = localStorage.appInfoForceUpdateTitle;
        this.appInfoForceUpdateMsg = localStorage.appInfoForceUpdateMsg;
        this.startDate = localStorage.startDate;
        this.endDate = localStorage.endDate;
        this.paypalEnabled = localStorage.paypalEnabled;
        this.stripeEnabled = localStorage.stripeEnabled;
        this.codEnabled = localStorage.codEnabled;
        this.bankEnabled = localStorage.bankEnabled;
        this.publishKey = localStorage.publishKey;
        this.depositPercent = localStorage.depositPercent;
        this.coolDownPeriod = localStorage.coolDownPeriod;
        this.bidFee = localStorage.bidFee ;
        this.uploadFee = localStorage.uploadFee;
        this.memberShipDuration = localStorage.memberShipDuration;
        this.membershipAmount = localStorage.membershipAmount;
        this.depositPercent = localStorage.depositPercent;
        this.shippingId = localStorage.shippingId;
        this.standardShippingEnable = localStorage.standardShippingEnable;
        this.zoneShippingEnable = localStorage.zoneShippingEnable;
        this.noShippingEnable = localStorage.noShippingEnable;
        this.creditCardNo = localStorage.creditCardNo;
        this.creditCardValid = localStorage.creditCardValid;
        this.creditCardMonth = localStorage.creditCardMonth;
        this.creditCardYear = localStorage.creditCardYear;
        this.creditCardCVC = localStorage.creditCardCVC;
        this.creditCardName = localStorage.creditCardName;
        this.resultStartTime = localStorage.resultStartTime;
        this.userPassword = localStorage.userPassword;
        this.languageCode = localStorage.languageCode;
        // this.showProfile = localStorage.showProfile ?? appInfo('showUserProfile');
        this.showProfile = localStorage.showProfile;
    }
    replacelanguageCode(languageCode: string){
        localStorage.languageCode = languageCode;
        this.languageCode = languageCode;
    }
    replaceshowProfile(showProfile: string){
        localStorage.showProfile = showProfile;
        this.showProfile = showProfile;
        localStorage.showProfile = showProfile;
    }

    replaceCreditCard(creditCardNo: string,
                        creditCardMonth: string,
                        creditCardYear: string,
                        creditCardCVC: string,
                        creditCardName: string,
                        creditCardValid : Boolean) {

        localStorage.creditCardNo = creditCardNo;
        localStorage.creditCardMonth = creditCardMonth;
        localStorage.creditCardYear = creditCardYear;
        localStorage.creditCardCVC = creditCardCVC;
        localStorage.creditCardName = creditCardName;
        localStorage.creditCardValid = creditCardValid;

        this.creditCardNo = creditCardNo;
        this.creditCardMonth = creditCardMonth;
        this.creditCardYear = creditCardYear;
        this.creditCardCVC = creditCardCVC;
        this.creditCardName = creditCardName;
        this.creditCardValid = creditCardValid;
        
    }
    replaceLoginUserId(loginUserId : string ) {
        localStorage.loginUserId = loginUserId;
        this.loginUserId = loginUserId;
    }

    replaceNotiSetting(notiSetting : string ) {
        localStorage.notiSetting = notiSetting;
        this.notiSetting = notiSetting;
    }

    replacedeviceToken(deviceToken : string ) {
        localStorage.deviceToken = deviceToken;
        this.deviceToken = deviceToken;
    }


    replaceLoginUserName(loginUsername : string) {

        localStorage.loginUserName = loginUsername;
        this.loginUserName = loginUsername;
    }

    replaceLoginExpiryTime(time: number) {
        this.loginExpiryTime = time;
        localStorage.loginExpiryTime = this.loginExpiryTime;
    }

    replaceUserIdToVerify(userIdToVerify : string) {
        localStorage.userIdToVerify = userIdToVerify;
        this.userIdToVerify = userIdToVerify;
    }

    replaceUserNameToVerify(userNameToVerify : string) {
        localStorage.userNameToVerify = userNameToVerify;
        this.userNameToVerify = userNameToVerify;
    }

    replaceUserEmailToVerify(userEmailToVerify : string) {
        localStorage.userEmailToVerify = userEmailToVerify;
        this.userEmailToVerify = userEmailToVerify;
    }

    replaceUserPasswordToVerify(userPasswordToVerify : string) {
        localStorage.userPasswordToVerify = userPasswordToVerify;
        this.userPasswordToVerify = userPasswordToVerify;
    }

    replaceLocation(locationId : string, locationName : string, locationLat : string, locationLng: string) {
        localStorage.locationId = locationId;
        this.locationId = locationId;

        localStorage.locationName = locationName;
        this.locationName = locationName;

        localStorage.locationLat = locationLat;
        this.locationLat = locationLat;

        localStorage.locationLng = locationLng;
        this.locationLng = locationLng;
    }
    replaceSubLocation(subLocationId : string, subLocationName : string ) {
        localStorage.subLocationId = subLocationId;
        this.subLocationId = subLocationId;

        localStorage.subLocationName = subLocationName;
        this.subLocationName = subLocationName;

    }

    // Stripe Publish Key
    replacePublishKey(pubKey : string) {
        localStorage.publishKey = pubKey;
        this.publishKey = pubKey;
    }

    replaceDepositPercent(depositPercent : string) {
        localStorage.depositPercent = depositPercent;
        this.depositPercent = depositPercent;
    }  
    
    replaceCooldownPeriod(coolDownPeriod : string, bidFee : string, uploadFee : string) {
        localStorage.coolDownPeriod = coolDownPeriod;
        this.coolDownPeriod = coolDownPeriod;
        
        localStorage.bidFee = bidFee;
        this.bidFee = bidFee;

        localStorage.uploadFee = uploadFee;
        this.uploadFee = uploadFee;

        localStorage

    }

    replaceMembershipDuration(memberShipDuration) {
        localStorage.memberShipDuration = memberShipDuration;
        this.memberShipDuration = memberShipDuration;
    }
    
    replaceMembershipAmount(membershipAmount) {
        localStorage.membershipAmount = membershipAmount;
        this.membershipAmount = membershipAmount;
    }

    replaceResultStartTime(resultStartTime) {
        localStorage.resultStartTime = resultStartTime;
        this.resultStartTime = resultStartTime;
    }

    replaePassword(userPassword : string ) {
        localStorage.userPassword = userPassword;
        this.userPassword = userPassword;
    }

    logout() {
        this.replaceLoginUserId("");
        this.replaceLoginUserName("");
        this.replaceCreditCard('', '', '', '', '', false);

        firebaseApp.auth().signOut();
    }

    login(loginUserId: string, loginUserName : string ,deviceToken : string) {

        this.updateLoginExpiryTime();
        this.replaceLoginUserId(loginUserId);
        this.replaceLoginUserName(loginUserName);
        // this.replacedeviceToken(deviceToken);
        console.log(deviceToken)
    }

    private updateLoginExpiryTime() {
        const date = new Date()
        date.setDate(date.getDate() + 1); // set one day        
        this.replaceLoginExpiryTime(date.getTime());
    }

    private isLoginExpiry() {
        const currentTime = new Date().getTime();
        if(this.loginExpiryTime < currentTime) {
            this.replaceLoginExpiryTime(0);
            this.replaceLoginUserId('');
            // this.replacedeviceToken('');
            this.replaceLoginUserName('');

            return true;
        }else {
            return false;
        }
    }

    updateExpiryTimeForAction() {
        this.loginUserId = localStorage.loginUserId;
        if(this.loginUserId != null && this.loginUserId != "") {
            this.updateLoginExpiryTime();
        }
    }

    
    isUserLoggedIn() : boolean {
        
        this.loginUserId = localStorage.loginUserId;

        if(this.isLoginExpiry()) {
            return false;
        }else {        
            if(this.loginUserId != null && this.loginUserId != "") {
                // this.updateLoginExpiryTime();
                return true;
            }else {
                return false;
            }
        }
    }

    getLoginUserId() : string {
        this.loginUserId = localStorage.loginUserId;

        if(this.loginUserId != null && this.loginUserId != "") {
            return this.loginUserId;
        }else {
            return PsConst.NO_LOGIN_USER;
        }
    }

    getVerifyUserId() : string {
        this.userIdToVerify = localStorage.userIdToVerify;

        if(this.userIdToVerify != null && this.userIdToVerify != "") {
            return this.userIdToVerify;
        }else {
            return PsConst.NO_LOGIN_USER;
        }
    }

    replaceVerifyUserData(
        userIdToVerify: string,
        userNameToVerify: string,
        userEmailToVerify: string,
        userPasswordToVerify: string) {
            
            this.replaceUserIdToVerify(userIdToVerify);
            this.replaceUserNameToVerify(userNameToVerify);
            this.replaceUserEmailToVerify(userEmailToVerify);
            this.replaceUserPasswordToVerify(userPasswordToVerify);
            
    }

}

export const psValueHolderSymbol = Symbol('PsValueHolder')
export const createPsValueHolderState = () => {
  return reactive(new PsValueHolder())
}

export const usePsValueHolderState = () => inject(psValueHolderSymbol) as PsValueHolder
export const providePsValueHolderState = () => provide(
    psValueHolderSymbol,
    createPsValueHolderState()
)