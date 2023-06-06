<template>
    <div>
        <div class=" sm:mt-32 lg:mt-36 mt-28  flex flex-col">
            
            <div class=" content-center mx-auto w-96"  >
                <ps-label class="content-center  text-general-200 dark:text-secondaryDark-white  px-4 py-4 rounded-md" v-if="userProvider.userResource.message != ''"> {{ userProvider.userResource.message }} </ps-label>
            </div>
    
            <div class="w-55 lg:w-80 flex flex-col mx-auto rounded-lg">

                <!-- Login Title -->        
                <ps-label class="font-medium text-2xl mt-8 mx-auto lg:text-3xl mb-4" > {{ $t("login__login_title") }} </ps-label>
                <!-- <form class="flex flex-col"> -->
                <!-- Login Entry -->
                <ps-label class="mt-4 lg:mt-5 font-medium text-base lg:text-xl"> {{ $t("login__email") }} </ps-label>
                <ps-input class="lg:mt-2 mt-1" type="email" v-bind:placeholder="$t('login__email_placeholder')" v-on:keyup.enter="normalLoginClicked" v-model:value="email" @keypress="validateEmail"></ps-input>
                <ps-label class="lg:mt-2 mt-1  w-full" textColor="text-primary-500" v-if="validationEmail"> {{ $t("login__email_required_error") }} </ps-label>
                <ps-label class="mt-4 lg:mt-5 font-medium text-base lg:text-xl"> {{ $t("login__password") }} </ps-label>
                <ps-input class="lg:mt-2 mt-1" type="password" v-bind:placeholder="$t('login__password_placeholder')" v-on:keyup.enter="normalLoginClicked" v-model:value="password" autocomplete='on'></ps-input>
                    
                <!-- Loading Button -->
                <ps-button textSize="text-xs lg:text-base" class="mt-4 lg:mt-5 w-full py-3" v-if="userProvider.loading.value" :disabled="true">                     
                    {{ $t("login__loading") }} </ps-button>

                <!-- Login Button --> 
                <ps-button textSize="text-xs lg:text-base" class="mt-4 lg:mt-5 py-3" @click="normalLoginClicked" :disabled="false" v-else>{{ $t("login__login") }} </ps-button>
                <!-- </form> -->
                <!-- Forget password & Sign Up -->
                <div class="mt-4 lg:mt-5 flex flex-col items-center">
                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey" class='cursor-pointer font-light text-xs lg:text-sm' @click='openForgotPassword' > {{ $t("login__forgot_password") }} </ps-label>
                    <ps-label textColor="text-secondary-400 dark:text-secondaryDark-grey" class='cursor-pointer mt-3 font-light text-xs lg:text-sm' @click='openRegister' > {{ $t("login__new_here") }} <span class="font-medium"> {{ $t("login__sign_up") }}</span> </ps-label>
                </div>

                <div class="flex flex-row justify-center mt-4 ">
                    <ps-line class="w-full lg:h-3 h-2 border border-l-0 border-r-0 border-secondary-400 dark:border-secondaryDark-grey" />
                    <ps-label class="px-1 font-medium text-sm lg:text-base"> {{ $t("login__or") }} </ps-label>
                    <ps-line class="w-full lg:h-3 h-2 border border-l-0 border-r-0 border-secondary-400 dark:border-secondaryDark-grey" />
                </div>

                <!-- Login with other Methods -->
                <div class='flex flex-row items-start mt-3 lg:mt-4'>
                    <ps-checkbox-value title="" 
                        class="lg:mt-1 mt-0.5" v-model:value="agreePrivacyPolicy" 
                        @click="agreePrivacyPolicyClicked" />
                    <ps-label class='me-2 font-medium text-sm lg:text-base'>{{ $t("login__check_privacy_policy") }}</ps-label>
                    <ps-route-link :to="{name: 'privacy' }" class="underline cursor-pointer text-sm">  
                            <ps-label class='font-medium text-sm lg:text-base'> {{ $t("login__privacy_policy") }}</ps-label>
                    </ps-route-link> 
                </div>
                
                <ps-button textSize="text-xs lg:text-base" class="mt-3 lg:mt-4 py-3 flex justify-center" @click="phoneloginclicked">  
                    <font-awesome-icon :icon="['fas', 'phone']" class="text-textLight dark:text-textDark text-xl me-2" />           
                    {{ $t("login__login_with_phone") }} 
                </ps-button>

                <ps-button textSize="text-xs lg:text-base" class="mt-3 lg:mt-4 py-3 flex justify-center" theme="bg-blue-600 hover:bg-blue-700 text-textLight px-4 py-2" @click="facebookloginclicked">  
                    <font-awesome-icon :icon="['fab', 'facebook-f']" class="text-textLight text-xl me-2"  />                 
                    {{ $t("login__login_with_facebook") }}
                </ps-button>
                <ps-button textSize="text-xs lg:text-base" class="mt-3 lg:mt-4 py-3 flex justify-center" theme="bg-yellow-600 hover:bg-yellow-700 text-textLight px-4 py-2"  id="signinBtn" @click="googleloginclicked">  
                    <font-awesome-icon :icon="['fab', 'google']" class="text-textLight text-xl me-2"  />            
                    {{ $t("login__login_with_google") }}
                </ps-button>
                <ps-button textSize="text-xs lg:text-base" class="mt-3 lg:mt-4 py-3 flex justify-center mb-5" theme="bg-gray-900 hover:bg-gray-700 text-textLight px-4 py-2"  @click="appleloginclicked">  
                    <font-awesome-icon :icon="['fab', 'apple']" class="text-textLight text-xl me-2"  />            
                    {{ $t("login__login_with_apple") }}
                </ps-button>
                <div class="mt-4" />
            </div>
        </div>
        <ps-loading-dialog ref="ps_loading_dialog" class='z-40' />
        <ps-error-dialog ref="ps_error_dialog" />
        <ps-success-dialog-2 ref="ps_success_dialog" /> 
        <privacy-modal ref="privacy_modal" />
    </div>

