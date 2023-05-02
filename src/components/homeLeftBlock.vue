<template>
    <div class="home__left-block" ref="homeLeftBlock">
        <my-top-checkbox></my-top-checkbox>
        <my-input class="search-input" v-model:selectedSort="selected"></my-input>
        <div class="home__tasks-list">
            <div @click="getImportantTasks" ref="important" class="important can-choose">
                <div class="imporant-icon">
                    <img src="img/star_rate.png" alt="">
                </div>
                <div class="important-text">
                    <span>Important</span>
                </div>
                <div class="important-all">
                    <img v-if="this.mode == 'light'" src="img/chevron_right.png" alt="">
                    <img v-else src="img/chevron_right-dark.png">
                </div>
            </div>
            <div ref="a" @click="getAllTasks" class="view-all-tasks can-choose choose">
                <div class="view-all-tasks-icon">
                    <img src="img/icon-home.png" alt="">
                </div>
                <div ref="allTasks" class="view-all-tasks-text">
                    <span>Tasks</span>
                </div>
                <div class="view-all">
                    <img v-if="this.mode == 'light'" src="img/chevron_right.png" alt="">
                    <img v-else src="img/chevron_right-dark.png">
                </div>
            </div>

            <br>
            <hr>
            <br>

            <div class="lists">
                <div @click="getListTasks" v-for="list in this.tasksLists" class="task-list">
                    <div class="task-list-icon">
                        <img src="img/icon-more.png" alt="">
                    </div>
                    <div class="task-list-text">
                        <span>{{ list[0] }}</span>
                    </div>
                    <div class="task-list-all">
                        <img v-if="this.mode == 'light'" src="img/chevron_right.png" alt="">
                        <img v-else src="img/chevron_right-dark.png">
                    </div>
                </div>
            </div>
        </div>
        <add-list></add-list>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { Ref } from 'vue';
import addList from '@/components/addList.vue';

