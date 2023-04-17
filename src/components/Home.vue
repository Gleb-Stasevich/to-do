<template>
    <myModalAddTask></myModalAddTask>
    <myModalRenameList @newListName="renameList"></myModalRenameList>
    <myModalDeleteList @deleteList="deleteList"></myModalDeleteList>
    <div class="home">
        <div class="home__container">
            <div class="home__content">
                <div class="home__left-block">
                    <my-input v-model="selectedSort"></my-input>
                    <div class="home__tasks-list">
                        <div @click="getImportantTasks" ref="important" class="important can-choose">
                            <div class="imporant-icon">
                                <img src="img/star_rate.png" alt="">
                            </div>
                            <div class="important-text">
                                <span>Important</span>
                            </div>
                            <div class="important-all">
                                <img src="img/chevron_right.png" alt="">
                            </div>
                        </div>
                        <div @click="getAllTasks" class="view-all-tasks can-choose choose">
                            <div class="view-all-tasks-icon">
                                <img src="img/icon-home.png" alt="">
                            </div>
                            <div ref="allTasks" class="view-all-tasks-text">
                                <span>Tasks</span>
                            </div>
                            <div class="view-all">
                                <img src="img/chevron_right.png" alt="">
                            </div>
                        </div>

                        <br>
                        <hr>
                        <br>

                        <div class="lists">
                            <div @click="getListTasks" v-for="list in $store.state.home.tasksLists" class="task-list">
                                <div class="task-list-icon">
                                    <img src="img/icon-more.png" alt="">
                                </div>
                                <div class="task-list-text">
                                    <span>{{ list[0] }}</span>
                                </div>
                                <div class="task-list-all">
                                    <img src="img/chevron_right.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <add-list></add-list>
                </div>

                <div ref="openTask" class="home__open-task">
                    <div class="open-task__container">
                        <div class="open-task__content">
                            <div class="list-controls">
                                <div class="list-title">
                                    <span v-if="openedTasks == this.$store.state.home.tasksLists[this.i]" ref="listTitle">{{
                                        this.$store.state.home.tasksLists[this.i][0] }}</span>
                                    <span v-else-if="openedTasks == this.$store.state.home.tasksLists[this.i]?.[1]"
                                        ref="listTitle">{{
                                            this.$store.state.home.tasksLists[this.i][0] }}</span>
                                    <span v-else ref="listTitle">Tasks</span>
                                </div>
                                <div v-if="openedTasks == this.$store.state.home.tasksLists[this.i]" ref="listBtns"
                                    class="list-btns">
                                    <a @click="this.$store.state.home.renameList = true"><img src="img/icon-edit.png"
                                            alt=""></a>
                                    <a @click="this.$store.state.home.deleteList = true"><img src="img/icon-delete.png"
                                            alt=""></a>
                                </div>
                                <div v-else-if="openedTasks == this.$store.state.home.tasksLists[this.i]?.[1]"
                                    ref="listBtns" class="list-btns">
                                    <a @click="this.$store.state.home.renameList = true"><img src="img/icon-edit.png"
                                            alt=""></a>
                                    <a @click="this.$store.state.home.deleteList = true"><img src="img/icon-delete.png"
                                            alt=""></a>
                                </div>
                            </div>

                            <div ref="tasksChecked" class="tasks-checked">
                                <div @click="changeColor" class="to-do">
                                    <span><a ref="toDo" class="choosed-tasks">To Do</a></span>
                                </div>
                                <div @click="getCompletedTasks" class="completed">
                                    <span><a ref="completed">Completed</a></span>
                                </div>
                            </div>
                            <!--            НАЧАЛО        -->
                            <div class="open-tasks">

                                <div @click="showDetails" v-for="task in filterTasks" :class="{
                                    'disabled': openedTasks == this.$store.state.home.completedTasks,
                                    'disable': openedTasks == this.$store.state.home.tasksLists[this.i]?.[1]
                                }" class="task">
                                    <div class="task-left-part">

                                        <my-checkbox v-if="openedTasks == this.$store.state.home.completedTasks" disabled
                                            :checked="openedTasks == this.$store.state.home.completedTasks"></my-checkbox>
                                        <my-checkbox v-if="openedTasks == this.$store.state.home.tasksLists[this.i]?.[1]"
                                            disabled
                                            :checked="openedTasks == this.$store.state.home.tasksLists[this.i]?.[1]"></my-checkbox>
                                        <div class="task-description">
                                            <span class="task-title">{{ task.name }}</span>
                                            <br>
                                            <span class="task-date">{{ task.date }}</span>
                                        </div>
                                    </div>
                                    <div class="task-is-important">
                                        <img v-if="task.important == 'yes'" src="img/star_rate.png" class="important-icon"
                                            alt="">
                                        <img v-else="task.important == 'no'" src="img/icon-star-no-import.png"
                                            class="no-important-icon" alt="">
                                    </div>
                                </div>
                            </div>
                            <add-task></add-task>
                        </div>
                    </div>
                </div>
                <div v-show="$store.state.home.showDetails == true" class="home-details">
                    <div class="home-details__content">
                        <div class="home-details__top-content">
                            <div class="home-details-task">
                                <my-checkbox @change="changeCheckbox"></my-checkbox>
                                <div class="home-details__title">
                                    <span>Task Name</span>
                                    <br>
                                    <input-title @input="changeName"></input-title>
                                </div>
                                <div class="home-details-is-important">
                                    <img src="img/star_rate.png" alt="">
                                </div>
                            </div>
                            <hr class="blue-hr">
                            <br>
                            <hr class="default-hr">
                            <div class="home-details-date">
                                <input @input="changeDate" type="date">
                            </div>
                            <hr class="default-hr">
                            <div class="home-details-note">
                                <span class="note">Note</span>
                                <br>
                                <my-textarea @input="changeNode">
                                </my-textarea>

                                <hr class="default-hr">
                            </div>
                        </div>
                        <div class="home-details__bottom-content">
                            <div @click="$store.state.home.showDetails = false" class="btn-close">
                                <img src="img/chevron_right.png" alt="">
                            </div>
                            <div class="created">
                                <span ref="createdDate"></span>
                            </div>
                            <div @click="deleteTask" class="btn-delete">
                                <img src="img/icon-delete-grey.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import addTask from '@/components/addTask.vue'
