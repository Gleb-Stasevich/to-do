<template>
    <div class="modal" v-if="$store.state.home.visibility == true">
        <div class="modal__container">
            <div class="modal__content">
                <div class="modal__block">
                    <div class="modal__title">
                        <span>Add a task</span>
                    </div>
                    <div class="modal__name">
                        <input placeholder="Add a task" type="text">
                    </div>

                    <div class="modal__btns">
                        <div class="btn">
                            <a @click="$store.state.home.visibility = false">Cancel</a>
                        </div>
                        <div class="btn">
                            <a @click="checkInput">+ Add</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myModalAddTask',
    methods: {
        checkInput(e) {
            const input = document.querySelector('input');
            if (input.value[0] == null || input.value[0] == ' ') {
                alert('Имя не может быть пустым либо начинаться с пробела');
                return
            } else {
                const nowDate = new Date();
                let correctMonth = nowDate.getMonth() + 1;
                if (correctMonth <= 9) {
                    correctMonth = '0' + correctMonth;
                };

                const task = {
                    name: input.value,
                    text: '',
                    date: nowDate.getDate() + '-' + correctMonth + '-' + nowDate.getFullYear(),
                    important: 'yes',
                    id: input.value,
                };


                for (let elem of document.querySelectorAll('.task-list')) {
                    for (let i = 0; i < document.querySelectorAll('.task-list').length; i++) {
                        if (elem.classList.contains('choose')) {

                            if (elem.querySelector('.task-list-text').firstElementChild.textContent == this.$store.state.home.tasksLists[i][0]) {

                                this.$store.state.home.tasksLists[i].push(task);

                                this.$store.state.home.importantTasks.push(task);
                                this.$store.state.home.visibility = false;
                                console.log(i);
                                return
                            }
                        }
                    }
                }
                this.$store.state.home.tasks.push(task);
                this.$store.state.home.importantTasks.push(task);
                input.value = '';
                this.$store.state.home.visibility = false;
            }
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
        background: #5946D2;
        border-radius: 20px;
    }
}
</style>