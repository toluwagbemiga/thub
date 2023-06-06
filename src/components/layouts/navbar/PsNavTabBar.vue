<template>

    <nav class="flex fixed z-50 w-full h-8 lg:h-12 bg-secondary-900 " 
        :class="topOfPage ? ' ' : 'hidden'">
        
        <div v-if="dataReady" class="flex flex-wrap justify-end items-center content-center text-textLight dark:text-textDark text-base w-mobile sm:w-median lg:w-large mx-auto" >
            
            <div class="">
                
                <ps-dropdown align="right" h="h-72" class='' >
                    <template #select >
                        <ps-label class="rounded-md shadow-sm h-full">
                            <button
                                type="button"
                                class="inline-flex items-center content-start justify-between w-full h-12 
                                            leading-5 font-medium text-base
                                            focus:outline-none transition 
                                            ease-in-out duration-150 btn-focus"
                            
                                :id="activeLanguage.name"
                                aria-haspopup="true"
                                aria-expanded="true" >
                                
                                <img  :src="getFlag(activeLanguage.languageCode)" :alt="activeLanguage.name"  width="35px" height="35px" class="me-1 w-auto h-4 cursor-pointer object-cover "/>
                                <ps-icon name="downArrow" class="text-textLight" w='24' h='24' />
                                
                            </button>
                        </ps-label>
                    </template>
                    <template #list >
                        <div
                            class="rounded-md bg-white shadow-xs w-56 " 
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu">
                            <div class="pt-2 z-30 absolute">
                                <div 
                                v-for="language in supportedLanguages" :key="language.languageCode"
                                textSize="text-sm">
                                    <div v-if="language.languageCode == activeLanguage.languageCode" :id="language.name" class="w-56 py-4 px-2 cursor-pointer flex flex-row items-center"  >
                                        <img :src="getFlag(language.languageCode)" :alt="language.name"  width="35px" height="35px" class="mx-4 w-auto h-6 cursor-pointer object-cover "/>                                      
                                        <ps-label class="font-medium">{{ language.name }} </ps-label>
                                    </div>
                                    <div v-else @click="changeLanguage(language)" :id="language.name" class="font-light w-56 py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer flex flex-row items-center"  >
                                        <img :src="getFlag(language.languageCode)" :alt="language.name"  width="35px" height="35px"  class="mx-4 w-auto h-4 cursor-pointer object-cover "/>                                      
                                        <ps-label>{{ language.name }} </ps-label>
                                        
                                    </div>
                                </div>                                
                            </div>
                            
                        </div>
                    </template>
                </ps-dropdown>
            </div>
            <ps-label v-on:click="toggleDarkMode" 
                class="cursor-pointer flex flex-row">
                    <div class="mx-2">
                        <ps-label class="text-xs lg:sm" textColor="text-textLight font-medium">Dark Mode</ps-label>
                    </div>
                    <div class="my-auto"> 
                        <img v-if="isDarkMode" src="@/assets/images/toggle_on.png" width="35px" height="35px" alt='toggle on' class="w-auto h-4 cursor-pointer object-cover "/>
                        <img v-else src="@/assets/images/toggle_off.png" width="35px" height="35px" alt='toggle off' class="w-auto h-4 cursor-pointer object-cover "/>
                    </div>
                    
            </ps-label>
           
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref,onMounted, reactive } from "vue";

import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';

import PsLabel from "@/components/core/label/PsLabel.vue";
import $ from "cash-dom";
import { useI18n } from 'vue-i18n';
import { i18n } from '@/assets/locales/index';
// Providers
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { usePsAppInfoProviderState } from '@/store/modules/appinfo/AppInfoProvider';

