<template>
    <button
        type="button"
        class="shadow-sm inline-flex items-center content-start justify-between  h-10  rounded-xl lg:rounded-2xl
         text-sm leading-5 font-medium text-secondary-500 dark:text-secondaryDark-white
                 focus:outline-none focus:border-secondaryDark-grey
                focus:shadow-outline-blue active:bg-gray-100 active:text-secondary-600 transition 
                ease-in-out duration-150 btn-focus"
        :id="id"
        :class="[bgColor, w]"
        aria-haspopup="true"
        aria-expanded="true">

        <div v-if="showCenter" class="flex-grow relative">
            <ps-label class="text-center text-xs lg:text-sm font-medium"> 
                
                <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" class="absolute ms-3/4" name="downArrow"   />
                {{selectedValue ? selectedValue : i18n.global.t('ps_dropdown_select__chooseone')}} 
                
            </ps-label>
        </div>

        <div v-else class="flex-grow relative ">
            <ps-label class="text-center text-xs lg:text-sm font-medium"> 
                
                <ps-icon textColor="text-secondary-400 dark:text-secondaryDark-grey" class="absolute ms-5/6" name="downArrow"   />
                {{selectedValue ? selectedValue : i18n.global.t('ps_dropdown_select__chooseone')}} 
                
            </ps-label>
        </div>
        
    </button>
    
</template>

<script>
import PsIcon from '@/components/core/icons/PsIcon.vue';
import PsLabel from '@/components/core/label/PsLabel.vue';
import { i18n } from '@/assets/locales/index';

export default {
    name : "PsDropdownSelect",
    components : {
        PsIcon,
        PsLabel
    },
    props : {
        selectedValue : {
            type : String,
            default : ''
        },
        bgColor : {
            type : String,
            default : 'bg-primary-000 dark:bg-primaryDark-black '
        },
        w: {
            type : String,
            default : 'w-full'
        },
        showCenter: {
            type : Boolean,
            default : false
        },
        id : {
            type : String
        }
    },
    setup() {
        return{
            i18n
        }
    }

}
</script>