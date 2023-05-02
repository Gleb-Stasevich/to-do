<template>
    <a @click="this.$store.state.home.addList = true" class="add">+ New List</a>
</template>

<script>
export default {
};

</script>

<style>
.add {
    display: block;
    margin-top: 20px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #5946D2;
}
</style>