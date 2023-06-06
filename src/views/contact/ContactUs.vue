<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-16">
                <div class="flex flex-col items-center mt-16 ">
                    <ps-label-header-4 class=" mb-4 font-medium"> {{ $t("contact_us__contact_us") }} </ps-label-header-4>
                </div>
                <div class="lg:w-3/5 sm:w-4/5 w-full flex flex-col mx-auto  m-auto rounded-lg">
                    <div class="flex flex-wrap mt-2">
                        <div class="flex flex-auto sm:w-6/12 w-full">
                    
                            <div class="flex flex-col w-full">
                                <ps-label class="mt-4 mx-8"> {{ $t("contact_us__contact_name") }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                                <ps-input class=" mt-2 mx-8"  type="text" v-bind:placeholder="$t('contact_us__contact_name')" v-model:value="name"></ps-input>
                                <ps-label class="mt-4 mx-8" textColor="text-primary-500" v-if="validation.nameStatus"> {{ $t("contact_us__name_required_error") }} </ps-label>
                            </div>
                        </div>
                        <div class="flex flex-auto w-6/12"> 
                            <div class="flex flex-col w-full">
                                <ps-label class="mt-4 mx-8 "> {{ $t("contact_us__contact_phone") }}  <span style="font-size: 17px; color: red;">*</span> </ps-label>
                                <ps-input class="mt-2 mx-8"  type="text" v-bind:placeholder="$t('contact_us__contact_phone')" v-model:value="phone" @keypress="phoneNumber($event)"></ps-input>
                                <ps-label class="mt-4 mx-8" textColor="text-primary-500" v-if="validation.phoneStatus"> {{ $t("contact_us__phone_required_error") }} </ps-label>
                            </div>
                        
                        </div>  
                    </div>
                    
                    <ps-label class="mt-4 mx-8"> {{ $t("contact_us__contact_email") }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-input class="mt-2 mx-8"  type="email" v-bind:placeholder="$t('contact_us__contact_email')" v-model:value="email" @keypress="validateEmail"></ps-input>
                    <ps-label class="mt-4 mx-8" textColor="text-primary-500" v-if="validation.emailStatus"> {{ $t("contact_us__email_required_error") }} </ps-label>
                    
                    <ps-label class="mt-4 mx-8"> {{ $t("contact_us__contact_message") }} <span style="font-size: 17px; color: red;">*</span> </ps-label>
                    <ps-textarea class="mt-2 mx-8"  v-bind:placeholder="$t('contact_us__contact_message')" v-model:value="message"></ps-textarea>
                    <ps-label class="mt-4 mx-8" textColor="text-primary-500" v-if="validation.messageStatus"> {{ $t("contact_us__message_required_error") }} </ps-label>

                    <div class="flex flex-col items-center mx-8">
                        <ps-button class="mt-6 w-full sm:w-auto" @click="submitclicked" :disabled="false"> {{ $t("contact_us__submit") }} </ps-button>
                    </div>
                    
                </div>
            </div>
        </template>
    </ps-content-container>

    <ps-success-dialog ref="ps_success_dialog" /> 

</template>

<script lang="ts">
//Vue
import {ref} from 'vue';

import PsContentContainer from '@/components/layouts/container/PsContentContainer.vue';
import PsLabelHeader4 from '@/components/core/label/PsLabelHeader4.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsTextarea from '@/components/core/textarea/PsTextarea.vue';
import PsSuccessDialog from '@/components/core/dialog/PsSuccessDialog.vue';

import { createContactUsProviderState } from "@/store/modules/contact/ContactUsProvider";

// Params Holders
import ContactUsPrameterHolder from '@/object/holder/ContactUsParameterHolder';
import { i18n } from '@/assets/locales/index';

export default {
    name : "ContactView",
    components : {
        PsContentContainer,
        PsLabelHeader4,
        PsLabel,
        PsInput,
        PsButton,
        PsTextarea,
        PsSuccessDialog
    },
    setup() {
     
        // Inject Item Provider
        const contactUsProvider = createContactUsProviderState();

        const paramHolder = new ContactUsPrameterHolder();
        const ps_success_dialog = ref();
        const name = ref('');
        const phone = ref('');
        const email = ref('');
        const message = ref('');
        const validation = ref({
            nameStatus : false,
            phoneStatus : false,
            emailStatus : false,
            messageStatus : false,
        });

        function validateEmail(e) {
            const pattern = /^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$/;
            const res = pattern.test(e.target.value);
            if (!res) {
                validation.value.emailStatus = true;
            } else {
                validation.value.emailStatus = false;
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

        async function submitclicked() {
            paramHolder.name = name.value;
            paramHolder.phone = phone.value;
            paramHolder.email = email.value;
            paramHolder.message = message.value;
            if (paramHolder.name == '' || paramHolder.name == undefined) {
                validation.value.nameStatus = true;
                return;
            }

            if (paramHolder.phone == '' || paramHolder.phone == undefined) {
                validation.value.phoneStatus = true;
                return;
            }

            if (paramHolder.email == '' || paramHolder.email == undefined) {
                validation.value.emailStatus = true;
                return;
            }

            if (paramHolder.message == '' || paramHolder.message == undefined) {
                validation.value.messageStatus = true;
                return;
            }
            // contact us
            await contactUsProvider.postContactUs(paramHolder); 
            ps_success_dialog.value.openModal('Success!',  i18n.global.t('contact_us__add_successed'));    

           name.value = '';
            phone.value = '';
            email.value = '';
            message.value = '';
        }

        return {
            contactUsProvider,
            submitclicked,
            name,
            phone,
            email,
            message,
            validation,
            validateEmail,
            phoneNumber,
            ps_success_dialog
        }
    }
}
</script>