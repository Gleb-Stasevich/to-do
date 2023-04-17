<template>
    <a @click="visibility = true" class="add">+ New List</a>
    <myModalAddList v-if="visibility" @closeModal="visibility = false"></myModalAddList>
</template>

<script>
export default {

    data() {
        return {
            visibility: false,
        }
    },
}
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