import addList from '@/components/addList.vue';
import { ref } from 'vue';

export default {
    components: {
        addTask, addList
    },
    data() {
        return {
            openedTasks: this.$store.state.home.tasks,
            selectedSort: '',
            i: 0,
        }
    },
    methods: {
        showDetails(e) {

            if (this.openedTasks == this.$store.state.home.importantTasks || this.openedTasks == this.$store.state.home.tasks) {


                const allTasks = document.querySelectorAll('.task');
                for (let task of allTasks) {
                    if (task.classList.contains('open')) {
                        task.classList.remove('open');
                    };
                };
                let openedElem = e.target.closest('.task');
                openedElem.classList.add('open');
                console.log(openedElem.querySelector('.task-title'));

                let vueTask = null;

                for (let key of this.$store.state.home.tasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        vueTask = key;
                    }
                };

                if (vueTask == null) {
                    this.showDetailsCustom(e);
                    return;
                }

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

                openImportant.onclick = () => {

                    let important = e.target.querySelector('.task-is-important').firstElementChild;

                    if (important.classList.contains('no-important-icon')) {
                        openImportant.src = require('@/../public/img/star_rate.png')
                        vueTask.important = 'yes';
                        this.$store.state.home.importantTasks.push(vueTask);
                    } else {
                        openImportant.src = require('@/../public/img/icon-star-no-import.png')
                        vueTask.important = 'no';
                        this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(task => task.name !== vueTask.name);
                        if (document.querySelector('.important').classList.contains('choose')) {
                            document.querySelector('.important').click();
                        };
                    }
                };
                const normalDate = vueTask.date.split('-').reverse().join('-');

                openTitle.value = vueTask.name;
                openDate.value = normalDate;
                openNode.value = vueTask.text;
                this.$refs.createdDate.textContent = 'Created ' + vueTask.date;

                this.$store.state.home.showDetails = true;

            } else if (this.openedTasks !== this.$store.state.home.tasks) {
                this.showDetailsCustom(e);
                return;
            }

        },

        showDetailsCustom(e) {
            const allTasks = document.querySelectorAll('.task');
            for (let task of allTasks) {
                if (task.classList.contains('open')) {
                    task.classList.remove('open');
                };
            };
            let openedElem = e.target.closest('.task');
            openedElem.classList.add('open');

            let vueTask = null;

            for (let key of this.$store.state.home.tasksLists[this.i]) {
                console.log(this.i);
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

            openImportant.onclick = () => {

                let important = e.target.querySelector('.task-is-important').firstElementChild;

                if (important.classList.contains('no-important-icon')) {
                    openImportant.src = require('@/../public/img/star_rate.png');
                    vueTask.important = 'yes';
                    this.$store.state.home.importantTasks.push(vueTask);

                } else {
                    openImportant.src = require('@/../public/img/icon-star-no-import.png');
                    vueTask.important = 'no';
                    console.log(vueTask.name);
                    this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(task => task.name !== vueTask.name);
                    this.$refs.important.click();
                }
            };
            const normalDate = vueTask.date.split('-').reverse().join('-');

            openTitle.value = vueTask.name;
            openDate.value = normalDate;
            openNode.value = vueTask.text;
            this.$store.state.home.showDetails = true;
        },
        changeDate(e) {

            const openedElem = document.querySelector('.open');

            let openDate = e.target.value;

            let normalDate = openDate.split('-').reverse().join('-');

            if (this.openedTasks == this.$store.state.home.importantTasks || this.openedTasks == this.$store.state.home.tasks) {

                for (let key of this.$store.state.home.importantTasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        console.log('тут');
                        key.date = normalDate;
                    }
                    console.log(key.name);
                    console.log(openedElem.querySelector('.task-title').textContent);
                }

            } else if (this.openedTasks !== this.$store.state.home.tasks) {
                for (let key of this.$store.state.home.tasksLists[this.i]) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        key.date = normalDate;
                        return;
                    }
                }
            };
        },
        changeName(e) {
            let openedElem = document.querySelector('.open');
            let inputValue = e.target.value;
            if (this.openedTasks == this.$store.state.home.importantTasks || this.openedTasks == this.$store.state.home.tasks) {

                for (let key of this.$store.state.home.importantTasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        key.name = inputValue;
                    }
                }

            } else if (this.openedTasks !== this.$store.state.home.tasks) {
                for (let key of this.$store.state.home.tasksLists[this.i]) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        key.name = inputValue;
                        return;
                    }
                }
            };
        },
        changeNode(e) {
            let openedElem = document.querySelector('.open');
            let inputValue = e.target.value;
            if (this.openedTasks == this.$store.state.home.importantTasks || this.openedTasks == this.$store.state.home.tasks) {
                for (let key of this.$store.state.home.importantTasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        key.text = inputValue;
                    }
                }
            } else if (this.openedTasks !== this.$store.state.home.tasks) {
                for (let key of this.$store.state.home.tasksLists[this.i]) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        key.text = inputValue;
                        return;
                    }
                }
            };
        },
        changeCheckbox(e) {
            let openedElem = document.querySelector('.open');
            let checkbox = openedElem.querySelector('.task-left-part').firstElementChild;

            if (e.target.checked) {
                checkbox.checked = true;
                checkbox.setAttribute('disabled', '');
                e.target.style.pointerEvents = "none";
            }
            if (this.openedTasks == this.$store.state.home.importantTasks || this.openedTasks == this.$store.state.home.tasks) {

                setTimeout(() => {
                    for (let key of this.$store.state.home.importantTasks) {
                        if (key.name == openedElem.querySelector('.task-title').textContent) {
                            this.$store.state.home.completedTasks.push(key);
                            this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(obj => obj.name !== key.name);
                            this.openedTasks = this.$store.state.home.tasks = this.$store.state.home.tasks.filter(obj => obj.name !== key.name);
                        }
                    }
                }, 1000);


                setTimeout(() => {

                    e.target.style.pointerEvents = "";
                    e.target.checked = false;

                    const firstTask = document.querySelector('.task');

                    if (firstTask) {
                        firstTask.click();
                    } else if (firstTask == null) {
                        this.$store.state.home.showDetails = false;
                    }
                }, 1100);

            } else if (this.openedTasks !== this.$store.state.home.tasks) {
                setTimeout(() => {
                    for (let key of this.$store.state.home.tasksLists[this.i]) {
                        if (key.name == openedElem.querySelector('.task-title').textContent) {

                            this.$store.state.home.tasksLists[this.i][1].push(key); /**Пушим в completeds */

                            this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(obj => obj.name !== key.name);
                            this.openedTasks = this.$store.state.home.tasksLists[this.i] = this.$store.state.home.tasksLists[this.i].filter(obj => obj.name !== key.name);
                        }
                    }
                }, 1000);

                setTimeout(() => {

                    e.target.style.pointerEvents = "";
                    e.target.checked = false;

                    const firstTask = document.querySelector('.task');

                    if (firstTask) {
                        firstTask.click();
                    } else if (firstTask == null) {
                        this.$store.state.home.showDetails = false;
                    }
                }, 1100);

            }
        },
        getAllTasks(e) {

            this.$store.state.home.showDetails = false;

            setTimeout(() => {

                if (this.$refs.important.classList.contains('choose') == false) {

                    this.$refs.openTask.classList.remove('home__open-important');
                    this.$refs.tasksChecked.style.display = 'flex';
                    this.$refs.listTitle.textContent = 'Tasks';
                }
            }, 0);

            for (let elem of document.querySelectorAll('.task-list')) {

                elem.classList.remove('choose');
            };
            for (let elem of document.querySelectorAll('.can-choose')) {
                elem.classList.remove('choose');
            };

            if (this.$refs.completed.classList.contains('choosed-tasks')) {
                this.$refs.completed.classList.remove('choosed-tasks');
                this.$refs.toDo.classList.add('choosed-tasks');
            }

            const tasksBlock = e.target.closest('.view-all-tasks');
            tasksBlock.classList.add('choose');
            this.openedTasks = this.$store.state.home.tasks;

        },

        getImportantTasks(e) {

            this.$store.state.home.showDetails = false;

            const openTask = document.querySelector('.home__open-task');
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

            this.$refs.completed.classList.remove('choosed-tasks');

            this.$refs.toDo.classList.add('choosed-tasks');

            const importantBlock = e.target.closest('.important');
            importantBlock.classList.add('choose');
            this.openedTasks = this.$store.state.home.importantTasks;
        },
        getCompletedTasks(e) {

            this.$store.state.home.showDetails = false;

            if (this.openedTasks == this.$store.state.home.tasksLists[this.i]) {
                this.openedTasks = this.$store.state.home.tasksLists[this.i][1];

                this.$refs.toDo.classList.remove('choosed-tasks');

                this.$refs.completed.classList.add('choosed-tasks');

                return
            };

            if (this.openedTasks == this.$store.state.home.tasksLists[this.i]?.[1]) {
                return
            };

            this.openedTasks = this.$store.state.home.completedTasks;

            this.$refs.toDo.classList.remove('choosed-tasks');

            this.$refs.completed.classList.add('choosed-tasks');
        },

        getListTasks(e) {

            this.$store.state.home.showDetails = false;

            setTimeout(() => {

                if (this.$refs.important.classList.contains('choose') == false) {

                    this.$refs.openTask.classList.remove('home__open-important');
                    this.$refs.tasksChecked.style.display = 'flex';
                }
            }, 0);

            for (let key of document.querySelectorAll('.task-list')) {
                for (let key2 of document.querySelectorAll('.can-choose')) {
                    key.classList.remove('choose');
                    key2.classList.remove('choose');
                };
            };

            this.$refs.toDo.classList.add('choosed-tasks');

            this.$refs.completed.classList.remove('choosed-tasks');

            const openedElem = e.target.closest('.task-list');
            openedElem.classList.add('choose');

            let k = 0;

            outer: for (let elem of document.querySelectorAll('.task-list')) {
                if (elem.classList.contains('choose') == false) {
                    k++;
                }
                if (elem.classList.contains('choose')) {

                    this.i = k;
                    k = 0;
                    break outer;
                }

            }
            for (let id of this.$store.state.home.tasksLists) {

                if (id[0] == openedElem.querySelector('.task-list-text').firstElementChild.textContent) {
                    this.openedTasks = [];
                    this.openedTasks = this.$store.state.home.tasksLists[this.i];
                }
            };
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
                }
            };
        },
        renameList(name) {
            this.openedTasks[this.i] = name;
        },
        deleteList(e) {
            let tasks = document.querySelectorAll('.task-list');
            for (let task of tasks) {
                if (task.classList.contains('choose')) {
                    let currentTask = task;

                    for (let j = 2; j < this.$store.state.home.tasksLists[this.i].length; j++) {

                        this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(task => task.name !== this.$store.state.home.tasksLists[this.i][j].name);

                    }

                    this.$store.state.home.tasksLists = this.$store.state.home.tasksLists.filter(task => task[0] !== currentTask.textContent);

                    this.$refs.allTasks.click();
                }
            }
        },

        deleteTask() {
            const taskName = document.querySelector('.home-details__title').querySelector('input').value;
            this.$store.state.home.tasks = this.$store.state.home.tasks.filter(task => task.name !== taskName);
            this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(task => task.name !== taskName);

            for (let j = 2; j < this.$store.state.home.tasksLists[this.i].length; j++) {
                if (this.$store.state.home.tasksLists[this.i][j].name == taskName) {
                    this.$store.state.home.tasksLists[this.i][j] = '0';
                }
            };
            // this.$store.state.home.tasksLists[this.i][2] = '0';

            // this.$store.state.home.tasksLists = this.$store.state.home.tasksLists.filter(task => task[2].name != taskName);

            for (let task of document.querySelectorAll('.task')) {
                if (task.querySelector('.task-title').textContent == taskName) {
                    task.remove();
                }
            }

            this.$store.state.home.showDetails = false;

        },

    },

    computed: {
        filterTasks() {
            if (this.openedTasks == this.$store.state.home.tasksLists[this.i]) {

                const filteredTasks = this.openedTasks.filter(task => typeof task !== 'string' && !Array.isArray(task));

                return filteredTasks.filter(task => task.name.toLowerCase().includes(this.selectedSort.toLowerCase()));
            }
            return this.openedTasks.filter(task => task.name.toLowerCase().includes(this.selectedSort.toLowerCase()));
        }
    },
};
</script>

