<template>
    <div class="cursor-pointer h-full w-full" v-on:click="onClick != null ? onClick(user) : null">
        <!-- admin Pscard -->
        <ps-card class="flex-col h-full bg-primary-000 dark:bg-primaryDark-black">
            <div class="p-4 bg-primary-000 dark:bg-primaryDark-black rounded-xl lg:rounded-2xl">
                <div class="flex items-start justify-between leading-none" >
                    <div class="flex items-start no-underline text-black cursor-pointer">
                        <div class="flex mt-2 w-10 ">
                            <img alt="admin" class="rounded-full bg-transparent mx-1 w-10 h-10 object-cover"  width="15" height="10" :src="userListProvider.imageUrl( user ? user.userProfilePhoto : '', 1 )" @error="userListProvider.defaultProfileImage" >
                            
                        </div>
                        <div class="flex flex-col ms-4 w-28 sm:w-32">
                            <ps-route-link  :to="{ name: 'other-profile', params: {userId: user?.userId } }">
                            <div class="flex">
                                <ps-label class="font-medium lg:text-base text-sm" > {{ user ? user.userName : '' }} </ps-label>
                                <img alt="Placeholder" class="mx-1 w-3 h-3" width="15" height="10" src="@/assets/images/mark2.png" v-if="user?.isVerifybluemark == '1'">    
                            </div>
                            <!-- <ps-route-link :to="{ name: 'review-list',query: { user_id: user?.userId } }"> -->
                            <div class="flex items-center mt-1.5">
                                <rating :grade="user ? user.overallRating:0" :maxStars="5" :hasCounter="true" />
                            </div>
                            <!-- </ps-route-link> -->
                            <ps-label v-if="user && user.isShowEmail == '1' " class="font-light text-xxs lg:text-xs mt-0.5"> {{ user ? user.userEmail :''  }} </ps-label>
                            <ps-label v-if="user && user.isShowPhone == '1' " class="font-light text-xxs lg:text-xs  mt-0.5"> {{  user ? user.userPhone :''  }} </ps-label>
                            <ps-label class="font-light text-xxs lg:text-xs  mt-1.5"> {{  user ? user.userAboutMe.length > 20 ? user.userAboutMe.slice(0,20)+' ....' : user?.userAboutMe : ''  }} </ps-label>
                            </ps-route-link> 
                        </div>
                        <div v-if="user?.userId != LoginUserId" @click="followClick(user)">
                            <div class="flex ms-2 mt-2" v-if="user?.isFollowed == '0'">
                                <ps-button rounded="rounded-2xl" textSize="text-xxs lg:text-xs" > {{ $t("other_profile__follow") }} </ps-button>
                            </div>
                            <div class="flex ms-2 mt-2" v-else>
                                <ps-button rounded="rounded-2xl" textSize="text-xxs lg:text-xs" > {{ $t("other_profile__unfollow") }}  </ps-button>
                            </div>
                        </div>
                        
                    </div>
                </div>  
            </div> 
        </ps-card>
        <!-- end admin Pscard -->
    </div>
    <ps-loading-dialog ref="psloading"  :isClickOut='false'/> 
</template>
<script lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import router from "@/router";
import PsCard from '@/components/core/card/PsCard.vue';
import PsLabel from '@/components/core/label/PsLabel.vue'
import PsButton from '@/components/core/buttons/PsButton.vue'
import Rating from '@/components/core/rating/Rating.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

//Modules
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { createUserProviderState } from '@/store/modules/user/UserProvider';
import User from '@/object/User';

import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import UserFollowHolder from '@/object/holder/UserFollowHolder';
import { i18n } from '@/assets/locales/index';

export default {
    name : "UserListHorizontal",
    components : {        
        PsCard,
        PsLabel,
        Rating,
        PsRouteLink,
        PsButton,
        PsLoadingDialog
    },
    props : {
        user : { type : User } ,
        onClick : Function
    },
    emits: ['clickFollow'],
    setup(props, context) {
    // setup() {
        const route = useRoute();
        // Get Login User Id
        const psValueHolder = PsValueProvider.psValueHolder;
        const LoginUserId = psValueHolder.getLoginUserId();
        const psloading = ref();
        const followHolder = new UserFollowHolder();
        const userProvider = createUserProviderState();
        // Inject Provider
        const userListProvider = createUserListProviderState();
        async function followClick(user){
            if(psValueHolder.isUserLoggedIn()){
                psloading.value.openModal();
                if( user.isFollowed == '1'){
                    psloading.value.message = i18n.global.t('other_profile__removing_user_from_follower_list');
                }else{
                    psloading.value.message = i18n.global.t('other_profile__adding_user_to_follower_list');
                }
                followHolder.userId = LoginUserId;
                followHolder.followedUserId = user.userId;
                console.log(followHolder);
                const res = await userProvider.postUserFollow(followHolder);
                console.log(res);
                psloading.value.closeModal();
                context.emit('clickFollow', '');
            }
            else{
                let tempParams = {};
                tempParams = route.query;
                tempParams['redirect'] = route.name;
                router.push({name : 'login', query : tempParams, params : route.params });
            }
            
            
        }
        return {
            userListProvider,
            LoginUserId,
            followClick,
            psloading,
            userProvider
        }
    }
}
</script>