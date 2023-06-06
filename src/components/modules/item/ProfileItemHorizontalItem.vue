<template>

    <div class="cursor-pointer w-full" v-on:click="onClick != null ? onClick(item) : null">
        <!-- Pscard -->    
        <ps-card class="flex w-full flex-col " :enabledHover="true">
            
            <div v-if="psValueHolder.showProfile == 'show' " class="flex items-center justify-between leading-none lg:px-2 px-1 py-1 bg-primary-000 dark:bg-primaryDark-black rounded-t-xl lg:rounded-t-2xl">
                <div class="flex flex-row items-center no-underline text-black">
                    <div class="">
                        <img alt="Placeholder" width="15px" height="10px" class="rounded-full bg-transparent lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center object-cover" :src="productProvider.imageUrl(item ? item.user.userProfilePhoto : '',1)" @error="productProvider.defaultProfileImage" >
                    </div>
                    <p class="ms-2 mt-1 text-sm flex-grow">
                        <span class="flex">
                            <ps-label class="truncate lg:text-sm text-xs font-medium"  > {{item ? item.user.userName : ''}} </ps-label>
                            <img alt="Placeholder" class="mx-1 w-4 h-4 object-fill" width="15" height="10" src="@/assets/images/mark2.png" v-if="item ? item.user.isVerifybluemark == '1' : false">
                        </span>
                        <ps-label class="mt-1 font-medium text-xxs lg:text-xs " textColor="text-primary-500 dark:text-primaryDark-accent" v-if="item ? item.paidStatus == PsConst.PAID_AD_PROGRESS : false"> {{ $t('item_horizontal_item__sponsored') }} </ps-label>
                        <ps-label class="mt-1 font-medium text-xxs lg:text-xs " textColor="text-secondary-400 dark:text-secondaryDark-grey"  v-else> {{ item ? item.addedDateStr : '' }}  </ps-label>
                    </p>
                </div>
            </div> 
            <div class="lg:px-2 lg:py-2 px-1 py-1 bg-primary-000 dark:bg-primaryDark-black" :class="psValueHolder.showProfile == 'show'  ? 'rounded-b-xl lg:rounded-b-2xl pt-0' : 'rounded-xl lg:rounded-2xl'">
                <div class="relative lg:h-56 h-36 ">
                    <div class="absolute ">
                        <img alt="Placeholder" class="rounded-lg block lg:hidden object-cover w-screen lg:h-56 h-36 " width="640" height="360" v-lazy="productProvider.imageUrl(item ? item.defaultPhoto.imgPath : '',2) " @error="productProvider.defaultCarImage"/>
                        <img alt="Placeholder" class="rounded-lg hidden lg:block object-cover w-screen lg:h-56 h-36 " width="640" height="360" v-lazy="productProvider.imageUrl(item ? item.defaultPhoto.imgPath : '',2) " @error="productProvider.defaultCarImage"/>
                    </div>
                    <div class="relative lg:pt-48 pt-28 ">  
                        
                    </div>
                    <div class="relative opacity-80 bg-primary-500 dark:bg-primaryDark-accent rounded-b-lg">  
                        <ps-label v-if="item && item.isSoldOut == '1'" class="font-medium text-sm lg:text-base lg:py-1.5 py-2 rounded-b-lg text-center" textColor="text-textLight dark:text-textDark"> {{ $t('item_horizontal_item__sold_out') }}</ps-label>
                    </div>
                    
                </div>           
                <div class="flex flex-row pt-2 ps-1">
                    <ps-label class=" truncate font-medium text-sm lg:text-base" > {{item ? item.title : ''}} </ps-label>
                    <ps-label class="ms-2 flex-grow font-light text-xxs lg:text-xs" textColor="text-primary-500 dark:text-primaryDark-accent">{{item ? item.conditionOfItem.name : ''}} </ps-label>  
                </div>
                <div v-if="item?.discountRate!='0' && appInfoProvider.appInfo.data.psItemUploadConfig.discountRate== PsConst.ONE" class="flex flex-col ">  
                    
                    <ps-label class=" pt-0.5 ps-1 font-medium text-xs lg:text-base" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ item ? item.itemCurrency.currencySymbol : '' }} {{ formatPrice(item ? parseFloat(item.price)-(parseFloat(item.price)*(parseFloat(item.discountRate)/100)) : '') }} </ps-label>
                    <div class="flex flex-row pb-0.5">
                        <ps-label class="line-through  ps-1 font-light text-xxs lg:text-sm" > {{ item ? item.itemCurrency.currencySymbol : '' }} {{ formatPrice(item ? item.price : '') }} </ps-label>
                        <ps-label class=" ps-1 font-medium text-xs" > {{ ' - '+parseFloat(item ? item.discountRate : '')+' % ' }} </ps-label>
                    </div> 
                </div>
                <div v-else class="flex py-2">                    
                    <ps-label class="pt-1 ps-1 font-medium text-xs lg:text-base" textColor="text-primary-500 dark:text-primaryDark-accent"> {{ item ? item.itemCurrency.currencySymbol : '' }} {{ formatPrice(item ? item.price : '') }} </ps-label>
                </div>                
                <div class="pt-1 flex justify-between "> 
                    <div class="flex mt-1 ">
                        <ps-icon name="location" h="14" w="14" class="text-secondary-400 dark:text-textdark-100 me-1" />
                        <ps-label class="truncate font-light text-xxs lg:text-sm " textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{item ? item.itemLocation.name : ''}} </ps-label>
                    </div>
                    <div class="flex content-center items-center ">
                    
                        <ps-label class="truncate font-light text-xxs lg:text-sm" textColor="text-secondary-400 dark:text-secondaryDark-grey"> {{ item ? item.itemType.name : '' }} </ps-label>
                            
                    </div>
                </div>

            </div>

        </ps-card>
    </div>
    <!-- END Pscard -->
</template>

<script lang="ts">

// Components
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsCard from '@/components/core/card/PsCard.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsConst from '@/object/constant/ps_constants';

//language
import { i18n } from '@/assets/locales/index';
// Objects
import Product from '@/object/Product';

import format from 'number-format.js';

// Providers
import { createProductProviderState } from "@/store/modules/item/ProductProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { usePsValueHolderState } from '@/object/core/PsValueHolder';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
export default {
    name : "ItemHorizontalItem",
    components : {        
        PsLabel,
        PsCard,
        PsIcon,
    },
    props : {
        item : { type : Product } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        PsValueProvider.psValueHolder = usePsValueHolderState();
        const productProvider = createProductProviderState();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoProvider = usePsAppInfoProviderState();
        appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
        
        function formatPrice(value) {
            if(value.toString() == '0') {
                return i18n.global.t('item_price__free');
            }else {
                return format(appInfoProvider.appInfo.data.frontendConfigSetting.priceFormat, value);
            }
        }
        return {
            productProvider,
            formatPrice,
            PsConst,
            psValueHolder,
            appInfoProvider
        }
    }
}
</script>