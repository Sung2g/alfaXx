<script setup>
import VueTypes from 'vue-types';
import {computed} from 'vue';

const props = defineProps({
  color: VueTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'info', 'warning', 'default', 'link']).def('primary'),
  textColor: VueTypes.oneOf(['white', 'dark', 'warning', 'info', 'danger', 'null']).def('null'),
  size: VueTypes.oneOf(['sm', 'md', 'lg']).def('md'),
  block: VueTypes.bool.def(false),
  outline: VueTypes.bool.def(false),
  roundedSize: VueTypes.oneOf(['sm', 'md', 'lg', 'full']).def('md'),
  disabled: VueTypes.bool.def(false),
  loading: VueTypes.bool.def(false),
  icon: VueTypes.bool.def(false),
  soft: VueTypes.bool.def(false),
  ghost: VueTypes.bool.def(false),
  iconPack: VueTypes.string.def(''),
  iconRight: VueTypes.bool.def(false),
  iconOnly: VueTypes.bool.def(false),
  tag: VueTypes.string.def('button'),
  itemCenter: VueTypes.bool.def(false),
  itemLeft: VueTypes.bool.def(false),
  flex: VueTypes.bool.def(false),
  justifyCenter: VueTypes.bool.def(false),

});

const classObject = computed(() => ({
  'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-500/30': props.color === 'primary',
  'text-blue-500 hover:text-white !bg-transparent border-blue-500 hover:!bg-blue-500': props.color === 'primary' && props.outline,
  'bg-blue-500/10 hover:bg-blue-100 text-blue-500 hover:text-white hover:!bg-blue-500': props.color === 'primary' && props.soft,
  '!bg-transparent hover:bg-blue-100 text-blue-500 !shadow-none hover:text-blue-500 hover:!bg-blue-100 dark:hover:text-white dark:hover:!bg-blue-500/60': props.color === 'primary' && props.ghost,

  'bg-violet-500 hover:bg-violet-600 hover:shadow-lg hover:shadow-violet-200 dark:hover:shadow-violet-500/30': props.color === 'secondary',
  'text-violet-500 hover:text-white !bg-transparent border-violet-500 hover:!bg-violet-500': props.color === 'secondary' && props.outline,
  'bg-violet-500/10 hover:bg-violet-100 text-violet-500 hover:text-white hover:!bg-violet-500': props.color === 'secondary' && props.soft,
  '!bg-transparent hover:bg-violet-100 text-violet-500 !shadow-none hover:text-violet-500 hover:!bg-violet-100 dark:hover:text-white dark:hover:!bg-violet-500/60': props.color === 'secondary' && props.ghost,

  'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 dark:hover:shadow-green-500/30': props.color === 'success',
  'text-green-600 hover:text-white !bg-transparent border-green-600 hover:!bg-green-600': props.color === 'success' && props.outline,
  'bg-green-600/10 hover:bg-green-100 text-green-600 hover:text-white hover:!bg-green-600': props.color === 'success' && props.soft,
  '!bg-transparent hover:bg-green-100 text-green-500 !shadow-none hover:text-green-500 hover:!bg-green-100 dark:hover:text-white dark:hover:!bg-green-500/60': props.color === 'success' && props.ghost,

  'bg-red-500 hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 dark:hover:shadow-red-500/30': props.color === 'danger',
  'text-red-500 hover:text-white !bg-transparent border-red-500 hover:!bg-red-500': props.color === 'danger' && props.outline,
  'bg-red-500/10 hover:bg-red-100 text-red-500 hover:text-white hover:!bg-red-500': props.color === 'danger' && props.soft,
  '!bg-transparent hover:bg-red-100 text-red-500 !shadow-none hover:text-red-500 hover:!bg-red-100 dark:hover:text-white dark:hover:!bg-red-500/60': props.color === 'danger' && props.ghost,

  'bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-200 dark:hover:shadow-cyan-500/30': props.color === 'info',
  'text-cyan-500 hover:text-white !bg-transparent border-cyan-500 hover:!bg-cyan-500': props.color === 'info' && props.outline,
  'bg-cyan-500/10 hover:bg-cyan-100 text-cyan-500 hover:text-white hover:!bg-cyan-500': props.color === 'info' && props.soft,
  '!bg-transparent hover:bg-cyan-100 text-cyan-500 !shadow-none hover:text-cyan-500 hover:!bg-cyan-100 dark:hover:text-white dark:hover:!bg-cyan-500/60': props.color === 'info' && props.ghost,

  'bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-500/30': props.color === 'warning',
  'text-orange-500 hover:text-white !bg-transparent border-orange-500 hover:!bg-orange-500': props.color === 'warning' && props.outline,
  'bg-orange-500/10 hover:bg-orange-100 text-orange-500 hover:text-white hover:!bg-orange-500': props.color === 'warning' && props.soft,
  '!bg-transparent hover:bg-orange-100 text-orange-500 !shadow-none hover:text-orange-500 hover:!bg-orange-100 dark:hover:text-white dark:hover:!bg-orange-500/60': props.color === 'warning' && props.ghost,

  'bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700 hover:shadow-lg hover:shadow-gray-200 hover:dark:shadow-gray-200/10 dark:bg-gray-400/40 dark:text-gray-200 hover:dark:bg-gray-400/20': props.color === 'default',
  'text-gray-400 hover:text-white !bg-transparent border-gray-400 hover:!bg-gray-400': props.color === 'default' && props.outline,
  'bg-gray-500/10 hover:bg-gray-100 text-gray-500 hover:text-white hover:!bg-gray-400': props.color === 'default' && props.soft,
  '!bg-transparent hover:bg-gray-100 text-gray-500 !shadow-none hover:text-gray-500 hover:!bg-gray-100 dark:hover:text-white dark:hover:!bg-gray-500/60': props.color === 'default' && props.ghost,

  'bg-transparent hover:bg-gray-100 dark:hover:bg-black/20 text-light-txt dark:text-dark-txt-light font-normal': props.color === 'link',

  'text-light-txt-light dark:text-dark-txt-light': props.textColor === 'white' && !props.outline,
  'text-light-txt dark:text-dark-txt ': props.textColor === 'dark',
  'text-light-txt-warning dark:text-dark-txt-warning': props.textColor === 'warning',
  'text-light-txt-info dark:text-dark-txt-info': props.textColor === 'info',
  'text-light-txt-danger dark:text-dark-txt-danger ': props.textColor === 'danger',

  'text-sm p-3 !h-9': props.size === 'sm',
  'text-lg': props.size === 'lg',
  'w-full justify-center': props.block,
  'rounded-md': props.roundedSize === 'md',
  'rounded-sm': props.roundedSize === 'sm',
  'rounded-lg': props.roundedSize === 'lg',
  'rounded-full': props.roundedSize === 'full',
  'disabled:opacity-50': props.disabled,
  'cursor-not-allowed': props.disabled,
  'flex items-center justify-center': props.iconOnly,
  'flex gap-3': props.icon && !props.iconOnly,
  'flex-row-reverse': props.iconRight,
  'flex-row': !props.iconRight,
  'flex-col': props.iconOnly,
  'border border-solid border-outline bg-transparent': props.outline,
  'border border-solid border-transparent': !props.outline,
  'opacity-75': props.loading,
  'pointer-events-none': props.loading,
  'items-center': props.itemCenter,
  '!justify-items-start': props.itemLeft,
  'flex': props.flex,
  'justify-center': props.justifyCenter,

}));


</script>

<template>
  <button class="btn flex gap-2 items-center" :class="classObject">
    <slot name="icon"></slot>
    <slot></slot>
    <slot name="icon-right"></slot>
  </button>
</template>