<template>
    <div class="home">
        <div class="home__container">
            <div class="home__content">
                <myModalAddTask :openedTasks="openedTasks"></myModalAddTask>
                <myModalAddList></myModalAddList>
                <myModalRenameList @newListName="renameList"></myModalRenameList>
                <myModalDeleteList @deleteList="deleteList"></myModalDeleteList>

                <home-left-block @updateOpenedTasks="updateOpenedTasks" :selectedSort="selectedSort" :i="i"
                    @updateTasksLists="updateTasksLists" @selectedSort="getSelectedValue" @getAllTasks="getAllTasks"
                    :getMode="getMode"></home-left-block>

                <home-open-tasks :openedTasks="openedTasks" @updateOpenedTasks="updateOpenedTasks" :i="i"
                    :filterTasks="filterTasks" @getAllTasks="getAllTasks" @renameList="renameList" @deleteList="deleteList"
                    :getMode="getMode"></home-open-tasks>

                <home-details :openedTasks="openedTasks" @updateOpenedTasks="updateOpenedTasks" :i="i"
                    @getAllTasks="getAllTasks" :getMode="getMode"></home-details>
            </div>
        </div>
    </div>
</template>

<script>
import homeLeftBlock from '@/components/homeLeftBlock.vue';
import homeOpenTasks from '@/components/homeOpenTasks.vue';
import homeDetails from '@/components/homeDetails.vue';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { ref } from 'vue';

export default {
    components: {
        homeLeftBlock, homeOpenTasks, homeDetails,
    },
    data() {
        return {
            openedTasks: this.$store.state.home.tasks,
            selectedSort: '',
            i: 0, /** Используется как пропс, для перемещения по this.tasksLists[i], где i = [name,completed, {task}, {task}, ...{tasks}]  */
        }
    },
    methods: {

        ...mapMutations({
            setShowDetails: 'home/setShowDetails',
            /** Для localStorage */
            setTasks: 'home/setTasks',
            setImportantTasks: 'home/setImportantTasks',
            setCompletedTasks: 'home/setCompletedTasks',
            setTasksLists: 'home/setTasksLists',
            setDefaultTasks: 'home/setDefaultTasks',
            setDefaultImportantTasks: 'home/setDefaultImportantTasks',
            setDefaultCompletedTasks: 'home/setDefaultCompletedTasks',
            setDefaultTasksLists: 'home/setDefaultTasksLists',
        }),

        getAllTasks() {

            /** -- Поскольку метод может вызваться как в openTasks так и в details, 
             * вместо дублирования метода и многих прокидываний DOM данных из одного компонента в другой и наоборот ($refs)
             *  делаем общий метод и ищем DOM-элеменьы с помощюю doc.querySelector
             * в компонентах, где есть возможность обратиться к refs делаем это
             * 
             * -- Стилизация некоторых элементов находится внутри JS, т.к. элементы
             * в таком случае должны появляться в зависимости от того, какой список
             * пользователь хочет открыть, а лишнее должно убраться
             * */

            const openTask = document.querySelector('.home__open-task');

            if (window.innerWidth <= 980) {
                openTask.style.display = 'block';
                openTask.querySelector('.list-title').style.paddingBottom = 0 + 'px';
                document.querySelector('.home__left-block').style.display = 'none';
            };
            this.setShowDetails(false);

            setTimeout(() => {
                if (document.querySelector('.important').classList.contains('choose') == false) {
                    openTask.classList.remove('home__open-important');
                    document.querySelector('.tasks-checked').style.display = 'flex';
                    document.querySelector('.my-list-tittle').textContent = 'Tasks';
                }
            }, 0);

            for (let elem of document.querySelectorAll('.task-list')) {
                elem.classList.remove('choose');
            };
            for (let elem of document.querySelectorAll('.can-choose')) {
                elem.classList.remove('choose');
            };

            if (document.querySelector('.completed').querySelector('a').classList.contains('choosed-tasks')) {
                document.querySelector('.completed').querySelector('a').classList.remove('choosed-tasks');
                document.querySelector('.to-do').querySelector('a').classList.add('choosed-tasks');
            }

            const tasksBlock = document.querySelector('.view-all-tasks');
            tasksBlock.classList.add('choose');
        },

        getSelectedValue(inputValue) {
            this.selectedSort = inputValue;
        },

        updateOpenedTasks(update) {
            this.openedTasks = update;

            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            localStorage.setItem('importantTasks', JSON.stringify(this.importantTasks));
            localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
            localStorage.setItem('tasksLists', JSON.stringify(this.tasksLists));
        },

        updateTasksLists(value) {
            this.i = value;
        },

        renameList(name) {

            this.openedTasks[0] = name;
            localStorage.setItem('tasksLists', JSON.stringify(this.tasksLists));
        },
        deleteList() {
            let tasks = document.querySelectorAll('.task-list');
            for (let task of tasks) {
                if (task.classList.contains('choose')) {
                    let currentTask = task;
                    for (let j = 2; j < this.tasksLists[this.i].length; j++) {

                        /**
                         * Поскольку таски могут находится в important, ищем их там и удаляем 
                         */

                        this.filterimportantTasks(this.tasksLists[this.i][j].name);
                    }

                    this.$store.state.home.tasksLists = this.$store.state.home.tasksLists.filter(task => task[0] !== currentTask.textContent);
                    document.querySelector('.view-all-tasks').click();
                }
            }
        },
    },
    computed: {

        ...mapState({
            mode: state => state.home.mode,
            tasks: state => state.home.tasks,
            importantTasks: state => state.home.importantTasks,
            completedTasks: state => state.home.completedTasks,
            tasksLists: state => state.home.tasksLists,
            showDetails: state => state.home.showDetails,
        }),

        ...mapGetters({
            filterimportantTasks: 'home/filterImportantTasks',
        }),

        getMode() {
            return this.mode;
        },


        filterTasks() {

            if (this.openedTasks == this.tasksLists[this.i]) {
                const filteredTasks = this.openedTasks.filter(task => typeof task !== 'string' && !Array.isArray(task));
                return filteredTasks.filter(task => task.name.toLowerCase().includes(this.selectedSort.toLowerCase()));
            }
            return this.openedTasks.filter(task => task.name.toLowerCase().includes(this.selectedSort.toLowerCase()));
        }
    },
    mounted() {
        this.setTasks(JSON.parse(localStorage.getItem('tasks')));
        this.setImportantTasks(JSON.parse(localStorage.getItem('importantTasks')));
        this.setCompletedTasks(JSON.parse(localStorage.getItem('completedTasks')));
        this.setTasksLists(JSON.parse(localStorage.getItem('tasksLists')));

        if (this.tasks == null) {
            this.setDefaultTasks([]);
        };
        if (this.importantTasks == null) {
            this.setDefaultImportantTasks([]);
        };
        if (this.completedTasks == null) {
            this.setDefaultCompletedTasks([]);
        };
        if (this.tasksLists == null) {
            this.setDefaultTasksLists([]);
        };
        this.openedTasks = this.tasks;
    }
};
</script>
<style scoped lang="scss">
.home {

    &__content {
        display: flex;
    }

    &__left-block {
        position: relative;
        padding-top: 96px;
        padding-left: 20px;
        min-width: 280px;
        height: 100vh;
    }

    &__open-task {
        background: #B0A2F2;
        width: 100%;
        position: relative;
    }
}

.mobile-open {
    display: block;

}

.mobile-open {
    display: block;
    height: 100vh;

}

@media (max-width: 980px) {

    .home__content {
        background: #8E7CE6;
    }
}
</style>