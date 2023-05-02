<template>
    <textarea placeholder="Enter your text..." name="" id="" cols="30" rows="10"></textarea>
</template>

<script>
export default {
    name: 'my-textarea',
}
</script>

<style lang="scss" scoped>
textarea {
    border: none;
    padding: 0px 15px;
    resize: none;
    display: block;
    width: 240px;
    padding-bottom: 12px;
    margin: 20px 20px 5px 0px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #1C1B1F;
    border-radius: 10px;
}
</style>