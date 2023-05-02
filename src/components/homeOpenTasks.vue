<template>
    <div ref="openTask" class="home__open-task">
        <div class="open-task__container">
            <div class="open-task__content">
                <img @click="goToStartBlock" class="mobile-icon" src="@/../public/img/chevron_left.png" alt="">
                <div class="list-controls">
                    <div class="list-title">
                        <!--
                            Показываем определенный заголовок в зависимости от того, какое значение openedTasks (то, что мы открыли)
                        -->
                        <span v-if="openedTasks == this.tasksLists[this.i]" class="my-list-tittle" ref="my-list-tittle">{{
                            this.tasksLists[this.i]?.[0] }}</span>
                        <span v-else-if="openedTasks == this.tasksLists[this.i]?.[1]" class="my-list-tittle"
                            ref="my-list-tittle">{{
                                this.tasksLists[this.i]?.[0] }}</span>
                        <span v-else-if="openedTasks == this.importantTasks" class="my-list-tittle"
                            ref="my-list-tittle">Important</span>
                        <span v-else class="my-list-tittle" ref="my-list-tittle">Tasks</span>
                    </div>

                    <!--
                        Если мы находимся на кастомном блоке (tasksLists) показываем кнопки (переименовать, удалить)
                    -->

                    <div v-if="openedTasks == this.tasksLists[this.i]" ref="listBtns" class="list-btns">
                        <a @click="this.setRenameList(true)"><img src="img/icon-edit.png" alt=""></a>
                        <a @click="this.setDeleteList(true)"><img src="img/icon-delete.png" alt=""></a>
                    </div>
                    <div v-else-if="openedTasks == this.tasksLists[this.i]?.[1]" ref="listBtns" class="list-btns">
                        <a @click="this.setRenameList(true)"><img src="img/icon-edit.png" alt=""></a>
                        <a @click="this.setDeleteList(true)"><img src="img/icon-delete.png" alt=""></a>
                    </div>
                </div>

                <!--
                    Плказывает список ожидающих своего выполнения таски и список выполненных тасков
                -->

                <div ref="tasksChecked" class="tasks-checked">
                    <div @click="changeColor" class="to-do">
                        <span><a ref="toDo" class="choosed-tasks">To Do</a></span>
                    </div>
                    <div @click="getCompletedTasks" class="completed">
                        <span><a ref="completed">Completed</a></span>
                    </div>
                </div>

                <!--
                    Отрисовываем декларативно наш task без animation-group, т.к. при смене списка тасков
                    элементы начинают "прыгать"
                 -->
                <div class="open-tasks">
                    <div v-for="task in filterTasks" :key="task.id" @click="showMyDetails" :class="{
                            'disabled': openedTasks == this.completedTasks,
                            'disable': openedTasks == this.tasksLists[this.i]?.[1],
                            'dark-background': this.mode == 'dark'
                        }" class="task">
                        <div class="task-left-part">
                            <my-checkbox v-if="openedTasks == this.completedTasks" disabled
                                :checked="openedTasks == this.completedTasks"></my-checkbox>
                            <my-checkbox v-if="openedTasks == this.tasksLists[this.i]?.[1]" disabled
                                :checked="openedTasks == this.tasksLists[this.i]?.[1]"></my-checkbox>
                            <div class="task-description">
                                <span class="task-title" :class="{
                                        'white': this.mode == 'dark'
                                    }">{{ task.name }}</span>
                                <br>
                                <span class="task-date" :class="{
                                    'white': this.mode == 'dark'
                                }">{{ task.date }}</span>
                                <span class="task-counter">{{ task.i }}</span>
                            </div>
                        </div>
                        <div class="task-is-important">
                            <img v-if="task.important == 'yes'" src="img/star_rate.png" class="important-icon" alt="">
                            <img v-else="task.important == 'no'" src="img/icon-star-no-import.png" class="no-important-icon"
                                alt="">
                        </div>
                    </div>
                </div>
                <add-task></add-task>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import addTask from '@/components/addTask.vue';
