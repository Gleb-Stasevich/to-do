<template>
    <a @click="$store.state.home.visibility = true" class="add-task">+ Add a task</a>
</template>

<script>

</script>

<style scoped lang="scss">
.add-task {
    display: block;
    margin: auto;
    padding-left: 20px;
    padding-top: 10px;
    color: white;
    width: 96%;
    height: 40px;
    background: rgba(28, 27, 31, 0.16);
    border-radius: 20px;
    transition: all 0.4s ease;
}

.add-task:hover {
    background: #8E7CE6;
    transition: all 0.4s ease;
}
</style>