</template>

<script lang="ts">
// Libs
import { useRoute } from 'vue-router';
import router from '@/router';
import { ref } from 'vue';

// Providers
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsStatus from '@/api/common/PsStatus';

// Components
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';
import PsLine from '@/components/core/line/PsLine.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PrivacyModal from '@/components/modules/privacy/PrivacyModal.vue';
import PsSuccessDialog2 from '@/components/core/dialog/PsSuccessDialog2.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF,faGoogle,faApple } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
library.add(faFacebookF,faPhone,faGoogle, faApple )

//language
import { i18n } from '@/assets/locales/index';
//import PsUtils from '@/utils/PsUtils';

export default {
    name : "LoginView",
    components : {
        PsLabel,
        PsButton,
        PsInput,
        PsCheckboxValue,
        PsLine,
        PsErrorDialog,
        PsRouteLink,
        PrivacyModal,
        PsSuccessDialog2,
        PsLoadingDialog
    },
    setup() {
       
        // Check user is already loggedIn
        if(PsValueProvider.psValueHolder.isUserLoggedIn()) {
            router.push({name: "dashboard"});
        }

        // Init Variables
        const route = useRoute();
        const email = ref('');
        const password = ref('');
        const agreePrivacyPolicy = ref(false);
        const validationEmail = ref(false);
        const ps_loading_dialog = ref();

        const ps_error_dialog = ref();
        const ps_success_dialog = ref();
        const privacy_modal = ref();

        // Inject Provider
        const userProvider = useUserProviderState();
        userProvider.userResource.message = '';
        function validateEmail(e) {
            const pattern = /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validationEmail.value = true;
            } else {
                validationEmail.value = false;
            }
        }

        // Functions
        function phoneloginclicked() {
            if(agreePrivacyPolicy.value) {
                userProvider.navigateUserLoginTo("phone-login", router, route.query.redirect, route.query, route.params);        
            }else {
                ps_error_dialog.value.openModal(
                    i18n.global.t('login__privacy_policy'),
                    i18n.global.t('login__need_to_agree_privacy'));
            }
        }

        async function facebookloginclicked() {
            if(agreePrivacyPolicy.value) {
                await userProvider.loginWithFacebookId();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {

                    redirect()
                    
                }   
            }else {
                ps_error_dialog.value.openModal(
                    i18n.global.t('login__privacy_policy'),
                    i18n.global.t('login__need_to_agree_privacy'));
            }
        }

        async function googleloginclicked() {
            if(agreePrivacyPolicy.value) {
                await userProvider.loginWithGoogleId();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    redirect();
                }     
            }else {
                ps_error_dialog.value.openModal(
                    i18n.global.t('login__privacy_policy'),
                    i18n.global.t('login__need_to_agree_privacy'));
            }
        }

        async function appleloginclicked() {
            if(agreePrivacyPolicy.value) {
                await userProvider.loginWithAppleSignIn();
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    redirect();
                }  
            }else {
                ps_error_dialog.value.openModal(
                i18n.global.t('login__privacy_policy'),
                i18n.global.t('login__need_to_agree_privacy'));
            }
        }
        
        async function normalLoginClicked() {
            ps_loading_dialog.value.openModal();
          
                await userProvider.loginWithEmailId(email.value, password.value);             
                if(userProvider.userResource.status == PsStatus.SUCCESS) {
                    redirect();           
                } 
            ps_loading_dialog.value.closeModal();
          
        }

        function openRegister()  {
            userProvider.navigateUserLoginTo("register", router, route.query.redirect, route.query, route.params);        
        }

        function openForgotPassword() {
            userProvider.navigateUserLoginTo("forgotpassword", router, route.query.redirect, route.query, route.params);
        }
        
        function isAcceptPrivacy(isAccept){
            agreePrivacyPolicy.value = isAccept;
        }

        function agreePrivacyPolicyClicked() {
            privacy_modal.value.openModal(isAcceptPrivacy);            
        }
        function redirect(){
            userProvider.navigateUserLoginRedirect(route.query.redirect, 'dashboard', router, route.query.redirect, route.query, route.params); 
        }

        return { 
            normalLoginClicked, 
            email, 
            password, 
            userProvider, 
            phoneloginclicked, 
            facebookloginclicked, 
            googleloginclicked, 
            appleloginclicked,
            openRegister,
            openForgotPassword,
            agreePrivacyPolicy,
            ps_error_dialog,
            agreePrivacyPolicyClicked,
            privacy_modal,
            ps_success_dialog,
            validateEmail,
            validationEmail,
            ps_loading_dialog
        };
    }


}
</script>
