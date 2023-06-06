<template>
    <div class="cursor-text sm:w-11/12 md:w-full" >
        
        <ps-card class="flex-col bg-primary-000 dark:bg-primaryDark-black lg:p-5 p-3">
            <div class="w-full">
                <img alt="Placeholder" width="500px" height="500px" class="rounded-full w-16 h-16 lg:w-24 lg:h-24 object-cover mx-auto" :src="blockuserProvider.imageUrl(block ? block.userProfilePhoto : '',2)" @error="blockuserProvider.defaultProfileImage"  >
                <div class="flex flex-col mt-2 lg:mt-3 justify-center"> 
                    <ps-label class=" text-center text-lg lg:text-xl"> {{   block ? block.userName :'' }} </ps-label>
                    <div v-if="block.isVerifybluemark == '1'" class=" mt-2 lg:mt-3 lg:w-32 w-28 mx-auto flex flex-row justify-center py-1.5 px-3 bg-secondary-500 dark:bg-secondaryDark-accent rounded-2xl">
                        <ps-label textColor="text-textLight dark:text-textDark" class=" text-center text-xxs lg:text-xs"> {{ $t("block_user_list_horizontal__verified_dealer") }}  </ps-label>
                        <ps-icon name="check" w="12" h="12" class="text-textLight dark:text-textDark" />
                    </div>
                </div>
                <div class="flex items-center content-center justify-center  mt-2 lg:mt-3 px-4">
                    <rating :grade="block ? block.overallRating:0" :maxStars="5" :hasCounter="true" />
                    <ps-label-caption class="ms-2">{{  block ?  block.overallRating:'' }} ({{  block ? block.ratingCount:'' }}) </ps-label-caption>
                </div>
                <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center"> {{  block ? block.userAboutMe :'' }} </ps-label>
            </div>
            <div  class="w-full">
                <ps-label class="font-light text-xxs lg:text-xs mt-4 text-center">{{ $t("block_user_list_horizontal__joined") }} - {{ block ? block.addedDate:''}}</ps-label>
                 
                <div class="lg:mt-2 mt-1.5 flex justify-between">
                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("block_user_list_horizontal__followers") }} </ps-label>
                    <ps-label class="font-light text-xs lg:text-sm"> : {{block ? block.followerCount:'0'}}</ps-label>
                </div>
                <div class="lg:mt-2 mt-1.5 flex justify-between">
                    <ps-label class="font-light text-xs lg:text-sm">{{ $t("block_user_list_horizontal__followings") }} </ps-label>
                    <ps-label  class="font-light text-xs lg:text-sm">{{block ? block.followingCount:'0'}}</ps-label>
                </div>
                <div class="mt-2 py-2 text-center w-full bg-background dark:bg-backgroundDark rounded-2xl  lg:w-full mx-auto mb-2"> 
                    <ps-label class="text-xxs lg:text-xs cursor-pointer" v-on:click="onClick != null ? onClick(block) : null"> 
                         {{ $t("block_user_list_horizontal__unblock") }} 
                    </ps-label>
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
import { createBlockUserProviderState } from "@/store/modules/user/BlockUserProvider";
import BlockedUser from '@/object/BlockedUser';

export default {
    name : "UserListHorizontal",
    components : {        
        PsCard,
        PsLabel,
        Rating,
        PsLabelCaption
    },
    props : {
        block : { type : BlockedUser,default : new BlockedUser },
        onClick : Function
    },
    setup() {
        // Inject Provider
        const blockuserProvider = createBlockUserProviderState();
        return {
            blockuserProvider,
        }
    }
}
</script>