<template>

    <div class="sm:mt-32 lg:mt-36 mt-28 h-screen flex flex-col">
        <div class=" w-96 flex flex-col mx-auto  m-auto rounded-lg">
            <ps-label-title class="mt-8 mx-auto text-2xl" > {{ $t("verify_email__verify_your_email") }} </ps-label-title>

            <ps-label class="mt-4 mx-8 "> {{ $t("verify__verification_code") }} : </ps-label>
            <ps-input class="mt-2 mx-8" type="text"  v-bind:placeholder="$t('verify__verification_code')" v-on:keyup.enter="clicked" v-model:value="code"></ps-input>

            <div class="flex items-center justify-center mb-4">
                <!-- Loading Button -->
                <ps-button class="mt-6 mx-8" @click="clicked" v-if="userProvider.loading.value" :disabled="true">                     
                    {{ $t("verify__loading") }} </ps-button>

                <!-- Submit Button --> 
                <ps-button class="mt-6 mx-8" @click="clicked" :disabled="false" v-else>                     
                    {{ $t("verify__submit") }} </ps-button>
            </div>
            <div class="flex items-center justify-center mb-4">
                <ps-route-link class="mx-8" :to="{name: 'login' }" > {{ $t("verify__back_to_login") }} </ps-route-link>
            </div>
        </div> 
    </div> 

    <ps-error-dialog ref="ps_error_dialog" />
</template>

<script lang="ts">
//Vue
import { ref } from 'vue';
import router from '@/router';

import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';
import PsErrorDialog from '@/components/core/dialog/PsErrorDialog.vue';

//Modules
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { useUserProviderState } from '@/store/modules/user/UserProvider';

// Params Holders
import UserEmailVerifyParameterHolder from '@/object/holder/UserEmailVerifyParameterHolder';
import PsStatus from '@/api/common/PsStatus';

//language
import { i18n } from '@/assets/locales/index';
import PsConst from '@/object/constant/ps_constants';

export default {
    name : "VerifyEmailView",
    components : {
        PsLabel,
        PsLabelTitle,
        PsButton,
        PsInput,
        PsRouteLink,
        PsErrorDialog
    },
    setup() {
       
        // Inject Provider
        const userProvider = useUserProviderState();
        const holder = new UserEmailVerifyParameterHolder();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getVerifyUserId();
        const ps_error_dialog = ref();

        if(loginUserId == null || loginUserId == '' || loginUserId == PsConst.NO_LOGIN_USER) {
            router.push({ name : "login"});
        }
        const code = ref();
      
        async function clicked() {
            holder.userId = loginUserId;
            holder.code = code.value;
            
            const returnData = await userProvider.postUserEmailVerify(holder);
            if(returnData.status == PsStatus.SUCCESS) {
                
                PsValueProvider.psValueHolder.login(returnData.data.userId, returnData.data.userName,returnData.data.deviceToken);
                router.push({ name : "dashboard"});
            }else {
                ps_error_dialog.value.openModal('', 
                i18n.global.t('verify_email__incorrect_code'));
            }
            
        }
        return{
            userProvider,
            clicked,
            code,
            ps_error_dialog
        }
    }
}
</script>