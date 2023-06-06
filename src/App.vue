
<style>
/* @import "css/app.css"; */

.fade-enter,
.fade-leave-to
 {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}

</style>

<template>

    <div v-if="dataReady" class='bg-background dark:bg-backgroundDark h-full'>
    <div id="app" :dir='getDir()' class="  w-full h-full flex flex-col min-h-screen ">
        <vue-progress-bar></vue-progress-bar>

        <!-- Body --> 
        <main class="flex-grow">
            <router-view v-slot="{ Component, route }" >
                <transition name="slide-fade" mode="out-in" appear>
                    <div :key="route.fullPath">  
                        <component :is="Component"></component>
                    </div>
                </transition>
            </router-view>
        </main> 
        <!-- End Body -->
        
        <div class="top-0 fixed">
        <ps-nav-tab-bar  :topOfPage="atTopOfPage" />
        <ps-nav-bar v-if="renderComponent" :topOfPage="atTopOfPage" />
        </div>

        <!-- Footer -->
        <footer>
            <footer-view />
        </footer>
        <!-- End Footer -->

        </div>
    </div>
    <ps-notification-box></ps-notification-box>
</template>

<script lang="ts">

// libs
import { defineComponent, onMounted , onUnmounted, ref, getCurrentInstance, watch} from 'vue';
import { useRoute } from 'vue-router';
import { i18n } from '@/assets/locales/index';
import  firebase  from 'firebase/app';
import 'firebase/messaging'

// Providers
import { PsValueProvider } from './store/modules/core/PsValueProvider';
import { usePsAppInfoProviderState } from './store/modules/appinfo/AppInfoProvider';

// Holders
import { usePsValueHolderState } from '@/object/core/PsValueHolder';
import AppInfoParameterHolder from './object/holder/AppInfoParameterHolder';

// Components
import FooterView from '@/views/general/FooterView.vue';
import PsNavTabBar from '@/components/layouts/navbar/PsNavTabBar.vue';
import PsNavBar from '@/components/layouts/navbar/PsNavBar.vue';
import PsIcon from './components/core/icons/PsIcon.vue';
import PsNotificationBox from './components/core/notificationbox/PsNotificationBox.vue';
import PsConfig from './config/PsConfig';
// import { useHead } from '@vueuse/head'

