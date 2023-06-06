<template>

    <div class="cursor-pointer sm:w-full md:w-full" v-on:click="onClick != null ? onClick(buyad) : null">
        <!-- Pscard -->    
        <ps-card class="flex flex-col my-2 " :enabledHover="true">

            
                <div class="pt-2 flex items-center justify-between mx-2 lg:mx-4">
                    <div class="">
                        <ps-label class=" truncate font-medium text-sm lg:text-base" > {{buyad ? buyad.package.title : ''}} </ps-label>
                    </div>
                    <div class="">
                        <ps-label class="pt-1 ps-1 font-medium text-xs lg:text-base bg-pri" textColor=" text-primary-500 dark:text-primaryDark-accent"> {{ buyad ? buyad.package?.itemCurrency.currencySymbol : '' }} {{ formatPrice(buyad ? buyad.price : '') }} </ps-label>
                    </div>
                </div> 
                <ps-line class="w-full lg:h-3 h-2 border border-l-0 border-r-0 border-secondary-400 dark:border-secondaryDark-grey" />
                <div class="pt-2 flex items-center justify-between mx-2 lg:mx-4 ">
                    <div class="">
                        <ps-label class="font-medium text-xs lg:text-base" > {{ $t("profile__buy_limit_ad_payment") }} </ps-label>
                    </div>
                    <div class="">
                        <ps-label class="ms-1 font-medium text-xxs lg:text-sm" > {{ buyad ? buyad?.paymentMethod : '' }} </ps-label>
                    </div>
                </div> 
                <div class="pt-2 flex items-center justify-between mx-2 lg:mx-4 mb-2 lg:mb-4">
                    <div class="">
                        <ps-label class="font-medium text-xs lg:text-base" > {{ $t("profile__buy_limit_ad_date") }} </ps-label>
                    </div>
                    <div class="">
                        <ps-label class="truncate ms-1 font-medium text-xxs lg:text-sm" > {{ buyad ? buyad?.addedDate : '' }} </ps-label>
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
import PsLine from '@/components/core/line/PsLine.vue';

//language
import { i18n } from '@/assets/locales/index';

import format from 'number-format.js';

// Objects
import LimitAdTransaction from '@/object/LimitAdTransaction';

// Providers
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
import { createLimitAdItemProviderState } from "@/store/modules/limit/LimitAdItemProvider";
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { usePsValueHolderState } from '@/object/core/PsValueHolder';
export default {
    name : "LimitAdHorizontalItem",
    components : {        
        PsLabel,
        PsCard,
        PsLine
    },
    props : {
        buyad : { type : LimitAdTransaction } ,
        onClick : Function
    },
    setup() {
        // Inject Provider
        PsValueProvider.psValueHolder = usePsValueHolderState();
        const limitProvider = createLimitAdItemProviderState();
        // console.log(limitProvider);
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
            limitProvider,
            formatPrice,
            psValueHolder
        }
    }
}
</script>