import { PsObject } from "./core/PsObject";
import RatingDetail from "./RatingDetail";

export default class BlockedUser extends PsObject<BlockedUser>{
    
        userId : string = '';
        userIsSysAdmin : string = '';
        facebookId : string = '';
        googleId : string = '';
        phoneId : string = '';
        userName : string = '';
        userEmail : string = '';
        userPhone : string = '';
        userAddress : string = '';
        userLat : string = '';
        userLng : string = '';
        city : string = '';
        userPassword : string = '';
        userAboutMe : string = '';
        userCoverPhoto : string = '';
        userProfilePhoto : string = '';
        roleId : string = '';
        status : string = '';
        isBanned : string = '';
        addedDate : string = '';
        deviceToken : string = '';
        code : string = '';
        overallRating : string = '';
        whatsapp : string = '';
        messenger : string = '';
        followerCount : string = '';
        followingCount : string = '';
        emailVerify : string = '';
        facebookVerify : string = '';
        googleVerify : string = '';
        phoneVerify : string = '';
        ratingCount : string = '';
        isFollowed : string = '';
        isVerifybluemark: string='';
        ratingDetail : RatingDetail = new RatingDetail();
        isFavourited : string = '';
        isOwner : string = '';
        

    init(
        
            userId : string,
            userIsSysAdmin : string,
            facebookId : string,
            googleId : string,
            phoneId : string,
            userName : string,
            userEmail : string,
            userPhone : string,
            userAddress : string,
            userLat : string,
            userLng : string,
            city : string,
            userPassword : string,
            userAboutMe : string,
            userCoverPhoto : string,
            userProfilePhoto : string,
            roleId : string,
            status : string,
            isBanned : string,
            addedDate : string,
            deviceToken : string,
            code : string,
            overallRating : string,
            whatsapp : string,
            messenger : string,
            followerCount : string,
            followingCount : string,
            emailVerify : string,
            facebookVerify : string,
            googleVerify : string,
            phoneVerify : string,
            ratingCount : string,
            isFollowed : string,
            isVerifybluemark: string,
            ratingDetail : RatingDetail,
            isFavourited : string,
            isOwner : string,
        ) {
        this.userId = userId;
        this.userIsSysAdmin = userIsSysAdmin;
        this.facebookId = facebookId;
        this.googleId = googleId;
        this.phoneId = phoneId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.userAddress = userAddress;
        this.userLat = userLat;
        this.userLng = userLng;
        this.city = city;
        this.userPassword = userPassword;
        this.userAboutMe = userAboutMe;
        this.userCoverPhoto = userCoverPhoto;
        this.userProfilePhoto = userProfilePhoto;
        this.roleId = roleId;
        this.status = status;
        this.isBanned = isBanned;
        this.addedDate = addedDate;
        this.deviceToken = deviceToken;
        this.code = code;
        this.overallRating = overallRating;
        this.whatsapp = whatsapp;
        this.messenger = messenger;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
        this.emailVerify = emailVerify;
        this.facebookVerify = facebookVerify;
        this.googleVerify = googleVerify;
        this.phoneVerify = phoneVerify;
        this.ratingCount = ratingCount;
        this.isFollowed = isFollowed;
        this.isVerifybluemark = isVerifybluemark;
        this.ratingDetail = ratingDetail;
        this.isFavourited = isFavourited;
        this.isOwner = isOwner;
        

        return this;
    }
    getPrimaryKey(): string {
        return this.userId;
    }
    
    toMap(object: BlockedUser) : any {
        const map = {};

        map['user_id'] = object.userId;
        map['user_is_sys_admin'] = object.userIsSysAdmin;
        map['facebook_id'] = object.facebookId;
        map['google_id'] = object.googleId;
        map['phone_id'] = object.phoneId;
        map['user_name'] = object.userName;
        map['user_email'] = object.userEmail;
        map['user_phone'] = object.userPhone;
        map['user_address'] = object.userAddress;
        map['user_lat'] = object.userLat;
        map['user_lng'] = object.userLng;
        map['city'] = object.city;
        map['user_password'] = object.userPassword;
        map['user_about_me'] = object.userAboutMe;
        map['user_cover_photo'] = object.userCoverPhoto;
        map['user_profile_photo'] = object.userProfilePhoto;
        map['role_id'] = object.roleId;
        map['status'] = object.status;
        map['is_banned'] = object.isBanned;
        map['added_date'] = object.addedDate;
        map['device_token'] = object.deviceToken;
        map['code'] = object.code;
        map['overall_rating'] = object.overallRating;
        map['whatsapp'] = object.whatsapp;
        map['messenger'] = object.messenger;
        map['follower_count'] = object.followerCount;
        map['following_count'] = object.followingCount;
        map['email_verify'] = object.emailVerify;
        map['facebook_verify'] = object.facebookVerify;
        map['google_verify'] = object.googleVerify;
        map['phone_verify'] = object.phoneVerify;
        map['rating_count'] = object.ratingCount;
        map['is_followed'] = object.isFollowed;
        map['is_verify_blue_mark'] = object.isVerifybluemark;
        map['rating_details'] = new RatingDetail().toMap(object.ratingDetail);
        map['is_favourited'] = object.isFavourited;
        map['is_owner'] = object.isOwner;
        
       
       
        return map;
    }

    toMapList(objectList: BlockedUser[]) : any[] {
        const mapList : any[] = [];
        for(let i = 0; i < objectList.length; i++) {
            if(objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj : any) : BlockedUser {
        return new BlockedUser().init(

            obj.user_id,
            obj.user_is_sys_admin,
            obj.facebook_id,
            obj.google_id,
            obj.phone_id,
            obj.user_name,
            obj.user_email,
            obj.user_phone,
            obj.user_address,
            obj.user_lat,
            obj.user_lng,
            obj.city,
            obj.user_password,
            obj.user_about_me,
            obj.user_cover_photo,
            obj.user_profile_photo,
            obj.role_id,
            obj.status,
            obj.is_banned,
            obj.added_date,
            obj.device_token,
            obj.code,
            obj.overall_rating,
            obj.whatsapp,
            obj.messenger,
            obj.follower_count,
            obj.following_count,
            obj.email_verify,
            obj.facebook_verify,
            obj.google_verify,
            obj.phone_verify,
            obj.rating_count,
            obj.is_followed,
            obj.is_verify_blue_mark,
            new RatingDetail().fromMap(obj.rating_details),
            obj.is_favourited,
            obj.is_owner,          
        );        
    }

    fromMapList(objList : any[] ) : BlockedUser[] {
        const blockedUserList : BlockedUser[] = [];
        for(const obj in objList) {
            if(obj != null) {
                blockedUserList.push(this.fromMap(obj));
            }
        }

        return blockedUserList;
    }
    

}