<style lang="scss" scoped>
.home {

    &__content {
        display: flex;
    }

    &__left-block {
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
    color: #5946D2 !important;
    border-bottom: 1px solid #5946D2 !important;
}

.task {
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

.home-details {
    min-width: 280px;
    max-width: 280px;
    background: white;

    &__content {
        padding: 40px 20px 0px 20px;
    }

    &__title {
        padding-left: 8px;
    }

    &__bottom-content {
        display: flex;
        justify-content: space-between;
        align-items: end;
        height: 200px;

    }
}

.btn-close,
.btn-delete {
    cursor: pointer;
}

.blue-hr {
    background: #5946D2;
    height: 3px;
    width: 240px;
}

.default-hr {
    width: 240px;
    background: rgba(28, 27, 31, 0.12);
}

.home-details-task {
    position: relative;
    display: flex;
    align-items: center;
}

.home-details-task span:first-child {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #5946D2;
}

.home-details-task span:last-child {
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.5px;
    color: #1C1B1F;

}

.home-details-is-important {
    position: absolute;
    right: 0;
}

input[type="date"] {
    margin-top: 12px;
    margin-bottom: 12px;
    position: relative;
    border: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0px;
    top: 1px;
    overflow: visible;
    background-image: url('@/../public/img/icon-choose-date.png');
}

input::-webkit-datetime-edit {
    padding-left: 20px;
    color: #5946D2;
}

.home-details-note {
    padding-top: 12px;
}

.note {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #1C1B1F;
}

.created {
    padding-bottom: 7px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.4px;
    color: rgba(28, 27, 31, 0.6);
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
</style>