export default defineComponent({
    name : "AppView",
    components: {
        PsNavBar,
        FooterView,
        PsIcon,
        PsNavTabBar,
        PsNotificationBox,
    },
  
    setup() {
        const internalInstance = getCurrentInstance();
        //  [App.vue specific] When App.vue is first loaded start the progress bar
        internalInstance?.appContext.config.globalProperties.$Progress.start();
        setTimeout(() => {
        internalInstance?.appContext.config.globalProperties.$Progress.finish();
        }, 3500);
        PsValueProvider.psValueHolder = usePsValueHolderState();
        const appInfoProvider = usePsAppInfoProviderState();
        const atTopOfPage = ref(true);
        const route = useRoute();
        const showEntryMessage = ref(true);
        const dataReady = ref(false);
        const psValueHolder = PsValueProvider.psValueHolder;
        // useHead({
        //     meta: [
        //         {
        //         property: 'og:locale:alternate',
        //         content: 'zh',
        //         key: 'zh',
        //         },
        //         {
        //         property: 'og:locale:alternate',
        //         content: 'en',
        //         key: 'en',
        //         },
        //          // Google+ / Schema.org
        //         { itemprop: 'name', content: 'Content Title' },
        //         { itemprop: 'description', content: 'Content Desc' },
        //         // ...
        //         // Facebook / Open Graph
        //         { property: 'og:url', content: 'https://www.panacea-soft.com/flutter-buysell-fe-demo' },
        //         { property: 'og:type', content: 'website' },
        //         { property: 'og:title', content: 'Content Title' },
        //         { property: 'og:description', content: 'Content Description' },
        //         { property: 'og:image', content: 'https://www.panacea-soft.com/flutter-buysell-fe/img/chart.413aeac6.jpeg' },
                
        //         //Twitter Meta Tags
        //         { property: 'twitter:card', content: 'summary' },
        //         { property: 'twitter:title', content: 'Content Title' },
        //         { property: 'twitter:description', content: 'Content Description' },
        //         { property: 'twitter:image', content: "https://www.panacea-soft.com/flutter-buysell-fe/img/chart.413aeac6.jpeg" },
        //     ],
        // })
        const loginUserId = psValueHolder.getLoginUserId();
        const renderComponent = ref(true);
        watch(() => psValueHolder.isUserLoggedIn(), (currentValue, oldValue) => {
            if (currentValue) {                
                   renderComponent.value=false;
                   setTimeout(() => {
                    renderComponent.value= true; 
                    }, 500);
                     
            }else{
                console.log(oldValue);
            }
        })
        ///start firebase noti
        if (firebase.apps.length < 1) {
          firebase.initializeApp(PsConfig.firebaseConfig);
        }
        const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null;
        if(messaging) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                } else {
                    console.log('Unable to get permission to notify.');
                }
            });
        }
        
    
        function subscribeTokenToTopic(token, topic) {
            if(messaging) {
                fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
                    method: 'POST',
                    headers: new Headers({
                        'Authorization': 'key=' + appInfoProvider.appInfo.data.frontendConfigSetting.fcmServerKey
                    })
                }).then(response => {
                    if (response.status < 200 || response.status >= 400) {
                        throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
                    }
                    console.log('Subscribed to "' + topic + '"');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
        
        ///end firebase noti
        function handleScroll(){
            // when the user scrolls, check the pageYOffset
            if(window.pageYOffset>30){
                // user is scrolled
                if(atTopOfPage.value) atTopOfPage.value = false;
            }else{
                // user is at top of page
                if(!atTopOfPage.value) atTopOfPage.value = true;
            }
        }

        function getDir() {
            if(psValueHolder.languageCode == undefined) {
                if(appInfoProvider.appInfo.data.frontendConfigSetting.defaultLanguage.languageCode == 'ar') {
                    return "rtl";
                }else {
                    return 'ltr';
                }
            }else {
                if(psValueHolder.languageCode == 'ar') {
                    return "rtl";
                }else {
                    return 'ltr';
                }
            }
        }

        onMounted( async () =>{
          
            window.addEventListener('scroll', handleScroll);
            document.title = i18n.global.t('ps_nav_bar__ps_buy_sell');

            const appInfoParameterHolder = new AppInfoParameterHolder();
            appInfoParameterHolder.userId = loginUserId;
            await appInfoProvider.loadDeleteHistory(appInfoParameterHolder);

            if(localStorage.getItem("languageCode") == null ||  psValueHolder.languageCode == undefined) {
                i18n.global.locale = appInfoProvider.appInfo.data.frontendConfigSetting.defaultLanguage.languageCode;
                i18n.global.fallbackLocale = appInfoProvider.appInfo.data.frontendConfigSetting.defaultLanguage.languageCode;
            }else{
                let excludeLanguage = appInfoProvider.appInfo.data.frontendConfigSetting.excludeLanguage;
                let hasData = false;
                for(let j = 0 ; j < excludeLanguage.length ; j ++ ){
                    if(excludeLanguage[j].languageCode == psValueHolder.languageCode){
                        hasData = true;
                    }

                }
                if(hasData){
                    psValueHolder.replacelanguageCode(appInfoProvider.appInfo.data.frontendConfigSetting.defaultLanguage.languageCode);
                    i18n.global.locale = appInfoProvider.appInfo.data.frontendConfigSetting.defaultLanguage.languageCode;
                    i18n.global.fallbackLocale = appInfoProvider.appInfo.data.frontendConfigSetting.defaultLanguage.languageCode;
                }
            }

            if(localStorage.getItem("showProfile") == null || localStorage.showProfile == ''){
                if(appInfoProvider.appInfo.data.frontendConfigSetting.showUserProfile == '1'){
                    localStorage.showProfile = 'show';
                    
                }else{
                    localStorage.showProfile = 'hide';
                }

            }
            if(localStorage.getItem("notiSetting") == null || localStorage.notiSetting == ''){
                if(appInfoProvider.appInfo.data.frontendConfigSetting.enableNotification == '1'){
                    localStorage.notiSetting = 'true';
                }else{
                    localStorage.notiSetting = 'hide';
                }
            }
            psValueHolder.replaceshowProfile(localStorage.showProfile);
            psValueHolder.replaceNotiSetting(localStorage.notiSetting);
            console.log(appInfoProvider?.appInfo?.data);
            dataReady.value = true;
            if ("serviceWorker" in navigator) { 
            if(messaging) {
                navigator.serviceWorker .register("./firebase-messaging-sw.js") 
                .then(function(registration) {
                    console.log("Registration successful, scope is:", registration.scope);
                    messaging.getToken({vapidKey: appInfoProvider.appInfo.data.frontendConfigSetting.firebaseWebPushKeyPair, serviceWorkerRegistration : registration }) 
                    .then((currentToken) => 
                    { 
                        if (currentToken) { 
                            console.log('current token for client: ', currentToken); 
                            localStorage.deviceToken = currentToken;
                            psValueHolder.replacedeviceToken(localStorage.deviceToken);
                            subscribeTokenToTopic(currentToken,'fe_broadcast');
                            
                        } 
                    }).catch((err) => {
                        console.log('An error occurred while retrieving token. ', err); 
                        // catch error while creating client token 
                    }); 
                }) .catch(function(err) {
                    console.log("Service worker registration failed, error:" , err ); 
                }); 
            }
        }
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        })

        

        return {
            atTopOfPage,
            route,
            showEntryMessage,
            psValueHolder,
            getDir,
            renderComponent,
            dataReady
        }
    }

})

</script>

