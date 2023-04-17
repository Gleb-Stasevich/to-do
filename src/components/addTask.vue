<template>
    <a @click="$store.state.home.visibility = true" class="add-task">+ Add a task</a>
</template>

<script>

</script>

<style scoped lang="scss">
.add-task {
    margin-left: 20px;
    position: absolute;
    bottom: 20px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: white;
    width: 96%;
    height: 40px;
    background: rgba(28, 27, 31, 0.16);
    border-radius: 20px;
}
</style>