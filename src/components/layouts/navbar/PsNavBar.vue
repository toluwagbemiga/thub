<template>

    <nav class="flex flex-col fixed w-full h-16 z-40 bg-background dark:bg-backgroundDark border-b border-secondary-500 dark:border-backgrounDark" 
        :class="topOfPage ? 'mt-8 lg:mt-12' : 'mt-0'" >
        <div class="flex justify-between items-center content-center my-auto w-mobile sm:w-median lg:w-large mx-auto">
            
            <div class=' flex flex-row w-full rounded-xl'>
                <div class="me-2 w-8 sm:w-10 my-auto">
                    <img src="@/assets/images/fbs_icon.png" @click="gotToHome" alt="Navbar logo" width="50px" height="50px" class=" rounded:xl w-auto sm:h-10 h-8 cursor-pointer object-cover "/>                      
                </div>
          
                <div class="my-auto font-medium w-44"> 
                    <ps-route-link :to="{ name: 'dashboard'}">
                        <ps-label class='cursor-pointer lg:text-xl font-medium sm:text-lg text-md ' textColor="text-primary-500 dark:text-secondaryDark-white" > {{ $t("ps_nav_bar__ps_buy_sell") }} </ps-label>                    
                    </ps-route-link>
                    
                </div>
                
            </div>
            <div> 
                
            </div>
            
            
            <div class="flex items-center content-center me-2">
                <ps-route-link :to="{name: 'item-entry' }">
                <ps-label class=' bg-primary-500 dark:bg-primaryDark-accent lg:rounded-2xl rounded-xl ps-4 pb-1.5 pt-0.5 font-medium cursor-pointer sm:text-xs sm:w-28 w-10 pe-7 sm:pe-0' textColor="text-textLight dark:text-textDark" > 
                    <div class='flex flex-row items-center pt-1'> 
                        <span class="hidden sm:inline-block sm:me-2 "> {{ $t("ps_nav_bar__new_post") }} </span>
                        <span class="text-xl "> + </span> </div>
                </ps-label>
                
                </ps-route-link>
            </div>
            <div class="items-center content-center hidden sm:flex ">

                <div v-if="psValueHolder.isUserLoggedIn()" class="flex items-center content-center">

                    <div class=" h-12 flex items-center justify-center me-2 ">
                        <ps-route-link
                            aria-label="Noti"     
                            :to="{name: 'notification-list' }"> 
                            <div   >                                
                                <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="bell" h="20" w="20"/>
                            </div>
                        </ps-route-link>
                            
                    </div>
                    <div class=" h-12 flex items-center justify-center me-4 ">
                        <ps-route-link
                           aria-label="Message"     
                            :to="{name: 'chat-list' }"> 
                            <div  class="relative" >
                                <div class="absolute ms-4 p-0.5 text-3xs sm:text-xxs rounded-full bg-primary-500 dark:bg-primaryDark-accent text-textLight" v-if=" messageCount"> {{ messageCount ? messageCount : '' }}</div>  
                                <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="chatalt2" h="20" w="20"/>  
                                
                            </div>
                        </ps-route-link>
                            
                    </div>
                    <ps-dropdown align="right" h="h-72" class=' z-50' >
                        <template #select >
                            <ps-label class=" h-full" @click='userNameClicked'>
                                
                                <button
                                    type="button"
                                    class="inline-flex items-center content-start justify-between w-full h-12 
                                             leading-5 font-medium text-base
                                             focus:outline-none transition 
                                             ease-in-out duration-150 btn-focus"
                                
                                    :id="userProvider.user?.data?.id"
                                    aria-haspopup="true"
                                    aria-expanded="true" >
                                    
                                    <img alt="Placeholder" class="rounded-full bg-transparent w-8 h-8 flex items-center justify-center object-cover" width='50px' height='50px' v-lazy="userProvider.imageUrl(userProfile, 1)" @error="userProvider.defaultProfileImage" >
                                    
                                    <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" name="downArrow"  w='52' h='52' class=""  />
                                    
                                </button>
                            </ps-label>
                        </template>
                        <template #list >
                            <div
                                class="rounded-md bg-white shadow-xs w-56 z-50" 
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu">
                                <div class="pt-2 z-30 absolute">
                                    
                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'profile' }"> 
                                        <div class="w-56 py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  >
                                            <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__profile") }} </ps-label>                                        
                                        </div>
                                    </ps-route-link>

                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'chat-list' }"> 
                                        <div class="w-56 flex flex-row justify-between py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  >
                                            <ps-label class="ms-2 text-secondary-500 font-medium w-full flex-grow"  > {{ $t("ps_nav_bar__message") }} </ps-label>    
                                            <div class=" me-6 p-0.5 text-xxs rounded-full bg-primary-500 dark:bg-primaryDark-accent text-textLight" v-if=" messageCount "> {{ messageCount ? messageCount : '' }}</div>                                    
                                        </div>
                                    </ps-route-link>

                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'favourite' }"> 
                                        <div class="w-56 py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  >
                                            <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__favourite") }} </ps-label>                                        
                                        </div>
                                    </ps-route-link>

                                    <ps-route-link
                                        textSize="text-sm"
                                        :to="{name: 'notification-list' }"> 
                                        <div class="w-56 py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  >
                                            <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__notification") }} </ps-label>                                        
                                        </div>
                                    </ps-route-link>

                                    <ps-line />

                                    <div class="w-56 py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center" @click="clickLogout"  >
                                        <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__logout") }} </ps-label>                                        
                                    </div>
                                </div>
                                <div class="border-t border-gray-100 "></div>
                            </div>
                        </template>
                    </ps-dropdown>

                   
                </div>

                <div v-else class="flex flex-row">
                    <div class="h-16 flex items-center content-center cursor-pointer ">
                        <ps-label @click="loginClicked" class='font-medium border text-xxs sm:text-xs border-primary-500 dark:border-primaryDark-accent lg:rounded-2xl rounded-xl px-4 py-2 cursor-pointer me-2 ' textColor="text-primary-500 dark:text-primaryDark-accent" >
                             {{ $t("ps_nav_bar__login") }} 
                        </ps-label>                       
                    </div>
                    <div class="h-16 flex items-center content-center cursor-pointer">
                        <ps-label @click="registerClicked" class='font-medium bg-primary-500 dark:bg-primaryDark-accent text-xxs sm:text-xs lg:rounded-2xl rounded-xl px-4 py-2 cursor-pointer '  textColor="text-textLight dark:text-textDark" > 
                            {{ $t("ps_nav_bar__register") }} 
                        </ps-label>                        
                    </div>
                </div>
            </div>

            <div class ="sm:hidden flex h-16 items-center">
                <ps-icon name="menu" class="cursor-pointer" @click="toggleMobileMenu" />            
            </div>
        </div>
        <div>
            <transition @enter="enter" @leave="leave" >
                <div v-if="activeMobileMenu" class="border border-b-2 text-primary-500 dark:text-textdark-500 h-auto mt-0 bg-background dark:bg-backgroundDark pb-1">
                <div  class="flex flex-col " >
                    <div v-if="psValueHolder.isUserLoggedIn()">             
                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'profile' }"> 
                            <div class="w-full py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center" @click="toggleMobileMenu" >
                                <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__profile") }} </ps-label>                                        
                            </div>
                        </ps-route-link>

                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'chat-list' }"> 
                            <div class="w-full flex flex-row justify-between py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center" @click="toggleMobileMenu" >
                                <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__message") }} </ps-label>                                        
                                <div class=" me-6 p-0.5 text-xxs rounded-full bg-primary-500 dark:bg-primaryDark-accent text-textLight" v-if=" messageCount != 0"> {{ messageCount }}</div>  
                            </div>
                        </ps-route-link>

                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'favourite' }"> 
                            <div class="w-full py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center"  @click="toggleMobileMenu">
                                <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__favourite") }} </ps-label>                                        
                            </div>
                        </ps-route-link>

                        <ps-route-link
                            textSize="text-md"
                            :to="{name: 'notification-list' }"> 
                            <div class="w-full py-4 px-2 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center" @click="toggleMobileMenu" >
                                <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__notification") }} </ps-label>                                        
                            </div>
                        </ps-route-link>

                        <ps-line class=" ms-4 me-12"/>

                        <div class="w-full px-2 py-4 hover:bg-primary-000 dark:hover:bg-primaryDark-black cursor-pointer items-center" @click="clickLogout"  >
                            <ps-label class="ms-2 text-secondary-500 font-medium"  > {{ $t("ps_nav_bar__logout") }} </ps-label>                                        
                        </div>
                        

                    </div>

                    <div v-else >
                        <ps-line />
                        <ps-label  class=' w-full hover:bg-primary-000 dark:hover:bg-primaryDark-black py-4 px-4 cursor-pointer'  @click="loginClicked"> Login </ps-label>
                        <ps-label  class=' w-full hover:bg-primary-000 dark:hover:bg-primaryDark-black py-4 px-4 cursor-pointer'  @click="registerClicked"> Register </ps-label>
                    </div>
                    
                </div>
                </div>
                </transition>
        </div>
        
    </nav>
