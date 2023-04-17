<template>
    <input @input="updateInput" :value="modelValue" placeholder="Search" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: {
            type: [String, Number]
        },
    },
    methods: {
        updateInput(e) {
            this.$emit('update:modelValue', e.target.value);
        }
    },
}
</script>

<style lang="scss" scoped>
input {
    width: 240px;
    height: 60px;
    padding-left: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: rgba(28, 27, 31, 0.38);
    background: rgba(28, 27, 31, 0.08);
    border-radius: 4px 4px 0px 0px;
    border: 2px solid rgba(28, 27, 31, 0.08);

}

input::placeholder {
    padding-bottom: 4px;
    background-image: url('@/../public/img/icon-search.png');
    background-repeat: no-repeat;
    padding-left: 24px;
}
</style>