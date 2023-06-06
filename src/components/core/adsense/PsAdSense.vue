<template>
    <div v-if="dataReady">
        <div class="flex sm:hidden ">
            <ins class="adsbygoogle mt-2 "
                :style="adStyle"
                data-adtest="on"
                :data-ad-client="adsClient"
                :data-ad-format="adFormat"
                :data-ad-slot="adsSlot"></ins>
        </div>
        <div class="hidden sm:flex lg:hidden ">
            <ins class="adsbygoogle mt-2 "
                :style="adStyleSm"
                data-adtest="on"
                :data-ad-client="adsClient"
                :data-ad-format="adFormat"
                :data-ad-slot="adsSlot"></ins>
        </div>
        <div class="hidden lg:flex ">
            <ins class="adsbygoogle mt-2 "
                :style="adStyleLg"
                data-adtest="on"
                :data-ad-client="adsClient"
                :data-ad-format="adFormat"
                :data-ad-slot="adsSlot"></ins>
        </div>
    </div>
   
</template>

<script lang='ts'>

import {  onMounted,ref } from 'vue';

// Providers
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
export default {
    name : "PsAdSense",
    props: {
        adStyle: {
            type: String,
            required: false,
            default: "display:inline-block; width: 300px; height: 190px;",
        },
        adStyleSm: {
            type: String,
            required: false,
            default: "display:inline-block; width: 468px; height: 60px;",
        },
        adStyleLg: {
            type: String,
            required: false,
            default: "display:inline-block; width: 728px; height: 90px;",
        },
        adFormat: {
            type: String,
            required: false,
            default: "horizontal",
        }
    },
    setup() {
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const appInfoProvider = usePsAppInfoProviderState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        
        const adsClient = ref('');
        const adsSlot = ref('');
        const dataReady= ref(false);

        async function loadData(){
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            //if(props.adClient == '0'){
                adsClient.value = appInfoProvider.appInfo.data.frontendConfigSetting.adClient;
            // }else{
            //     adsClient.value = props.adClient.toString();
            // }
            //if(props.adSlot == '0'){
                adsSlot.value = appInfoProvider.appInfo.data.frontendConfigSetting.adSlot;
            //}else{
                //adsSlot.value = props.adClient.toString();
            //}
            dataReady.value = true;
            console.log("Adsense");
            console.log(adsSlot.value);
            console.log(adsClient.value);
        }
        
        
        onMounted( async() =>{
            await loadData();
            let inlineScript   = document.createElement("script");
            inlineScript.type  = "text/javascript";
            inlineScript.text  = '(adsbygoogle = window.adsbygoogle || []).push({});'
            
            document.getElementsByTagName('body')[0].appendChild(inlineScript);
        })
        return{
            adsClient,
            adsSlot,
            dataReady
        }
    }
}
</script>