import { ref } from 'vue';
export default {

    data() {
        return {
            open: this.i, /** Так как пропсы изменять нельзя, обьявляем новую модель и по ходу изменяем ее */
        }
    },

    components: {
        addTask
    },

    props: {
        openedTasks: {
            type: [Array, Object],
            required: true,
        },
        i: {
            type: Number,
            default: 0,
            required: true,
        },

        getMode: {
            type: String,
            required: true,
        },

        /**
         * filterTasks - computed свойство модели this.openedTasks, используется компонентом Home для отрисовки тасков в компонентах
         */

        filterTasks: {
            type: [Array, Object],
            required: true,
        }
    },

    methods: {

        ...mapMutations({
            pushTasks: 'home/pushTasks',
            pushImportantTasks: 'home/pushImportantTasks',
            pushCompletedTasks: ' pushCompletedTasks',
            setVisibility: 'home/setVisibility',
            setShowDetails: 'home/setShowDetails',
            setRenameList: 'home/setRenameList',
            setDeleteList: 'home/setDeleteList',
        }),

        showMyDetails(e) {

            if (window.innerWidth <= 980) {
                this.setShowDetails(true);
                this.$refs.openTask.style.display = 'none';
                document.querySelector('.home-details').style.display = 'block';
            };
            if (this.openedTasks == this.importantTasks || this.openedTasks == this.tasks) {
                const allTasks = document.querySelectorAll('.task');
                for (let task of allTasks) {
                    if (task.classList.contains('open')) {
                        task.classList.remove('open');
                    };
                };
                let openedElem = e.target.closest('.task');
                openedElem.classList.add('open');
                let vueTask = null;
                for (let key of this.tasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        vueTask = key;
                    }
                };
                if (vueTask == null) {
                    this.showDetailsCustom(e);
                    return;
                }

                /** 
                 * Причина выбора doc.querySelector поясняна в компоненте Home
                 */

                let openTitle = document.querySelector('.home-details__title').lastElementChild;
                let openDate = document.querySelector('.home-details-date').firstElementChild;
                let openImportant = document.querySelector('.home-details-is-important').firstElementChild;
                let openNode = document.querySelector('textarea');
                let important = openedElem.querySelector('.task-is-important').firstElementChild;
                if (important.classList.contains('no-important-icon')) {
                    openImportant.src = require('@/../public/img/icon-star-no-import.png')
                    vueTask.important = 'no';
                } else if (important.classList.contains('important-icon')) {
                    openImportant.src = require('@/../public/img/star_rate.png')
                    vueTask.important = 'yes';
                }
                const normalDate = vueTask.date.split('-').reverse().join('-');
                openTitle.value = vueTask.name;
                openDate.value = normalDate;
                openNode.value = vueTask.text;
                document.querySelector('.created').textContent = 'Created ' + vueTask.date;
                this.setShowDetails(true);

            } else if (this.openedTasks !== this.tasks) {
                this.showDetailsCustom(e);
                return;
            }
        },

        showDetailsCustom(e) {

            /** 
             * Эта функция запускатеся только в том случае,
             * если мы пытаемся открыть tasksLists
             */

            const allTasks = document.querySelectorAll('.task');
            for (let task of allTasks) {
                if (task.classList.contains('open')) {
                    task.classList.remove('open');
                };
            };
            let openedElem = e.target.closest('.task');

            openedElem.classList.add('open');
            let vueTask = null;

            if ((openedElem.querySelector('.task-counter').textContent)) {
                this.open = openedElem.querySelector('.task-counter').textContent;
            }

            for (let key of this.tasksLists[this.open]) {
                if (key.name == openedElem.querySelector('.task-title').textContent) {
                    vueTask = key;
                }
            };

            let openTitle = document.querySelector('.home-details__title').lastElementChild;
            let openDate = document.querySelector('.home-details-date').firstElementChild;
            let openImportant = document.querySelector('.home-details-is-important').firstElementChild;
            let openNode = document.querySelector('textarea');
            let important = openedElem.querySelector('.task-is-important').firstElementChild;
            if (important.classList.contains('no-important-icon')) {
                openImportant.src = require('@/../public/img/icon-star-no-import.png');
                vueTask.important = 'no';
            } else if (important.classList.contains('important-icon')) {
                openImportant.src = require('@/../public/img/star_rate.png');
                vueTask.important = 'yes';
            };
            const normalDate = vueTask.date.split('-').reverse().join('-');
            openTitle.value = vueTask.name;
            openDate.value = normalDate;
            openNode.value = vueTask.text;
            this.setShowDetails(true);
        },

        getAllTasks(e) {

            this.$refs.openTask.classList.remove('.home__open-important');

            this.$emit('getAllTasks', this.tasks);
            this.updateOpenedTasks(this.tasks);
        },

        getCompletedTasks(e) {
            const openTask = document.querySelector('.home__open-task');
            openTask.querySelector('.list-title').style.paddingBottom = 0 + 'px';
            this.setShowDetails(false);
            if (this.openedTasks == this.tasksLists[this.i]) {

                this.updateOpenedTasks(this.tasksLists[this.i][1]);
                this.$refs.toDo.classList.remove('choosed-tasks');
                this.$refs.completed.classList.add('choosed-tasks');
                return
            };
            if (this.openedTasks == this.tasksLists[this.i]?.[1]) {
                return
            };
            this.updateOpenedTasks(this.completedTasks);
            this.$refs.toDo.classList.remove('choosed-tasks');
            this.$refs.completed.classList.add('choosed-tasks');
        },

        updateOpenedTasks(update) {
            this.$emit('updateOpenedTasks', update);
        },


        changeColor() {
            this.$refs.completed.classList.remove('choosed-tasks');
            this.$refs.toDo.classList.add('choosed-tasks');
            for (let elem of document.querySelectorAll('.task-list')) {
                if (elem.classList.contains('choose')) {
                    elem.click();
                }
            };
            for (let elem of document.querySelectorAll('.can-choose')) {
                if (elem.classList.contains('choose')) {
                    elem.click();
                    this.getAllTasks();
                }
            };
        },

        goToStartBlock() {
            if (window.innerWidth <= 980) {
                this.$refs.openTask.style.display = 'none';
                document.querySelector('.home__left-block').style.display = 'block';
            };
        },

    },

    watch: {
        getMode(value) {
            if (value == 'dark') {
                this.$refs.openTask.classList.add('dark');
                this.$refs.toDo.classList.add('white');
                this.$refs.completed.classList.add('white');

            } else {
                this.$refs.openTask.classList.remove('dark');
                this.$refs.toDo.classList.remove('white');
                this.$refs.completed.classList.remove('white');
            }
        }
    },

    computed: {
        ...mapState({
            tasks: state => state.home.tasks,
            importantTasks: state => state.home.importantTasks,
            completedTasks: state => state.home.completedTasks,
            tasksLists: state => state.home.tasksLists,
            visibility: state => state.home.visibility,
            showDetails: state => state.home.showDetails,
            mode: state => state.home.mode,
        }),
        ...mapGetters({
            filterAllTasks: 'home/filterAllTasks',
            filterimportantTasks: 'home/filterImportantTasks',
            filterCompletedTasks: 'home/filterCompletedTasks',
        }),
    },
}
</script>

