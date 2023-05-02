<template>
    <div class="modal" v-if="visibility == true">
        <div class="modal__container">
            <div class="modal__content">
                <div class="modal__block">
                    <div class="modal__title">
                        <span>Add a task</span>
                    </div>
                    <div class="modal__name">
                        <input maxlength="26" placeholder="Add a task" type="text">
                    </div>

                    <div class="modal__btns">
                        <div class="btn">
                            <a @click="setVisibility(false)">Cancel</a>
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

import { mapState, mapMutations } from 'vuex';

export default {
    name: 'myModalAddTask',

    props: {
        openedTasks: {
            type: [Array, Object],
            required: true,
        },
    },

    methods: {

        ...mapMutations({
            pushTasks: 'home/pushTasks',
            pushImportantTasks: 'home/pushImportantTasks',
            setVisibility: 'home/setVisibility',
        }),

        checkInput(e) {
            let i = 0;
            const input = document.querySelector('.modal__name').firstElementChild;

            if (input.value[0] == null || input.value[0] == ' ') {
                alert('Имя не может быть пустым либо начинаться с пробела');
                return
            } else if (this.tasksLists.length > 0 && this.tasks.length > 0) {

                for (let elem of this.tasks) {

                    if (elem.name == input.value.trim()) {
                        alert('Не допускается повторое обьявление имени в этом компоненте');
                        return
                    }
                }
            } else if (this.importantTasks.length > 0 && this.tasksLists.length > 0) {
                for (let elem of this.tasksLists?.[i]) {
                    if (elem?.name == input.value.trim()) {
                        alert('Не допускается повторое обьявление имени в этом компоненте');
                        return
                    }
                }
                i++;
            }
            else if (this.tasks.length > 0) {
                for (let task of this.tasks) {
                    if (task?.name == input.value.trim()) {
                        alert('Данное имя уже занято');
                        return
                    }
                }
            } else if (this.importantTasks.length > 0) {
                for (let task of this.importantTasks) {
                    if (task.name == input.value.trim()) {
                        alert('Данное имя уже занято');
                        return
                    };
                };
            };

            const nowDate = new Date();
            let correctMonth = nowDate.getMonth() + 1;
            let correctDay = nowDate.getDate();

            if (String(correctDay).length === 1) {
                correctDay = '0' + correctDay;
            };
            if (correctMonth <= 9) {
                correctMonth = '0' + correctMonth;
            };

            let task = {
                name: input.value,
                text: '',
                date: correctDay + '-' + correctMonth + '-' + nowDate.getFullYear(),
                important: 'yes',
                id: input.value,
            };

            for (let elem of document.querySelectorAll('.task-list')) {
                for (let i = 0; i < document.querySelectorAll('.task-list').length; i++) {
                    if (elem.classList.contains('choose')) {

                        if (elem.querySelector('.task-list-text').firstElementChild.textContent == this.tasksLists[i][0]) {

                            task.i = i;

                            this.$store.state.home.tasksLists[i].push(task); /** Причина пояснена в модуле  */

                            this.pushImportantTasks(task);
                            this.setVisibility(false);

                            localStorage.setItem('tasksLists', JSON.stringify(this.tasksLists));
                            localStorage.setItem('importantTasks', JSON.stringify(this.importantTasks));
                            return
                        }
                    }
                }
            };

            input.value = '';

            this.pushTasks(task);
            this.pushImportantTasks(task);
            this.setVisibility(false);

            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('importantTasks', JSON.stringify(this.importantTasks));
        }
    },
    computed: {
        ...mapState({
            tasks: state => state.home.tasks,
            importantTasks: state => state.home.importantTasks,
            tasksLists: state => state.home.tasksLists,
            visibility: state => state.home.visibility,
            showDetails: state => state.home.showDetails,
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
    }

    .btn:first-child>a {
        color: #5946D2;
        padding: 10px 12px;
        transition: all 0.4s ease;
    }

    .btn:last-child>a {
        color: #FFFFFF;
        padding: 10px 24px;
        background: #5946D2;
        border-radius: 20px;
        transition: all 0.4s ease;
    }
}

.btn:first-child>a:hover {
    color: red;
    transition: all 0.4s ease;
}

.btn:last-child>a:hover {
    background: #8E7CE6;
    transition: all 0.4s ease;
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