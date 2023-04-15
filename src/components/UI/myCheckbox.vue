<template>
    <input type="checkbox">
</template>

<script>
export default {
    name: 'my-checkbox',
}
</script>

<style lang="scss" scoped>
input {
    position: relative;
    width: 18px;
    height: 18px;
}

input:checked:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    background: #5946D2;
    border-radius: 2px;
}

input:checked:after {
    content: '\2714';
    position: absolute;
    left: 3px;
    top: -2px;
    color: white;
    font-size: 17px;
}
</style>