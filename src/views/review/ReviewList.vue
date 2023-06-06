<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-8 ">
               
                <div class="flex flex-col mb-4">
                    <div class="flex flex-col items-start ">
                        <ps-label-header-4 class="font-medium"> {{ $t("review_list__review_list") }} </ps-label-header-4>
                        <ps-label class="mt-2 text-start"> {{ $t("review_list__text") }} </ps-label>
                    </div>
                    <!-- breadcrumb -->
                    <div class=" mb-4 flex items-center mt-8"> 
                         <ps-route-link v-if="loginUserId == userId" :to="{ name: 'profile' }">
                            <ps-label
                                class="hover:underline cursor-pointer font-medium"> 
                                    {{ breadcrumbuserProvider.user.data ? breadcrumbuserProvider.user.data.userName:'' }}
                            </ps-label>
                        </ps-route-link>
                        <ps-route-link v-else :to="{ name: 'other-profile', params: {userId: userId } }">
                            <ps-label
                                class="hover:underline cursor-pointer font-medium"> 
                                    {{ breadcrumbuserProvider.user.data ? breadcrumbuserProvider.user.data.userName:'' }}
                            </ps-label>
                        </ps-route-link>
                        <ps-icon name="rightArrow" class='mx-2'/>  
                        <ps-label class="font-light"> {{ $t("review_list__review_list") }} </ps-label>
                    </div>
                    <!-- end breadcrumb -->
                    <!-- customer review -->
                    <div class="flex justify-between sm:w-3/4 md:w-2/3 w-full mt-2">
                        <div class="w-full flex flex-col bg-white dark:bg-primaryDark-black border rounded-md border-gray-200 dark:border-black pt-4 py-4 px-8">
                          
                            <ps-label-title-3 > {{reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingCount : ''}}{{ $t("review_list__customer_reviews") }}  </ps-label-title-3>
                            <rating class="mt-5" :grade="reviewuserProvider.user.data ? reviewuserProvider.user.data.overallRating:0" :maxStars="5" :hasCounter="true" />
                            <div class="flex items-center text-primary-500 dark:text-primaryDark-accent mt-5">
                                <ps-label-title-3 class="w-20 md:w-16 "> {{ $t("review_list__5_stars") }} </ps-label-title-3>
                                <div class="w-96 px-5">
                                    <base-progress :percentage="reviewuserProvider.user.data ? reviewuserProvider.user?.data?.ratingDetail?.fiveStarPercent : 0" class="mx-2 mb-2 h-20"/>
                                </div>
                                <ps-label-caption> {{reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.fiveStarPercent : 0}} %</ps-label-caption>
                            </div>

                            <div class="flex items-center text-primary-500 dark:text-primaryDark-accent mt-5">
                                <ps-label-title-3 class="w-20 md:w-16 ">{{ $t("review_list__4_stars") }} </ps-label-title-3>
                                <div class="w-96 px-5">
                                    <base-progress :percentage="reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.fourStarPercent : 0" class="mx-2 mb-2 h-20"/>
                                </div>
                                <ps-label-caption> {{reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.fourStarPercent : 0}} %</ps-label-caption>
                            </div>

                            <div class="flex items-center text-primary-500 dark:text-primaryDark-accent mt-5">
                                <ps-label-title-3 class="w-20 md:w-16 "> {{ $t("review_list__3_stars") }} </ps-label-title-3>
                                <div class="w-96 px-5">
                                    <base-progress :percentage="reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.threeStarPercent : 0" class="mx-2 mb-2 h-20"/>
                                </div>
                                <ps-label-caption> {{reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.threeStarPercent : 0}} %</ps-label-caption>
                            </div>

                            <div class="flex items-center text-primary-500 dark:text-primaryDark-accent mt-5">
                                <ps-label-title-3 class="w-20 md:w-16 "> {{ $t("review_list__2_stars") }} </ps-label-title-3>
                                <div class="w-96 px-5">
                                    <base-progress :percentage="reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.twoStarPercent : 0" class="mx-2 mb-2 h-20"/>
                                </div>
                                <ps-label-caption> {{reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.twoStarPercent : 0}} %</ps-label-caption>
                            </div>

                            <div class="flex items-center text-primary-500 dark:text-primaryDark-accent mt-5">
                                <ps-label-title-3 class="w-20 md:w-16 "> {{ $t("review_list__1_star") }} </ps-label-title-3>
                                <div class="w-96 px-5">
                                    <base-progress :percentage="reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.oneStarPercent : 0" class="mx-2 mb-2 h-20"/>
                                </div>
                                <ps-label-caption> {{reviewuserProvider.user.data ? reviewuserProvider.user.data.ratingDetail?.oneStarPercent : 0}} %</ps-label-caption>
                            </div>
                        </div>
                    </div>
                    <!-- end customer review -->

                </div>

                <div class="flex flex-col">
                    <div class="flex flex-row ">
                        <div class="w-full flex flex-col mt-4 ">
                            
                            <div class="flex flex-wrap ">
                        
                                <!-- Rating User Listing -->
                                <div class="w-full sm:w-full md:w-96 md:mx-2" v-for="rate in ratinglistProvider.ratingList.data" :key="rate.id">                                        
                                    <rating-horizontal :rate="rate" :onClick="rateClicked"/>
                                </div>
                                <!-- End Rating User -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </ps-content-container>
</template>

<script lang="ts">
import router from "@/router";

import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabelTitle3 from '@/components/core/label/PsLabelTitle3.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import Rating from '@/components/core/rating/Rating.vue';
import BaseProgress from '@/components/core/progressbar/BaseProgress.vue';
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

//Modules
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { createUserProviderState } from "@/store/modules/user/UserProvider";
import { createRatingListProviderState } from "@/store/modules/rating/RatingListProvider";
import RatingHorizontal from "@/components/modules/rating/RatingHorizontal.vue";
import { useRoute } from 'vue-router';
// Params Holders
import RatingListHolder from '@/object/holder/RatingListHolder';

export default {
    name : "ReviewListView",
    components : {
        PsContentContainer,
        PsLabel,
        PsLabelHeader4,
        PsIcon,
        Rating,
        PsLabelTitle3,
        BaseProgress,
        PsLabelCaption,
        RatingHorizontal,
        PsRouteLink
    },
    setup() {
     
        const psValueHolder = PsValueProvider.psValueHolder;
        const holder = new RatingListHolder();
        const breadcrumbuserProvider = createUserProviderState();
        const reviewuserProvider = createUserProviderState();
        const ratinglistProvider = createRatingListProviderState();
        const loginUserId = psValueHolder.getLoginUserId();
        const route = useRoute();
        const userId = route.query.user_id?.toString() ?? '';

        // Load User By ID List
        breadcrumbuserProvider.getUser(userId);

        //load Rating list
        holder.userId = userId;
        ratinglistProvider.resetRatingList(holder);

        // Load User By ID List
        reviewuserProvider.getUser(userId);

        function rateClicked() {
            router.push({
                name: "rating-detail",
            });
        }


        return {
            breadcrumbuserProvider,
            ratinglistProvider,
            reviewuserProvider,
            rateClicked,
            loginUserId,
            userId
        }
    }
}
</script>