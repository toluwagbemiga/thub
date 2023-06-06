<template>
    <div class="relative">
        <input class="
                    w-full
                    shadow-sm 
                    pe-10 ps-7
                    text-sm
                    " :class="theme" :type="type" :value="value" @input="handleInput($event.target.value)" :placeholder="placeholder"/>
        <div class="absolute inset-y-0 flex items-center ms-2" :class="psValueHolder.languageCode == 'ar' ? 'right-0' : 'left-0'">
            <slot name="icon" class=""></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';
export default {
    name: "PsInputWithRightIcon",
    props: {
        "value" : {
            type: String,
            default: ""
        },
        "type" : {
            type: String,
            default: "text"
        },
        "theme" : {
            type: String,
            default: " py-2 ps-4 form-input bg-primary-000 dark:bg-primaryDark-black text-secondary-500 dark:text-secondaryDark-white "
        }, 
        "placeholder": String
    },
    setup(_, {emit}) {
        const psValueHolder = PsValueProvider.psValueHolder;
        function handleInput(v) {                
            emit('update:value', v)
        }

        return {
            handleInput,
            psValueHolder
        }
    }
}
</script>























