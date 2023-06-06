<template>
  <div class="flex items-center">
      <div v-for="star in maxStars" :class="{ 'active': star <= stars }" :key="star" @click="rate(star)" class="star me-0.5">
          <font-awesome-icon :icon="['fas', 'star']" :class="star <= grade ? 'text-primary-500 dark:text-primaryDark-accent ' : 'hidden ' " size="sm" />
          <font-awesome-icon :icon="['far', 'star']" :class="star <= grade ? 'hidden ' : 'text-primary-500  dark:text-primaryDark-accent' " size="sm" />
      </div>
  </div>
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as fasStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as farSrar } from '@fortawesome/free-solid-svg-icons';
library.add(fasStar, farSrar)

export default {
    name: 'RatingView',
    components : {
        
    },
    props: {
        'grade': {
            type : Number,
            default : 0
        },  
        'maxStars': {
            type : Number,
            default : 0
        }, 
        'hasCounter': {
            type : Boolean,
            default : true
        }, 
    },
    setup(props) {
        let stars; 
        
        function rate(star) {
            if (star <= props.maxStars && star >= 0) {
                stars = props.grade === star ? star - 1 : star;
            }
        }

        return {
            rate,
            stars
        }
    },
    // data() {
    //     return {
            
    //     }
    // },
 
}
</script>