export default {

    data() {
        return {
            selected: '',
            open: this.i,
        }
    },

    components: {
        addList
    },

    props: {

        selectedSort: {
            type: [String, Number],
        },

        i: {
            type: Number,
            default: 0,
            required: true,
        },

        getMode: {
            type: String,
            required: true,
        }
    },

    methods: {

        ...mapMutations({
            setShowDetails: 'home/setShowDetails',
            setMode: 'home/setMode',
        }),



        getAllTasks(e) {

            /** 
            * Причина выбора doc.querySelector поясняна в компоненте Home
            */

            document.querySelector('.add-task').style.marginTop = 0 + 'px';

            const openTask = document.querySelector('.home__open-task');
            openTask.classList.remove('.home__open-important');
            this.$emit('getAllTasks', this.tasks);
            this.updateOpenedTasks(this.tasks);
        },

        getImportantTasks(e) {

            const openTask = document.querySelector('.home__open-task');


            if (window.innerWidth <= 980) {
                this.$refs.homeLeftBlock.style.display = 'none';
                openTask.style.display = 'block';
                openTask.querySelector('.list-title').style.paddingBottom = 60 + 'px';

            } else {
                openTask.querySelector('.list-title').style.paddingBottom = 0 + 'px';
                document.querySelector('.add-task').style.marginTop = 63 + 'px';
            }

            this.setShowDetails(false);

            const openTaskTitle = openTask.querySelector('.list-title').firstElementChild;
            const openTasksForChose = openTask.querySelector('.tasks-checked');
            openTask.classList.add('home__open-important');
            openTaskTitle.textContent = 'Important';
            openTasksForChose.style.display = 'none';
            for (let elem of document.querySelectorAll('.task-list')) {
                elem.classList.remove('choose');
            };
            for (let elem of document.querySelectorAll('.can-choose')) {
                elem.classList.remove('choose');
            };
            document.querySelector('.to-do').querySelector('a').classList.remove('choosed-tasks');
            document.querySelector('.completed').querySelector('a').classList.add('choosed-tasks');
            const importantBlock = e.target.closest('.important');
            importantBlock.classList.add('choose');

            this.updateOpenedTasks(this.importantTasks);
        },

        getListTasks(e) {

            const openTask = document.querySelector('.home__open-task');
            document.querySelector('.add-task').style.marginTop = 0 + 'px';
            if (window.innerWidth <= 980) {
                openTask.style.display = 'block';
                this.$refs.homeLeftBlock.style.display = 'none';
            };

            this.setShowDetails(false);

            setTimeout(() => {
                if (this.$refs.important.classList.contains('choose') == false) {
                    openTask.classList.remove('home__open-important');
                    document.querySelector('.tasks-checked').style.display = 'flex';
                }
            }, 0);

            for (let key of document.querySelectorAll('.task-list')) {
                for (let key2 of document.querySelectorAll('.can-choose')) {
                    key.classList.remove('choose');
                    key2.classList.remove('choose');
                };
            };

            document.querySelector('.to-do').querySelector('a').classList.add('choosed-tasks');
            document.querySelector('.completed').querySelector('a').classList.remove('choosed-tasks');
            const openedElem = e.target.closest('.task-list');
            openedElem.classList.add('choose');

            /** Открываем выбранный tasksLists */

            let k = 0;

            outer: for (let elem of document.querySelectorAll('.task-list')) {
                if (elem.classList.contains('choose') == false) {
                    k++;
                }
                if (elem.classList.contains('choose')) {
                    this.open = k;
                    this.updateTasksLists(this.open);
                    k = 0;
                    break outer;
                }
            }
            for (let id of this.tasksLists) {
                if (id[0] == openedElem.querySelector('.task-list-text').firstElementChild.textContent) {

                    this.updateOpenedTasks(this.tasksLists[this.open]);
                }
            };
        },

        updateSelectedSort(e) {
            this.$emit('update:selectedSort', e.target.value);
        },
        updateOpenedTasks(update) {
            this.$emit('updateOpenedTasks', update);
        },
        updateTasksLists(open) {
            this.$emit('updateTasksLists', open);
        },

    },
    watch: {
        selected(inputValue) {
            this.$emit('selectedSort', inputValue);
        },
        getMode(value) {
            if (value == 'dark') {
                this.$refs.homeLeftBlock.classList.add('dark');
                for (let elem of document.querySelectorAll('span')) {
                    elem.classList.add('white');
                }
                document.querySelector('.search-input').classList.add('white-placeholder');

            } else {
                this.$refs.homeLeftBlock.classList.remove('dark');
                for (let elem of document.querySelectorAll('span')) {
                    elem.classList.remove('white');
                }
                document.querySelector('.search-input').classList.remove('white-placeholder');
            }
        },
    },
    computed: {
        ...mapState({
            tasks: state => state.home.tasks,
            importantTasks: state => state.home.importantTasks,
            tasksLists: state => state.home.tasksLists,
            showDetails: state => state.home.showDetails,
            mode: state => state.home.mode,
        }),
    },
};

</script>

<style scoped lang="scss">
$dark: #201F24;
$white: #E6E1E5;

.dark {
    background: $dark !important;
}

.white {
    color: $white !important;
}

.important,
.view-all-tasks,
.task-list {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 240px;
    height: 44px;
    padding: 5px 0px;
}

.important:hover,
.view-all-tasks:hover,
.task-list:hover {
    background: rgba(89, 70, 210, 0.08);
}

.choose {
    background: rgba(89, 70, 210, 0.08);
}

.important {
    padding-top: 20px;
}

.imporant-icon,
.view-all-tasks-icon,
.task-list-icon {
    padding-right: 16px;
}

.important-text span,
.view-all-tasks-text span,
.task-list-text span {
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #1C1B1F;
}

.task-list-icon {
    padding-top: 3px;
}

.task-list-all {
    padding-top: 3px;
}

@media(min-width: 981px) {

    .home__left-block {
        display: block !important;
    }
}

@media (max-width: 980px) {

    .home__left-block {
        background: white;
        padding-top: 45px;
        margin: auto;

        hr {
            width: 240px;
        }
    }

    .important {
        padding-top: 0;
    }

}

@media (max-width: 480px) {

    .home__left-block {
        width: 100vw;
        margin: inherit;
    }

    .home__tasks-list>div {
        position: relative;
        width: 100vw;
    }

    .lists>div {
        position: relative;
        width: 100vw;
    }

    .important-all,
    .view-all,
    .task-list-all {
        position: absolute;
        right: 25px;
    }
}
</style>