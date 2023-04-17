<template>
    <div class="modal" v-if="this.$store.state.home.deleteList == true">
        <div class="modal__container">
            <div class="modal__content">
                <div class="modal__block">
                    <div class="modal__title">
                        <span>Are you sure?</span>
                    </div>
                    <div class="modal__name">
                        <span>List will be permanently deleted</span>
                    </div>

                    <div class="modal__btns">
                        <div class="btn">
                            <a @click="this.$store.state.home.deleteList = false">Cancel</a>
                        </div>
                        <div class="btn">
                            <a @click="deleteList">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myModalDeleteList',
    methods: {
        deleteList(e) {
            this.$emit('deleteList', e);
            this.$store.state.home.deleteList = false;
        }
    },
}
</script>

<style scoped lang="scss">
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    z-index: 999999;

    &__block {
        width: 310px;
        height: 172px;
        background-color: white;
        border-radius: 28px;
    }

    &__title {
        padding-top: 24px;
        padding-left: 24px;
        font-size: 22px;
        line-height: 28px;
        color: #1C1B1F;
    }

    &__name {
        padding-top: 16px;
    }

    &__name span {
        padding-left: 24px;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.25px;
        color: rgba(28, 27, 31, 0.38);
    }

    &__btns {
        padding-top: 25px;
        padding-right: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .btn:first-child>a {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;
        color: #5946D2;
        padding: 10px 12px;
    }

    .btn:last-child>a {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;
        color: #FFFFFF;
        padding: 10px 24px;
        background: #F85977;
        border-radius: 20px;
    }
}
</style>