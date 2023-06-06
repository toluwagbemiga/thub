<template>
    <div class="  h-screen">
        <div class="sm:mt-32 lg:mt-36 mt-28 mb-5 w-96 flex flex-col mx-auto  m-auto rounded-lg">
            <ps-label-title class="mx-auto text-2xl" > {{ $t("verify_code__verify_your_phone") }} </ps-label-title>

            <ps-label class="mt-4 mx-8 "> {{ $t("verify__verification_code") }} : </ps-label>
            <ps-input class="mt-2 mx-8" type="text" v-bind:placeholder="$t('verify__verification_code')" v-model:value="code"></ps-input>

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
</template>

<script lang="ts">
//Vue
import { ref } from 'vue';

import PsLabel from '@/components/core/label/PsLabel.vue';
import PsLabelTitle from '@/components/core/label/PsLabelTitle.vue';
import PsButton from '@/components/core/buttons/PsButton.vue';
import PsInput from '@/components/core/input/PsInput.vue';
import PsRouteLink from '@/components/core/link/PsRouteLink.vue';

//Modules
import { PsValueProvider } from "@/store/modules/core/PsValueProvider";
import { useUserProviderState } from '@/store/modules/user/UserProvider';

// Params Holders
import UserEmailVerifyParameterHolder from '@/object/holder/UserEmailVerifyParameterHolder';

export default {
    class: "VerifyCodeView",
    components : {
        PsLabel,
        PsLabelTitle,
        PsButton,
        PsInput,
        PsRouteLink
    },
    setup() {
        
        // Inject Provider
        const userProvider = useUserProviderState();
        const holder = new UserEmailVerifyParameterHolder();
        const psValueHolder = PsValueProvider.psValueHolder;
        const loginUserId = psValueHolder.getLoginUserId();
        const code = ref();

        async function clicked() {
            holder.userId = loginUserId;
            holder.code = code.value;
            userProvider.postUserEmailVerify(holder);
        }
        return{
            userProvider,
            code,
            clicked
        }
    }
}
</script>