</template>

<script>
// import PsUtils from '@/utils/PsUtils';

import { defineComponent, ref, onMounted } from "vue";
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';

import router from '@/router';
import Velocity from "velocity-animate";
//import $ from "cash-dom";
import { createUserUnReadMessageProviderState } from "@/store/modules/chat/UserUnReadMessageProvider";
import UserUnReadMessageParameterHolder from '@/object/holder/UserUnReadMessageParameterHolder';

import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsDropdown from '@/components/core/dropdown/PsDropdown.vue';
import PsLine from "@/components/core/line/PsLine.vue";
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import { useRoute } from "vue-router";
import PsLabel from "@/components/core/label/PsLabel.vue";

export default defineComponent ({
    components : {
        PsIcon,
        PsDropdown,
        PsLine,
        PsRouteLink,
        PsLabel
    },
    props : {
        topOfPage : {
            type: Boolean,
            default : false
        }
    },
    setup() {

        const activeMobileMenu = ref(false);
        const userProvider = useUserProviderState();   
        const userProfile = ref();
        const messageCount = ref(0);
        const userunreadmsgProvider = createUserUnReadMessageProviderState();
         const userUnreadHolder = new UserUnReadMessageParameterHolder();

        let psValueHolder = PsValueProvider.psValueHolder;

        userUnreadHolder.userId = psValueHolder.loginUserId;
        

        if (psValueHolder.isUserLoggedIn()) {               
            loadUser()
            
        }
        async function loadUser(){
            await userProvider.getUser(psValueHolder.loginUserId);
            userProfile.value = userProvider.user.data.userProfilePhoto;
            // console.log(userProfile.value);
            // console.log(userProvider.user.data);
        }
        async function loadMessage(){
            await userunreadmsgProvider.postUserUnreadMessageCount(userUnreadHolder);
            messageCount.value = parseInt(userunreadmsgProvider.buyingitemList.data?.buyerUnreadCount) + parseInt(userunreadmsgProvider.buyingitemList.data?.sellerUnreadCount);
        }
        loadMessage();
        onMounted( async () =>{
          
            await loadUser;
            await loadMessage;
        })
        
        function userNameClicked() {
            PsValueProvider.psValueHolder.loadData();
            psValueHolder= PsValueProvider.psValueHolder;
        }
        
        function gotToHome() {
            router.push({name : "dashboard"});
        }

        function toggleMobileMenu( bol = true) {
            if(bol){
                activeMobileMenu.value = !activeMobileMenu.value;
            }			
		}

        function enter(el, done) {
			Velocity(
				el,
				"slideDown",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }
        
		function leave(el, done) {
			Velocity(
				el,
				"slideUp",
				{
				duration: 300
				},
				{
				complete: done
				}
			);
        }

        function clickLogout() {
            psValueHolder.logout();
            router.push({name : "dashboard"});
        }
        const route = useRoute();
        function registerClicked() {
       
            if(activeMobileMenu.value) {
                activeMobileMenu.value = false;
            }

            let tempParams = {};
            tempParams = route.query;
            tempParams['redirect'] = route.name;
            router.push({name : 'register', query : tempParams, params : route.params });
        } 
        function loginClicked() {
       
            if(activeMobileMenu.value) {
                activeMobileMenu.value = false;
            }

            let tempParams = {};
            tempParams = route.query;
            tempParams['redirect'] = route.name;
            router.push({name : 'login', query : tempParams, params : route.params });
        }

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

            if (localStorage.isDarkMode != null && localStorage.isDarkMode == 'true') {
                document.documentElement.classList.add('dark')
                isDarkMode.value = true;
            } else {
                document.documentElement.classList.remove('dark')
                isDarkMode.value = false;
            }

        }
        
        return {
            toggleDarkMode,
            userunreadmsgProvider,
            messageCount,
            userProfile,
            isDarkMode,
            activeMobileMenu,
            psValueHolder,
            userProvider,
            gotToHome,
            enter,
            leave,
            toggleMobileMenu,
            clickLogout,
            loginClicked,
            userNameClicked,
            registerClicked,
        }

    }
});
</script>
