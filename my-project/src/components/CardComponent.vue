<template>
  <div :class="[classesObject, 'gap-'+props.gap, 'mb-4']"
       class="card bg-light-sidebar-bg dark:bg-dark-sidebar-bg border-r dark:border-gray-600/20 shadow-md shadow-gray-100/50 dark:!shadow-gray-900/10 w-full md:h-fit h-full">
    <div class="card-header border-b dark:border-gray-600/20 py-3" v-if="$slots.header">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="card-title text-gray-700 dark:text-gray-100" v-if="$slots.title">
            <slot name="title"></slot>
          </h3>
          <p class="card-sub-title text-gray-400 dark:text-gray-400 !mb-0" v-if="$slots.subtitle">
            <slot name="subtitle"></slot>
          </p>
        </div>
        <div class="flex items-center gap-3">
          <slot name="header-button"></slot>
        </div>
      </div>

    </div>
    <div class="card-body">
      <slot v-if="!$slots.header">
        <h3 class="card-title text-gray-700 dark:text-gray-100" v-if="$slots.title">
          <slot name="title"></slot>
        </h3>
        <p class="card-sub-title text-gray-400 dark:text-gray-400" v-if="$slots.subtitle">
          <slot name="subtitle"></slot>
        </p>
      </slot>

      <slot name="image"></slot>

      <div class="card-content" v-if="$slots.content">
        <slot name="content"></slot>
      </div>

    </div>
    <div v-if="$slots.footer" class="border-t dark:border-gray-600/20" :class="[footerClassesObject, 'gap-'+props.footerGap,'w-full', 'mb-'+props.footerMarginB, 'card-footer']">
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>

<style scoped>
.card-sub-title {
  margin-top: -10px;
  margin-bottom: 15px;
}
</style>

<script setup>
import {computed, defineProps} from 'vue';
import VueTypes from 'vue-types';

const props = defineProps({
  rounded: VueTypes.bool.def(false),
  roundedSize: VueTypes.oneOf(['sm', 'md', 'lg', 'full']).def('md'),
  cursor: VueTypes.bool.def(false),
  border: VueTypes.bool.def(true),
  flex: VueTypes.bool.def(false),
  flexColumn: VueTypes.bool.def(false),
  gap: VueTypes.integer.def(0),
  itemAlign: VueTypes.oneOf(['start', 'center', 'end']).def('start'),
  justifyContent: VueTypes.oneOf(['start', 'center', 'end']).def('start'),
  borderColor: VueTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'info', 'warning']).def('default'),
  borderSize: VueTypes.oneOf(['sm', 'md', 'lg']).def('md'),
  borderRoundedSize: VueTypes.oneOf(['sm', 'md', 'lg', 'full']).def('md'),
  size: VueTypes.oneOf(['sm', 'md', 'lg']).def('md'),
  hover: VueTypes.bool.def(false),
  hoverScale: VueTypes.bool.def(false),

  footerFlex: VueTypes.bool.def(false),
  footerFlexColumn: VueTypes.bool.def(false),
  footerGap: VueTypes.integer.def(0),
  footerItemAlign: VueTypes.oneOf(['start', 'center', 'end']).def('start'),
  footerJustifyContent: VueTypes.oneOf(['start', 'center', 'end', 'between', 'between-sm']).def('start'),
  footerMarginB: VueTypes.integer.def(0),

});

const classesObject = computed(() => ({
  'rounded-md': props.roundedSize === 'md' && props.rounded,
  'rounded-sm': props.roundedSize === 'sm' && props.rounded,
  'rounded-lg': props.roundedSize === 'lg' && props.rounded,
  'rounded-full': props.roundedSize === 'full' && props.rounded,
  'border border-solid': props.border,
  'border-0': !props.border,
  'border-primary': props.borderColor === 'primary',
  'border-secondary': props.borderColor === 'secondary',
  'border-green-300': props.borderColor === 'success',
  'border-red-300': props.borderColor === 'danger',
  'border-blue-300': props.borderColor === 'info',
  'border-yellow-300': props.borderColor === 'warning',
  'border-sm': props.borderSize === 'sm',
  'border-md': props.borderSize === 'md',
  'border-lg': props.borderSize === 'lg',
  'border-rounded-md': props.borderRoundedSize === 'md',
  'border-rounded-sm': props.borderRoundedSize === 'sm',
  'border-rounded-lg': props.borderRoundedSize === 'lg',
  'border-rounded-full': props.borderRoundedSize === 'full',
  'w-10 h-10': props.size === 'sm',
  'w-12 h-12': props.size === 'md',
  'w-14 h-14': props.size === 'lg',
  'dark:hover:bg-dark-bg-card-hover ': props.hover,
  'hover:scale-105': props.hoverScale,
  'cursor-pointer': props.cursor,
  'flex': props.flex,
  'flex-col': props.flexColumn,
  'items-start': props.itemAlign === 'start',
  'items-center': props.itemAlign === 'center',
  'items-end': props.itemAlign === 'end',
  'justify-start': props.justifyContent === 'start',
  'justify-center': props.justifyContent === 'center',
  'justify-end': props.justifyContent === 'end',
}));

const footerClassesObject = computed(() => ({
  'flex': props.footerFlex,
  'flex-col': props.footerFlexColumn,
  'items-start': props.footerItemAlign === 'start',
  'items-center': props.footerItemAlign === 'center',
  'items-end': props.footerItemAlign === 'end',
  'justify-start': props.footerJustifyContent === 'start',
  'justify-center': props.footerJustifyContent === 'center',
  'justify-end': props.footerJustifyContent === 'end',
  'justify-between': props.footerJustifyContent === 'between',
  'max-sm:justify-between !max-md:gap-0': props.footerJustifyContent === 'between-sm',
}));

</script>