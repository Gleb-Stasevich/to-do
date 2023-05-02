<template>
    <div v-if="this.addList == true" class="modal">
        <div class="modal__container">
            <div class="modal__content">
                <div class="modal__block">
                    <div class="modal__title">
                        <span>New list</span>
                    </div>
                    <div class="modal__name">
                        <input maxlength="17" placeholder="Enter list title" type="text">
                    </div>

                    <div class="modal__btns">
                        <div class="btn">
                            <a @click="this.setAddList(false)">Cancel</a>
                        </div>
                        <div class="btn">
                            <a @click="checkInput">+ Create</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'myModalAddList',
    methods: {

        ...mapMutations({
            setAddList: 'home/setAddList',
        }),

        checkInput(e) {
            const input = document.querySelector('.modal__name').firstElementChild;
            if (input.value[0] == null || input.value[0] == ' ') {
                alert('Имя не может быть пустым либо начинаться с пробела');
                return
            }
            else {
                if (this.tasksLists.length >= 7) {
                    alert('Максимальное количество разделов - 7');
                    return
                };

                for (let elem of this.tasksLists) {
                    if (elem[0] == input.value.trim()) {
                        alert('Данное имя уже занято');
                        return
                    }

                };

                const name = input.value;
                const completed = [];
                const list = [name, completed];
                this.$store.state.home.tasksLists.push(list);
                this.$emit('closeModal', e);
                this.setAddList(false);

            };
        },
    },
    computed: {

        ...mapState({
            tasksLists: state => state.home.tasksLists,
            addList: state => state.home.addList,
        })

    },
};
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
        width: 500px;
        height: 216px;
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

    &__name input {
        width: 452px;
        height: 60px;
        margin-top: 20px;
        margin-left: 24px;
        padding-left: 28px;
        border: none;
        border-bottom: 1px solid rgba(28, 27, 31, 0.38);
        font-weight: 500;
        line-height: 24px;
        letter-spacing: 0.5px;
    }

    &__btns {
        padding-top: 20px;
        padding-right: 24px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .btn>a {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.1px;
        transition: all 0.4s ease;
    }

    .btn:first-child>a {
        color: #5946D2;
        padding: 10px 12px;
    }

    .btn:last-child>a {
        color: #FFFFFF;
        padding: 10px 24px;
        background: #5946D2;
        border-radius: 20px;
    }

    .btn:first-child>a:hover {
        color: red;
        transition: all 0.4s ease;
    }

    .btn:last-child>a:hover {
        background: #8E7CE6;
        transition: all 0.4s ease;
    }
}

@media(max-width:550px) {
    .modal__block {
        width: 310px;
    }

    .modal__name input {
        width: 280px;
    }
}
</style>