<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16">
                <div class="flex flex-col items-center">
                    <ps-label-header-4 class="font-medium"> {{ $t("edit_profile__edit_profile") }} </ps-label-header-4>
                </div>

                <div class=" ms-4 mb-4 flex items-center mt-8" v-if="userProvider.user?.data != null"> 
                    <ps-route-link :to="{ name: 'profile'}">                          
                        <ps-label
                            class="hover:underline cursor-pointer font-medium"> 
                                {{ userProvider.user.data ? userProvider.user.data.userName:'' }}
                        </ps-label>
                    </ps-route-link> 

                    <ps-icon name="rightArrow" class='mx-2'/>

                    <ps-label class="font-light" > {{ $t("edit_profile__edit_profile") }} </ps-label>
                </div>

                <div class="flex justify-between container mt-2 mx-auto p-4">
                    <div class="w-full flex flex-col bg-background dark:bg-backgroundDark border rounded-md border-secondary-400 dark:border-secondaryDark-grey pt-4 py-4 px-8">
                        
                        <div class="p-4 mx-2 w-32 relative" @click="onImageClick" for="upload-image1">
                            <ps-label-title-3 class="mt-1 "> {{ $t("edit_profile__profile_photo") }} </ps-label-title-3> 
                            <input type="file" size=1 max=1 accept=".jpg,.jpeg,.png"  @change="onImageSelected($event)" ref="image" id="upload-image1" style="display: none;" :ordering="1" />
                            <div class="bg-primary-000 w-32 h-32 flex items-center justify-center mt-2">
                                <img v-if="previewImage.data == ''" alt="Placeholder"  width="300px" height="300px"  class="w-24 h-24 object-cover" :src="userProvider.imageUrl(profilePhoto,2)" @error="userProvider.defaultProfileImage" />
                                <img v-else v-for='image in previewImage.data' :key="image" alt="Placeholder"  width="300px" height="300px"  class="w-24 h-24 object-cover" :src="image" @click="onImageClick" />
                            </div>
                            
                        </div>

                        <div class="flex justify-between container w-full p-4 flex-wrap">
                            <div class="flex flex-col w-full md:flex flex-auto md:w-6/12 md:pe-4">
                            
                                <!-- for User Name -->
                                <ps-label class="mt-1 mx-2 "> {{ $t("edit_profile__user_name") }} <span class="text-primary-500 text-base">*</span> </ps-label>
                                <ps-input class="mt-2 mx-2" type="text" v-bind:placeholder="$t('edit_profile__user_name')" v-model:value="holder.userName"></ps-input>
                                <ps-label class="content-center  px-4 py-4 rounded-md" textColor="text-primary-500 dark:text-primaryDark-accent" v-if="userProvider.userResource.message != ''"> {{ userProvider.userResource.message }} </ps-label>
                                <!-- end user name -->
                                 <!-- for email -->
                                <ps-label class="mt-4 mx-2 "> {{ $t("edit_profile__email") }}<span class="text-primary-500 text-base">*</span> </ps-label>
                                <ps-input class="mt-2 mx-2" type="text" v-bind:placeholder="$t('edit_profile__email')" v-model:value="holder.userEmail"></ps-input>
                                <!-- end email -->
                                <!-- for phone -->
                                <ps-label class="mt-4 mx-2 "> {{ $t("edit_profile__phone") }} <span class="text-primary-500 text-base">*</span> </ps-label>
                                <ps-input class="mt-2 mx-2" type="text" v-bind:placeholder="$t('edit_profile__phone_placeholder')" v-model:value="holder.userPhone" @keypress="phoneNumber($event)"></ps-input>
                                <div id="recaptcha-container"></div> <br>
                                <!-- end phone -->
                                 <ps-checkbox-value  v-bind:title="$t('edit_profile__show_emil_to_other_users')" class="mt-4 mx-2" v-model:value="holder.isShowEmailBool" />
                                <ps-checkbox-value  v-bind:title="$t('edit_profile__show_phone_to_other_users')" class="mt-4 mx-2 mb-4" v-model:value="holder.isShowPhoneBool" />
                                
                               
                            </div>
                            <div class="flex flex-col w-full md:flex flex-auto md:w-6/12 md:ps-4">
                            
                                 <!-- for address no -->
                                <ps-label class="mt1 mx-2 "> {{ $t("edit_profile__address") }} </ps-label>
                                <ps-input class="mt-2 mx-2" type="text" v-bind:placeholder="$t('edit_profile__address')" v-model:value="holder.userAddress"></ps-input>
                                <!-- end address no -->
                                <!-- for city -->
                                <ps-label class="mt-4 mx-2 "> {{ $t("edit_profile__city") }} </ps-label>
                                <ps-input class="mt-2 mx-2" type="text" v-bind:placeholder="$t('edit_profile__city')" v-model:value="holder.city"></ps-input>
                                <!-- end city -->
                                <!-- for about me -->
                                <ps-label class="mt-4 mx-2 "> {{ $t("edit_profile__about_me") }} <span class="text-primary-500 text-base">*</span> </ps-label>
                                <ps-textarea class="mt-2 mx-2" type="text" v-bind:placeholder="$t('edit_profile__about_me')" v-model:value="holder.userAboutMe"></ps-textarea>
                                <!-- end about me -->   
                            </div>
                            
                        </div>
                    </div>

                </div>
                <div class="flex items-center justify-center">
                    <ps-button class="text-center w-60 mx-auto mt-8 py-4" @click="isPhoneVerified"> {{ $t("edit_profile__submit") }} </ps-button>
                </div>

            </div>
        </template>


    </ps-content-container>

    <ps-loading-dialog ref="ps_loading_dialog" />

    <user-phone-login-verification-modal ref="user_phone_login_verification_modal" />


    <ps-error-dialog ref="ps_error_dialog" />

