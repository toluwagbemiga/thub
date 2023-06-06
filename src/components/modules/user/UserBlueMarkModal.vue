<template>
    <ps-modal ref="psmodal" maxWidth="600px" :isClickOut='true' class=" z-50 " >
        <template #title>
            <div class="flex justify-between">
                <ps-label-title> {{ $t('blue_mark_user__apply_user_blue_mark_entry') }} </ps-label-title>
                <ps-label class="hover:underline cursor-pointer" @click="psmodal.toggle(false)">  {{ $t('blue_mark_user__close') }} </ps-label>
            </div>
        </template>
        <template #body>
            <!-- Start Input Field for md .. -->
            <div class="flex justify-between container w-full p-4">
                <!-- Start Left Screen -->
                <div class="md:flex flex-auto md:w-6/12 h-auto bg-white dark:bg-black border rounded-md border-gray-200 dark:border-black  pt-2">
                    <div class="flex flex-col w-full pb-4">
                        <!-- for Note -->
                        <ps-label class="mt-4 mx-8 "> {{ $t('blue_mark_user__note') }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                        <ps-textarea class="mt-2 mx-8 "  v-bind:placeholder="$t('blue_mark_user__note')" :rows="3" v-model:value="note"  @keypress="validateNote"></ps-textarea>
                        <ps-label class="lg:mt-2 mt-1  mx-8" textColor="text-primary-500" v-if="validation"> {{ $t("blue_mark_user__note_required") }} </ps-label>
                        <!-- end Note -->
                    </div>   
                </div>
                <!-- End Left Screen -->

            </div>
            <!-- End Input Field -->
        </template>
        <template #footer>             
            <div class="flex items-center justify-center mb-4">
                <ps-button class="text-center w-60 mx-auto  " @click="submitClicked" > {{ $t('blue_mark_user__submit') }} </ps-button>
                <ps-button class="text-center w-60 mx-auto ms-4" theme="btn-second" @click="psmodal.toggle(false)" > {{ $t('blue_mark_user__close') }}  </ps-button>              
            </div>
        </template>
    </ps-modal>
    <ps-loading-dialog ref="ps_loading_dialog"  :isClickOut='false'/> 

    <ps-error-dialog ref="ps_error_dialog" />

    <ps-success-dialog ref="ps_success_dialog" />
</template>

<script lang="ts">

// Libs
import { defineComponent, ref } from 'vue';

// Compone
import PsModal from '@/components/core/modals/PsModal.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsTextarea from '@/components/core/textarea/PsTextarea.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';
import PsSuccessDialog from '@/components/core/dialog/PsSuccessDialog.vue';
import PsLoadingDialog from '@/components/core/dialog/PsLoadingDialog.vue';
import PsStatus from '@/api/common/PsStatus';

import { createUserProviderState } from '@/store/modules/user/UserProvider';
import UserBlueMarkParameterHolder from '@/object/holder/UserBlueMarkParameterHolder';

export default defineComponent({
    name: "UserBlueMarkModal",
    components: {
        PsModal,
        PsLabelTitle,
        PsLabel,
        PsButton,
        PsErrorDialog,
        PsLoadingDialog,
        PsSuccessDialog,
        PsTextarea,
    },
    setup() {
        const psmodal = ref();
        const note = ref('');
        const ps_loading_dialog = ref();
        const ps_error_dialog = ref();
        const ps_success_dialog = ref();
        let user_id = '';
        const validation =ref(false);
        const holder = new UserBlueMarkParameterHolder();
        // Init Provider
        const provider = createUserProviderState();
     
        function openModal(loginUserId) { 
            user_id = loginUserId;
            psmodal.value.toggle(true);
                        
        }
        function validateNote(e) {
            const pattern = /^\/$|(\/[a-zA-Z_0-9-]+)+$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value = false;
            } else {
                validation.value = true;
            }
        }

        async function submitClicked() {
            holder.loginUserId = user_id;
            holder.note = note.value;
            if(note.value == '' || note.value == undefined){
                validation.value = true;
                return false;
            }
           
            ps_loading_dialog.value.openModal();
            const user = await provider.blueMarkUser(holder);
            if(user.status == PsStatus.ERROR) {
                ps_error_dialog.value.openModal('', user.data.message);
            } else {
                ps_success_dialog.value.openModal('', user.data.message);
            }
           
            ps_loading_dialog.value.closeModal();
            psmodal.value.toggle(false);
        }

        return {
            psmodal,
            openModal,
            note,
            provider,
            submitClicked,
            ps_loading_dialog,
            ps_error_dialog,
            ps_success_dialog,
            validateNote,
            validation
        }
    },
})

</script>