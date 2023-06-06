// AppIcon.vue
// https://materialdesignicons.com/ 
<template>
  <svg
    class="icon fill-current" 
    :class = 'textColor'
    :style="'width:' + w + 'px;height:' + h + 'px'"
    viewBox="0 0 24 24"
  >
  <g v-if="lanCode == 'ar'" style="transform : scale(-1, 1); transform-origin:center;">
    
    <path :d="path" />
  </g>
  <g v-else>
    
    <path :d="path" />
  </g>
    
  </svg>
</template>

<script>
import icons from './Icons/Icons.json';
import { PsValueProvider } from '@/store/modules/core/PsValueProvider';

export default {
  name: 'AppIcon',
  props: {
    name: String,
    style : {
        type : String,
        default : "width:20px;height:20px"
    },
    h: {
        type: String, 
        default : "20"
    }, 
    w: {
        type: String, 
        default : "20"
    },
    textColor: {
        type: String, 
        default : " dark:text-secondaryDark-white"
    }

  },
  computed: {
    path() {
      return icons[this.name];
    },
    lanCode(){
      return PsValueProvider.psValueHolder.languageCode;
    }
  },
};
</script>