</template>

<script lang='ts'>

// Libs
import {onMounted, reactive, ref} from 'vue';
import router from '@/router';

// Providers
import { createUserProviderState } from '@/store/modules/user/UserProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import { createUserStateListProviderState } from '@/store/modules/user/UserStateProvider';

// Components
import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsTextarea from '@/components/core/textarea/PsTextarea.vue';
import PsCheckboxValue from '@/components/core/checkbox/PsCheckboxValue.vue';
import ProfileUpdateViewHolder from '@/object/holder/ProfileUpdateViewHolder';
import PsStatus from '@/api/common/PsStatus';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import UserPhoneLoginVerificationModal from '@/components/modules/user/UserPhoneLoginVerificationModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle3 from '@/components/core/label/PsLabelTitle3.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import firebaseApp from 'firebase/app';
import "firebase/auth";

// language
import { i18n } from '@/assets/locales/index';
import PsUtils from '@/utils/PsUtils';
import PsConst from '@/object/constant/ps_constants';

export default {
    name : "EditProfileView",
    components : {
        PsContentContainer,
        PsButton,
        PsLabelHeader4,
        PsIcon,
        PsInput,
        PsTextarea,
        PsCheckboxValue,
        PsLabelTitle3,
        PsLoadingDialog,
        PsErrorDialog,
        UserPhoneLoginVerificationModal,
        PsLabel,
        PsRouteLink
    },
    setup() {
  
        // Providers
        const userProvider = createUserProviderState();
        const userStateListProvider = createUserStateListProviderState();

        // Init Variables
        const valueHolder = PsValueProvider.psValueHolder;
        const loginUserId = valueHolder.getLoginUserId();
       
        if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
            router.push({ name : "login"});
        }

        const previewImage = reactive({
            data : [] as any
        });
        let selectedFile;
        const holder = reactive(new ProfileUpdateViewHolder());
        const date_picker = ref();
        
        
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        const pickedDate = ref();
        const upperDate = ref(date);
        const image = ref();
        const profilePhoto = ref('');
        const ps_loading_dialog = ref();
        const ps_error_dialog = ref();
        const user_phone_login_verification_modal = ref();
        let oldUser;
        
        // Functions
        onMounted(() => {
            loadUserData();
            loadAppVerifier();
        });

        async function loadUserData() {
            ps_loading_dialog.value.openModal();
            const returnData = await userProvider.getUser(loginUserId);
           
            oldUser = returnData.data[0];
            ps_loading_dialog.value.closeModal();
            if(returnData.status == PsStatus.SUCCESS) {
                const userInfo = returnData.data[0];
                holder.userId = userInfo.userId;
                holder.userName = userInfo.userName;
                holder.userEmail = userInfo.userEmail;
                holder.userPhone = userInfo.userPhone;
                holder.city = userInfo.city;
                holder.userAboutMe = userInfo.userAboutMe;
                holder.userAddress = userInfo.userAddress;

                holder.isShowEmail = userInfo.isShowEmail;
                holder.isShowEmailBool = holder.isShowEmail == '1';
                holder.isShowPhone = userInfo.isShowPhone;
                holder.isShowPhoneBool = holder.isShowPhone == '1';
     
                profilePhoto.value = userInfo.userProfilePhoto.toString();
                
            } else {
                ps_error_dialog.value.openModal('', returnData.message);
                router.push({ name : "dashboard"});
            }
        }

        function phoneNumber(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
           
            if ( charCode < 42 || charCode > 57 ) {
                evt.preventDefault();
            } else {
                return true;
            }
        }

        function isNumber(evt) {
            evt = (evt) ? evt : window.event;
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46 ) {
                evt.preventDefault();
            } else {
                return true;
            }
        }

        function onImageSelected(event) {
            const selectedFiles = event.target.files;

            if(selectedFiles && selectedFiles.length > 1) {
                window.alert("Over 5");
            }else {
                previewImage.data = [];
                for(let i=0; i<selectedFiles.length; i++) {
                    const reader = new FileReader
                    reader.onload = e => {
                        (previewImage.data as string[]).push(e.target ? e.target.result ? e.target.result.toString() : '' : '')
                    }
                    reader.readAsDataURL(selectedFiles[i]) 
                    selectedFile = selectedFiles[i];                       
                }                
            }
        }

        function onImageClick() {
            image.value.click();

        }

        function uploadImage() {
            userProvider.postImageUpload(valueHolder.getLoginUserId(), "web", selectedFile, '');
        }

        async function submit() {
            
            holder.isShowEmail = holder.isShowEmailBool ? '1' : '0';
            holder.isShowPhone = holder.isShowPhoneBool ? '1' : '0';
 
            ps_loading_dialog.value.openModal();
            ps_loading_dialog.value.setMessage(i18n.global.t('edit_profile__updating_profile'));
            const returnData = await userProvider.postProfileUpdate(holder);
               
            if(selectedFile != undefined){
              
                ps_loading_dialog.value.setMessage(i18n.global.t('edit_profile__uploading_profile_image'));
                await userProvider.postImageUpload(valueHolder.getLoginUserId(), "web", selectedFile, '');
            } 
            ps_loading_dialog.value.closeModal();
          
            if(returnData.status == PsStatus.SUCCESS) {
                ps_error_dialog.value.openModal(
                    i18n.global.t('edit_profile__success'),
                    i18n.global.t('edit_profile__profile_updated'));
            }else if(returnData.status == PsStatus.ERROR ){
                    ps_error_dialog.value.openModal('', returnData.message);
            }
            

        }

        async function loadStateList() {
            await userStateListProvider.loadUserStateList();            
        }

    
        function isPhoneVerified(){
           
            if(holder.userPhone ==  oldUser.userPhone){
                submit();
            }else{
                phoneVerificatrion(holder.userPhone);
                
            }
        }
        let appVerifier;
        function loadAppVerifier()  {
            // Init recaptchaVerifier
            ps_loading_dialog.value.openModal();
            setTimeout(()=>{
                // window.recaptchaVerifier.clear();
                (window as any).recaptchaVerifier = new firebaseApp.auth.RecaptchaVerifier('recaptcha-container', {
                    'size': 'invisible',
                    'callback': (response) => {
                        PsUtils.log("Callback");
                        PsUtils.log(response);
                    },
                    'expired-callback': () => {
                        PsUtils.log("expiry callback")
                    }
                });
                
                appVerifier =  (window as any).recaptchaVerifier;
                ps_loading_dialog.value.closeModal();
            },1000);
        }

        async function phoneVerificatrion(phone) {
            
            ps_loading_dialog.value.openModal();
            const verifier = appVerifier;
            const confirmationResult = await firebaseApp.auth().signInWithPhoneNumber(phone, verifier).catch((error) => {
                ps_loading_dialog.value.closeModal();
               
                ps_error_dialog.value.openModal(
                    i18n.global.t('edit_profile__error_in_changing_phone_number'), error?.message);
                
            });
            ps_loading_dialog.value.closeModal();

            if(confirmationResult != undefined) {
                user_phone_login_verification_modal.value.openModal(
                    'Phone No Verification', 
                    '', 
                    'Submit', 
                    'Cancel', 
                    async (code) => {
                        
                        ps_loading_dialog.value.openModal();
                        confirmationResult.confirm(code).then(async (userCredential) => {
                            
                            if(userCredential != null
                                && userCredential.user != null
                                && userCredential.user.uid != null 
                                && userCredential.user.uid != '' ) {
                                    // call backend server
                                    ps_loading_dialog.value.closeModal();
                                    submit();
                                }else {
                                    PsUtils.log("ERROR");

                                }
                        }).catch((error) => {
                            // User couldn't sign in (bad verification code?)
                            ps_loading_dialog.value.closeModal();
                            ps_error_dialog.value.openModal(i18n.global.t('edit_profile__error_in_changing_phone_number'), error?.message);   
                        });   
                    },
                    () => {
                        PsUtils.log("Cancel");
                    }
                );
            }
           
        }
        
        return {
            userStateListProvider,
            previewImage,
            onImageSelected,
            uploadImage,
            userProvider,
            submit,
            holder,
            date_picker,
            pickedDate,
            loadStateList,
            image,
            onImageClick,
            profilePhoto,
            ps_loading_dialog,
            ps_error_dialog,
            upperDate,
            phoneNumber,
            isNumber,
            user_phone_login_verification_modal,
            isPhoneVerified,
        }
    }
}
</script>