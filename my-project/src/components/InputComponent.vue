<template>
  <label class="block mb-1 text-sm text-gray-600 dark:text-gray-400 font-semibold" :for="id">
    {{ label }}
  </label>
  <div class="relative transition-all duration-300 ease-in-out ">
    <input
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('update:value', $event.target.value)"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :minlength="minlength"
        :size="size"
        :pattern="pattern"
        :spellcheck="spellcheck"
        :tabindex="tabindex"
        :name="name"
        :id="id"
        :class="[$slots.icon ? (iconRight ? 'pr-20 pl-4' : 'pl-10') : 'px-4',$slots.icon && type === 'datetime-local' ? 'hide-calendar-icon' : '']"
        class="block w-full py-2 text-gray-700 bg-light-sidebar-bg dark:bg-dark-sidebar-bg dark:text-dark-txt-light border border-gray-300 dark:border-gray-500 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent focus:outline-0 focus:shadow-xl"
    />
    <div class="absolute text-lg text-gray-400 h-full flex justify-center items-center" :class="[iconRight && 'right-3 top-0', !iconRight&& 'left-3 top-0']">
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<style scoped>
::-webkit-calendar-picker-indicator {
//display: none; float: left;
  padding-right: 15px;
}
</style>
<script setup>
import {computed} from 'vue';
import VueTypes from 'vue-types';

const props = defineProps({
  type: VueTypes.string.def('text'),
  label: VueTypes.string.def('text'),
  placeholder: VueTypes.string.def(''),
  value: VueTypes.string.def(''),
  disabled: VueTypes.bool.def(false),
  readonly: VueTypes.bool.def(false),
  required: VueTypes.bool.def(false),
  autofocus: VueTypes.bool.def(false),
  autocomplete: VueTypes.bool.def(false),
  maxlength: VueTypes.number.def(524288),
  minlength: VueTypes.number.def(0),
  size: VueTypes.number.def(20),
  pattern: VueTypes.string.def(''),
  spellcheck: VueTypes.bool.def(false),
  tabindex: VueTypes.number.def(0),
  name: VueTypes.string.def(''),
  id: VueTypes.string.def('') + Math.random().toString(36).substr(2, 9),

  icon: VueTypes.bool.def(false),
  iconRight: VueTypes.bool.def(false),

});

const classesObject = computed(() => {
  return {
    'flex items-center': props.icon || props.iconRight,
    'flex-row-reverse': props.iconRight,
  };
});
</script>