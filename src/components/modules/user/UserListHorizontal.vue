<template>
    <div class="cursor-pointer h-full w-full" v-on:click="onClick != null ? onClick(user) : null">
        <!-- Pscard -->
         <ps-card class="flex-col h-full bg-primary-000 dark:bg-primaryDark-black lg:p-5 p-3">
            <div class="w-full">
                <img alt="Placeholder" width="15px" height="10px" class="rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover mx-auto" :src="userProvider.imageUrl(user ? user.userProfilePhoto : '',2)" @error="userProvider.defaultProfileImage"  >
                <div class="flex flex-col mt-2 lg:mt-3 justify-center"> 
                    <ps-label class=" text-center text-lg lg:text-xl"> {{   user ? user.userName :'' }} </ps-label>
                    <div v-if="user && user.isVerifybluemark == '1'" class=" mt-2 lg:mt-3 lg:w-32 w-28 mx-auto flex flex-row justify-center py-1.5 px-3 bg-secondary-500 dark:bg-secondaryDark-accent rounded-2xl">
                        <ps-label textColor="text-textLight dark:text-textDark" class=" text-center text-xxs lg:text-xs"> {{ $t("user_list_horizontal__verified_dealer") }}  </ps-label>
                        <ps-icon name="check" w="12" h="12" textColor="text-textLight dark:text-textDark" />
                    </div>
                                    
                </div>
                <div class="flex items-center content-center justify-center  mt-2 lg:mt-3 px-4">
                    <rating :grade="user ? user.overallRating:0" :maxStars="5" :hasCounter="true" />
                    <ps-label-caption class="ms-2">{{  user ? user.overallRating:'' }} ({{  user ? user.ratingCount:'' }}) </ps-label-caption>
                </div>
                <ps-label v-if="user && user.isShowEmail == '1' " class="font-light text-xxs lg:text-xs mt-1 text-center"> {{  user ? user.userEmail :'' }} </ps-label>
                <ps-label v-if="user && user.isShowPhone == '1' " class="font-light text-xxs lg:text-xs mt-1 text-center"> {{  user ? user.userPhone :'' }} </ps-label>
                <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center"> {{  user ? user.userAboutMe :'' }} </ps-label>
            </div>
            <div  class="w-full">
                <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center">{{ $t("user_list_horizontal__joined") }} - {{ user ? user.addedDate:''}}</ps-label>
    
                                
                <div class="lg:mt-2 mt-1.5 flex justify-between">
                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("user_list_horizontal__followers") }} </ps-label>
                    <ps-label class="font-light text-xs lg:text-sm"> : {{user ? user.followerCount:'0'}}</ps-label>
                </div>
                <div class="lg:mt-2 mt-1.5 flex justify-between">
                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("user_list_horizontal__followings") }} </ps-label>
                    <ps-label  class="font-light text-xs lg:text-sm">{{user ? user.followingCount:'0'}}</ps-label>
                </div>


            </div>
        </ps-card>

    </div>
    
</template>

<script lang="ts">

import PsCard from '@/components/core/card/PsCard.vue';
import PsLabel from '@/components/core/label/PsLabel.vue'
import Rating from '@/components/core/rating/Rating.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';

//Modules
import { createUserListProviderState } from "@/store/modules/user/UserListProvider";
import User from '@/object/User';

export default {
    name : "UserListHorizontal",
    components : {        
        PsCard,
        PsLabel,
        Rating,
        PsLabelCaption
    },
    props : {
        user : { type : User } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        const userProvider = createUserListProviderState();
        return {
            userProvider
        }
    }
}
</script>