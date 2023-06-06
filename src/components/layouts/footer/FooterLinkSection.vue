<template>
    <div class="h-auto text-100 bg-secondary-900 flex flex-col justify-between ">
        <div class='w-mobile sm:w-median lg:w-large mx-auto'>
            <div class="w-full text-textLight mt-8" >
                <div class="grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-2">
                    <div>
                        <ps-label class="font-medium mb-4 lg:text-2xl text-xl" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> {{ $t("footer__shop") }} </ps-label>
                         <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                            <ps-route-link
                            
                                :to="{name: 'category-list' }"
                                textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                    {{ $t("footer__categories") }}
                            </ps-route-link>
                        </ps-label>

                        <ps-label class="mt-2 font-light lg:text-sm text-xs cursor-pointer" @click="viewAllRecentItemList" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                 {{ $t("footer__latest_posts") }}
                        </ps-label>

                        <ps-label class="my-2 font-light lg:text-sm text-xs cursor-pointer" @click="viewAllPopularItemList" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                 {{ $t("footer__popular_posts") }}
                        </ps-label>
                    </div>

                    <div>
                        <ps-label class=" mb-4 font-medium lg:text-2xl text-xl" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> {{ $t("footer__support") }} </ps-label>
                        <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                        <ps-route-link
                            :to="{name: 'contact' }" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                               {{ $t("footer__contact_us") }}
                        </ps-route-link>
                        </ps-label>
                        
                        <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                            <ps-route-link
                                :to="{name: 'safety' }" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                    {{ $t("footer__safety_tips") }}
                            </ps-route-link>
                        </ps-label>
                        
                        <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                            <ps-route-link
                                :to="{name: 'privacy' }" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                    {{ $t("footer__privacy_policy") }}
                            </ps-route-link>
                        </ps-label>
                        <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                            <ps-route-link
                                :to="{name: 'terms-and-conditions' }" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                    {{ $t("term_and_condition__term_and_condition") }}
                            </ps-route-link>
                        </ps-label>
                        <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                            <ps-route-link
                                :to="{name: 'faq' }" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                    {{ $t("faq_page__faq_page") }}
                            </ps-route-link>
                        </ps-label>
                    </div>

                    <div>
                        <ps-label class="font-medium lg:text-2xl text-xl mb-4" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> {{ $t("footer__company") }} </ps-label>
                        <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                            <ps-route-link
                                :to="{name: 'about' }" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                    {{ $t("footer__about_us") }}
                            </ps-route-link>
                        </ps-label>
                        <ps-label class="mt-2 font-light lg:text-sm text-xs" >
                            <ps-route-link 
                                :to="{name: 'blog-list' }" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> 
                                    {{ $t("footer__blogs") }}
                            </ps-route-link>
                        </ps-label>
                    </div>

                    <div class="sm:col-span-1 col-span-2 mt-4">
                        <ps-label class="w-full" >
                            <ps-route-link
                                class=""
                                :to="{name: 'dashboard' }"> 
                                <div class="flex flex-row">
                                    <img @click="gotToHome" src="@/assets/images/fbs_icon.png" class=" lg:w-12 w-8 cursor-pointer object-cover " alt="Footer Logo" width="50px" height="50px"/> 
                                    <ps-label class="font-medium lg:text-xl text-base text-textLight my-auto ms-2" textColor="text-textLight" textSize="font-light lg:text-sm text-xs"> {{ $t("footer__flutter_buysell") }} </ps-label>
                                </div>
                            </ps-route-link>
                        </ps-label>

                        <div class="w-full flex flex-auto mt-2">
                            <ps-label v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.googleSetting == '1'" >
                                <ps-link  textColor="text-textLight" :url="appInfoProvider.appInfo.data.frontendConfigSetting.googlePlayUrl"> 
                                    <div class=" p-1 pt-2 bg-black rounded-lg ">
                                        <img src="@/assets/images/get_on_google_play.png" class="w-full cursor-pointer object-cover" alt="goole play store" width="50px" height="50px"/> 
                                    </div> 
                                    
                                </ps-link>
                            </ps-label>
                            <ps-label  v-if="appInfoProvider?.appInfo?.data?.frontendConfigSetting?.appStoreSetting == '1'" class="ms-3" >
                                <ps-link textColor="text-textLight" :url="appInfoProvider.appInfo.data.frontendConfigSetting.appStoreUrl">  
                                <div class=" p-1 bg-black rounded-lg ">
                                        <img src="@/assets/images/get_on_apple_store.png" class=" w-full cursor-pointer object-cover" alt="goole play store" width="50px" height="50px"/> 
                                    </div>
                                </ps-link>
                            </ps-label>
                        </div>
                    </div>
                </div>
                
            </div>
        </div> 

        <div class='mb-4 flex justify-center items-center mt-8'>             
            <ps-label-caption textColor="text-textLight"> {{appInfoProvider?.appInfo?.data?.frontendConfigSetting?.copyRight}} - Version {{versionNo}} </ps-label-caption>
        </div> 
    </div>
</template>

<script>

// Libs
import { ref } from 'vue';
import router from '@/router';
import PsLabel from '@/components/core/label/PsLabel.vue';
 import PsLink from '@/components/core/link/PsLink.vue'
import PsRouteLink from '@/components/core/link/PsRouteLink.vue'
import PsLabelCaption from '@/components/core/label/PsLabelCaption.vue'
// Holders
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { useRecentItemProviderState } from "@/store/modules/item/RecentItemProvider";
import { usePopularItemProviderState } from '@/store/modules/item/PopularItemProvider';
import PsConfig from "@/config/PsConfig";
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
export default {
    components : {
        PsLabel,
         PsLink,
        PsRouteLink,
        PsLabelCaption
    },
    setup() {
        // Inject Item Provider
        const psValueHolder = PsValueProvider.psValueHolder;
        const locationId = ref(psValueHolder.locationId);
        const versionNo = ref(PsConfig.versionNo);


        // Inject Item Provider
        const itempopularProvider = usePopularItemProviderState();
        const itemrecentProvider = useRecentItemProviderState();
        itempopularProvider.paramHolder.itemLocationId = locationId.value;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        function gotToHome() {
            router.push({name : "dashboard"});
        }
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

        function viewAllRecentItemList() {
            const params = itemrecentProvider.paramHolder.getUrlParamsAndQuery();
            params['name'] = 'item-list';
            
            router.push(params);
            
            
        }

        function viewAllPopularItemList() {

            const params = itempopularProvider.paramHolder.getUrlParamsAndQuery();
            params['name'] = 'item-list';
         
            // Redirect
            router.push(params);
            

        }

        return  {
            gotToHome,
            viewAllPopularItemList,
            viewAllRecentItemList,
            versionNo,
            PsConfig,
            appInfoProvider
        }
    }
}
</script>
        