// Holders
// import Language from "@/object/Language";
import AppInfoParameterHolder from '@/object/holder/AppInfoParameterHolder';
export default defineComponent ({
    components : {
        PsIcon,
        PsDropdown,
        PsLabel,
    },
    props : {
        topOfPage : {
            type : Boolean,
            default : false 
        }
    },
    setup() {
        
        var psValueHolder = PsValueProvider.psValueHolder;
        const appInfoProvider = usePsAppInfoProviderState();
        var supportedLanguages = reactive( [
                { languageCode : 'en', countryCode : 'US', name : 'English US'},
                { languageCode : 'ar', countryCode : 'DZ', name : 'Arabic'},
                { languageCode : 'hi', countryCode : 'IN', name : 'Hindi'},
                { languageCode : 'de', countryCode : 'DE', name : 'German'},
                { languageCode : 'es', countryCode : 'ES', name : 'Spainish'},
                { languageCode : 'fr', countryCode : 'FR', name : 'French'},
                { languageCode : 'id', countryCode : 'ID', name : 'Indonesian'},
                { languageCode : 'it', countryCode : 'IT', name : 'Italian'},
                { languageCode : 'ja', countryCode : 'JP', name : 'Japanese'},
                { languageCode : 'ko', countryCode : 'KR', name : 'Korean'},
                { languageCode : 'ms', countryCode : 'MY', name : 'Malay'},
                { languageCode : 'pt', countryCode : 'PT', name : 'Potuguese'},
                { languageCode : 'ru', countryCode : 'RU', name : 'Russian'},
                { languageCode : 'th', countryCode : 'TH', name : 'Thai'},
                { languageCode : 'tr', countryCode : 'TR', name : 'Turkish'},
                { languageCode : 'zh', countryCode : 'CN', name : 'Chinese'}
        ] ) ;
        var activeLanguage = ref();
        const dataReady = ref(false);
       
        onMounted( async () =>{
            const appInfoParameterHolder = new AppInfoParameterHolder();
            appInfoParameterHolder.userId = psValueHolder.getLoginUserId();
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);
            let excludeLanguage = appInfoProvider.appInfo.data.frontendConfigSetting.excludeLanguage;
            for(let i = 0 ; i< supportedLanguages.length ; i ++ ){
                for(let j = 0 ; j < excludeLanguage.length ; j ++ ){
                    if(excludeLanguage[j].languageCode == supportedLanguages[i].languageCode){
                        supportedLanguages.splice(i, 1)
                    }

                }
            }
            // for(var language of appInfoProvider.appInfo.data.frontendConfigSetting.excludeLanguage){
            //     var index = supportedLanguages.indexOf(language);
            //     if(index !== -1){
            //         supportedLanguages.splice(index, 1)
            //     }

            // }
            if(psValueHolder.languageCode == '' || psValueHolder.languageCode== undefined){
                activeLanguage.value =  appInfoProvider.appInfo.data.frontendConfigSetting.defaultLanguage;
            }else{
                for(var lan of supportedLanguages){
                    if(lan.languageCode == psValueHolder.languageCode){
                        activeLanguage.value =  lan;
                    }

                }  
            }
            dataReady.value= true;

        })

        

        //light / dark mode
        const isDarkMode = ref(true);
        function toggleDarkMode() {
            
            if(localStorage.isDarkMode != null && localStorage.isDarkMode == 'true') {
                localStorage.isDarkMode = 'false';
                isDarkMode.value = false;
            }else {
                localStorage.isDarkMode = 'true';
                isDarkMode.value = true;
            }
            loadIsDarkMode();
        }

        loadIsDarkMode();
        function loadIsDarkMode() {
            if(localStorage.isDarkMode != null && localStorage.isDarkMode == 'true') {
                $("html").addClass("dark");
                isDarkMode.value = true;
            }else {
                $("html").removeClass("dark");
                isDarkMode.value = false;
            }
        }
    

        //language selection
        const t = useI18n;
        function changeLanguage(language){
            psValueHolder.replacelanguageCode(language.languageCode);    
            i18n.global.locale = language.languageCode;
            i18n.global.fallbackLocale = language.languageCode;
            activeLanguage.value = language;
        }
        function getFlag(v){
            if(v == 'en'){
                return require('@/assets/flags/usflag.png');
            }else if(v == 'ar'){
                return require('@/assets/flags/dzFlag.png')
            }else if(v == 'hi'){
                return require('@/assets/flags/inFlag.jpeg');
            }else if(v == 'de'){
                return require('@/assets/flags/germanFlag.jpg');
            }else if(v == 'es'){
                return require('@/assets/flags/spainFlag.jpg');
            }else if(v == 'fr'){
                return require('@/assets/flags/frenchFlag.jpg');
            }else if(v == 'id'){
                return require('@/assets/flags/indonesiaFlag.jpg');
            }else if(v == 'it'){
                return require('@/assets/flags/italyFlag.jpg');
            }else if(v == 'ja'){
                return require('@/assets/flags/japanFlag.jpg');
            }else if(v == 'ko'){
                return require('@/assets/flags/southkoreaFlag.jpg');
            }else if(v == 'ms'){
                return require('@/assets/flags/malaysiaFlag.jpg');
            }else if(v == 'pt'){
                return require('@/assets/flags/potugueseFlag.jpg');
            }else if(v == 'ru'){
                return require('@/assets/flags/russiaFlag.jpg');
            }else if(v == 'th'){
                return require('@/assets/flags/thaiFlag.jpg');
            }else if(v == 'tr'){
                return require('@/assets/flags/turkishFlag.jpg');
            }else if(v == 'zh'){
                return require('@/assets/flags/chinaFlag.jpg');
            }
        }
        
        return {
            isDarkMode,
            toggleDarkMode,
            activeLanguage,
            supportedLanguages,
            changeLanguage,
            t,
            getFlag,
            dataReady
        }

    }
});
</script>