<style lang="scss" scoped>
$dark: #201F24;
$darkBlue: #544794;
$white: #E6E1E5;
$darkPink: #D9415E;

.dark {
    background: $darkBlue !important;
}

.white {
    color: $white !important;
}

.dark-background {
    background: $dark !important;
}

::-webkit-scrollbar {
    width: 0;
}

.open-tasks {
    margin-top: 15px;
    height: 450px;
    overflow-y: scroll;
}

.open-task {

    &__container {
        max-width: 100%;
    }

    &__content {
        padding-top: 28px;
    }
}

.home__open-important {
    background: #F85977 !important;
}

.list-controls {
    padding: 0px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list-title span {
    font-size: 22px;
    line-height: 28px;
    color: #FFFFFF;
}

.list-btns a:first-child {
    margin-right: 16px;
}

.tasks-checked {
    margin-left: 20px;
    padding-top: 18px;
    display: flex;
    align-items: center;
}

.to-do span a,
.completed span a {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    height: 45px;
    border-bottom: 1px solid white;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: rgba(28, 27, 31, 0.38);

}

.choosed-tasks {
    color: #317cec !important;
    border-bottom: 1px solid #5946D2 !important;
}

.task {
    position: relative;
    background-color: white;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
}

.task:hover {
    background: #d4d4d4;
}

.dark-background:hover {
    background: black !important;
}

.task-left-part {
    padding-left: 21px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-description {
    padding-left: 27px;
}

.task-title {
    font-weight: 500;
    line-height: 24px;
    color: #1C1B1F;
}

.task-date {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: rgba(28, 27, 31, 0.6);
}

.task-date.date {
    color: #F85977;
}

.task-counter {
    opacity: 0;
    position: absolute;
}

.task-is-important {
    pointer-events: none;
    padding-right: 18px;
}

.task:first-child {
    margin-top: 10px;
}

.task {
    margin: 5px 20px;
}

.disabled {
    pointer-events: none;
    touch-action: none;
    background: #d4d4d4;
}

.disable {
    pointer-events: none;
    touch-action: none;
    background: #d4d4d4;
}

.mobile-icon {
    cursor: pointer;
    position: absolute;
    left: 10px;
    top: 23px;
}

@media(max-width: 1115px) {
    .task-title {
        font-size: 13px;
    }
}

@media(min-width: 981px) {
    .mobile-icon {
        display: none !important;
    }

    .home__open-task {
        display: block !important;
    }
}

@media (max-width: 980px) {

    .home__open-task {
        display: none;
        height: 100vh;
    }

    .mobile-icon {
        display: block !important;
    }

    .my-list-tittle {
        padding-left: 30px;
    }

}


@media (max-width: 385px) {
    .task {
        width: 100%;
        margin: 0;
        margin-top: 10px;
    }

    .completed span a,
    .to-do span a {
        width: 160px;
    }

    .tasks-checked {
        margin-left: 0px;
    }
}

@media (max-width: 350px) {

    .task-is-important {
        margin-left: 18px;
    }
}
</style>