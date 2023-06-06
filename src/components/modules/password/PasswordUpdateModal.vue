<template>
    <ps-modal ref="psmodal" maxWidth="350px" :isClickOut='true' class="z-50" >
        <template #title>
            <ps-label-title> {{ $t('password_update_modal__update_password') }}</ps-label-title>
        </template>
        <template #body>
           <div class="flex justify-between container w-full p-4">
                <!-- Start Left Screen -->
                <div class="flex flex-col w-full">
                    
                    <!-- for Password -->
                    <ps-label class="mt-4 mx-5 "> {{ $t('password_update_modal__password') }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-input class="mt-2 mx-5 mb-4"  id="password" type="password" :v-bindplaceholder="$t('password_update_modal__password')" v-model:value="paramHolder.userPassword" :maxlength='19' />
                    <!-- for Confirm Password -->
                    <ps-label class="mt-4 mx-5 "> {{ $t('password_update_modal__confirm_password') }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-input class="mt-2 mx-5 mb-8"  id="confpassword" type="password" :v-bindplaceholder="$t('password_update_modal__confirm_password')" v-model:value="paramHolder.confPassword" :maxlength='19' />

                    
                    
                </div>   
                <!-- End Left Screen -->

            </div>
        </template>
        <template #footer>
            <div class="flex justify-center">
                <ps-button class="text-center" @click="submitClicked" > {{ $t('password_update_modal__update') }} </ps-button>
            </div>
        </template>
    </ps-modal>

    <ps-loading-dialog ref="psloading"  :isClickOut='false'/> 

    <ps-error-dialog ref="ps_error_dialog" />

</template>

<script lang='ts'>

// Libs
import { defineComponent,ref,reactive } from 'vue';

// Compone
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import ChangePasswordParameterHolder from '@/object/holder/ChangePasswordParameterHolder';
import { useUserProviderState } from '@/store/modules/user/UserProvider';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
import PsStatus from '@/api/common/PsStatus';
import { i18n } from '@/assets/locales/index';

export default defineComponent({
    name: "PasswordUpdateModal",
    components: {
        PsModal,
        PsLabel,
        PsButton,
        PsErrorDialog,
        PsLoadingDialog,
        PsInput,
        PsLabelTitle
    },
    setup() {

        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();

        const psmodal = ref();
        const psloading = ref();
        const ps_error_dialog = ref();
        
        const paramHolder = reactive(new ChangePasswordParameterHolder());

        // Init Provider
        const userProvider = useUserProviderState();

        async function initData() {
            psloading.value.openModal();

            // Load User By ID List
            await userProvider.getUser(loginUserId);
           
            psloading.value.closeModal();
        }
     
        async function openModal() {

            psmodal.value.toggle(true);
            await initData();
                        
        }

        async function submitClicked() {

            // Validation
            if(paramHolder.userPassword.trim() == '') {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('password_update_modal__psw_required_error'));
                return;
            }

            if(paramHolder.confPassword.trim() == '') {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('password_update_modal__confirm_psw_required_error'));
                return;
            }

            if(paramHolder.userPassword.trim() != paramHolder.confPassword.trim()) {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('password_update_modal__psws_mot_same_error'));
                return;
            }
            
            psloading.value.openModal();

            paramHolder.userId = userProvider.user?.data?.userId;

            const returnData = await userProvider.postChangePassword(paramHolder);
            psloading.value.closeModal();

            if(returnData.status == PsStatus.ERROR) {
                return;
            }else if(returnData.status == PsStatus.SUCCESS) {
                psValueHolder.replaePassword(
                                    paramHolder.userPassword
                );
                psloading.value.closeModal();
                psmodal.value.toggle(false);
            }            
        }

        return {
            psmodal,
            openModal,
            submitClicked,
            psloading,
            ps_error_dialog,
            paramHolder
        }
    },
})
</script>
