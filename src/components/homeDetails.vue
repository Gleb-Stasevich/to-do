<template>
    <!--
        Отрисовыевает блок редактирования таска
    -->
    <div ref="homeDetails" v-show="this.showDetails == true" class="home-details">
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
                        <img @click="changeImportant" class="important-icon" src="img/star_rate.png" alt="">
                    </div>
                </div>
                <hr v-if="this.mode == 'light'" class="blue-hr">
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
                <div @click="closeDetails" class="btn-close">
                    <img v-if="this.mode == 'light'" src="img/chevron_right.png" alt="">
                    <img v-else src="img/chevron_right-dark.png" alt="">
                </div>
                <div class="created" :class="{
                        'white': this.mode == 'dark'
                    }">
                    <span></span>
                </div>
                <div @click="deleteTask" class="btn-delete">
                    <img v-if="this.mode == 'light'" src="img/icon-delete-grey.png" alt="">
                    <img class="delete-icon-white" v-else src="img/icon-delete-white.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { Ref } from 'vue';
export default {

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

    },

    methods: {

        ...mapMutations({
            pushTasks: 'home/pushTasks',
            pushImportantTasks: 'home/pushImportantTasks',
            pushCompletedTasks: 'home/pushCompletedTasks',
            setShowDetails: 'home/setShowDetails',
        }),

        changeName(e) {

            let openedElem = document.querySelector('.open');
            let inputValue = e.target.value;
            if (this.openedTasks == this.importantTasks || this.openedTasks == this.tasks) {
                for (let key of this.importantTasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        /** 
                         * Проверяем, содержится ли такой же таск в общих тасках
                         *  (необходимо для нормальной работы localStorage)
                         * */
                        let taskInTasks = this.tasks.find(task => task.name === key.name);
                        key.name = inputValue;
                        if (taskInTasks) {
                            taskInTasks.name = inputValue;
                        };
                        return;
                    }
                }
            }
            else if (this.openedTasks !== this.tasks) {
                for (let key of this.tasksLists[this.i]) {
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
            if (this.openedTasks == this.importantTasks || this.openedTasks == this.tasks) {
                for (let key of this.importantTasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {

                        let taskInTasks = this.tasks.find(task => task.name === key.name);
                        key.text = inputValue;
                        if (taskInTasks) {
                            taskInTasks.text = inputValue;
                            return;
                        };
                    }
                }
            } else if (this.openedTasks !== this.tasks) {
                for (let key of this.tasksLists[this.i]) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        key.text = inputValue;
                        return;
                    }
                }
            };
        },

        changeDate(e) {
            let openedElem = document.querySelector('.open');
            let openDate = e.target.value;
            let normalDate = openDate.split('-').reverse().join('-');
            if (this.openedTasks == this.importantTasks || this.openedTasks == this.tasks) {
                for (let key of this.importantTasks) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {

                        let taskInTasks = this.tasks.find(task => task.name === key.name);
                        key.date = normalDate;
                        if (taskInTasks) {
                            taskInTasks.date = normalDate;
                            return;
                        };
                    }
                }
            } else if (this.openedTasks !== this.tasks) {
                for (let key of this.tasksLists[this.i]) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        key.date = normalDate;
                        return;
                    }
                }
            };
        },

        changeImportant(e) {
            let openedElem = document.querySelector('.open');

            let vueTask = null;

            /**
             * Проверяем, где именно мы хотим изменить important
             * если он имеется в tasks либо в importantTasks, приравниваем vueTask = key
             *  если там не находим нашего обьекта, то ищем его в tasksLists
             * 
             */

            for (let key of this.tasks) {
                if (key.name == openedElem.querySelector('.task-title').textContent) {
                    vueTask = key;
                }
            };
            if (vueTask == null) {
                let count = openedElem.querySelector('.task-counter').textContent;
                for (let key of this.tasksLists[count]) {
                    if (key.name == openedElem.querySelector('.task-title').textContent) {
                        vueTask = key;
                    }
                }
                count = 0;
            }

            if (vueTask.important == 'no') {
                e.target.src = require('@/../public/img/star_rate.png');
                vueTask.important = 'yes';

                if (this.openedTasks !== this.importantTasks) {
                    this.pushImportantTasks(vueTask);
                    localStorage.setItem('importantTasks', JSON.stringify(this.importantTasks));
                    localStorage.setItem('tasksLists', JSON.stringify(this.tasksLists));
                };

            } else if (vueTask.important == 'yes') {

                if (this.openedTasks == this.importantTasks) {

                    for (let elem of document.querySelectorAll('.task')) {
                        if (elem.classList.contains('open')) {
                            this.setShowDetails(false);
                            this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(task => task.name !== vueTask.name);
                        }
                    }
                }

                e.target.src = require('@/../public/img/icon-star-no-import.png');
                vueTask.important = 'no';

                this.filterimportantTasks(vueTask.name);
                if (document.querySelector('.can-choose').classList.contains('choose')) {
                    this.updateOpenedTasks(this.importantTasks);
                }
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
                localStorage.setItem('importantTasks', JSON.stringify(this.importantTasks));
                localStorage.setItem('tasksLists', JSON.stringify(this.tasksLists));
            }
        },

        changeCheckbox(e) {

            /**
             * Проверяем, где наш таск находится ( в tasks, в important либо в tasksLists)
             * Если он лежит в tasksLists, то пушим в completed и (если есть) удаляем его из important
             * Если он лежит в tasks и (если есть) в important, то пушим в completed и удаляем его
             * из tasks и important
             * Показываем задержку перед удалением
             */

            let openedElem = document.querySelector('.open');
            let checkbox = openedElem.querySelector('.task-left-part').firstElementChild;

            if (e.target.checked) {
                checkbox.checked = true;
                checkbox.setAttribute('disabled', '');
                e.target.style.pointerEvents = "none";
            }
            if (this.openedTasks == this.importantTasks || this.openedTasks == this.tasks) {
                if (openedElem.querySelector('.task-counter').textContent) {

                    let count = openedElem.querySelector('.task-counter').textContent;

                    for (let keyTask of this.tasksLists[count]) {
                        if (keyTask.name == openedElem.querySelector('.task-title').textContent) {
                            setTimeout(() => {

                                if (keyTask.name == openedElem.querySelector('.task-title').textContent) {

                                    this.$store.state.home.tasksLists[count][1].push(keyTask);

                                    this.filterimportantTasks(keyTask.name);

                                    this.$store.state.home.tasksLists[count] = this.$store.state.home.tasksLists[count].filter(obj => obj.name !== keyTask.name);

                                    if (document.querySelector('.important').classList.contains('choose')) {

                                        this.updateOpenedTasks(this.importantTasks);
                                    } else {
                                        this.updateOpenedTasks(this.tasks);
                                    }

                                }
                            }, 1000);

                            this.openCheckbox(e);

                            return
                        }
                    }
                } else {
                    setTimeout(() => {
                        for (let key of this.openedTasks) {
                            if (key.name == openedElem.querySelector('.task-title').textContent) {

                                this.pushCompletedTasks(key);
                                /**
                                 * Обращаемся напрямую, т.к. в случае если this.mode меняется при открытом правом блоке, 
                                 * то filterAllTasks и filterCompletedTasks сработают не так как ожидается,
                                 * чтобы ме писать отдельные фильтры для mode = light и mode = dark,
                                 * меняем store здесь
                                 */
                                this.$store.state.home.tasks = this.$store.state.home.tasks.filter(key => key.name !== openedElem.querySelector('.task-title').textContent);
                                this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(key => key.name !== openedElem.querySelector('.task-title').textContent);

                                if (document.querySelector('.important').classList.contains('choose')) {
                                    this.updateOpenedTasks(this.importantTasks);
                                } else {
                                    this.updateOpenedTasks(this.tasks);
                                }

                            }
                        }
                    }, 1000);

                    this.openCheckbox(e);

                }
            } else if (this.openedTasks !== this.tasks) {
                setTimeout(() => {
                    for (let key of this.tasksLists[this.i]) {
                        if (key.name == openedElem.querySelector('.task-title').textContent) {

                            this.$store.state.home.tasksLists[this.i][1].push(key); /**Пушим в completeds */

                            this.$store.state.home.importantTasks = this.$store.state.home.importantTasks.filter(key => key.name !== openedElem.querySelector('.task-title').textContent);
                            this.$store.state.home.tasksLists[this.i] = this.$store.state.home.tasksLists[this.i].filter(obj => obj.name !== key.name);

                            this.updateOpenedTasks(this.tasksLists[this.i]);
                        }
                    }
                }, 1000);

                this.openCheckbox(e);

            }
        },

        openCheckbox(e) {

            /**
             * Открывает доступ к нажатию на checkbox и выбирает первый таск из списка
             */

            setTimeout(() => {

                e.target.style.pointerEvents = "";
                e.target.checked = false;

                const firstTask = document.querySelector('.task');

                if (firstTask) {
                    firstTask.click();
                } else if (firstTask == null) {
                    this.setShowDetails(false);

                }
                if (window.innerWidth <= 980) {
                    document.querySelector('.open').style.display = 'block';
                };
            }, 1100);

        },

        updateOpenedTasks(update) {
            this.$emit('updateOpenedTasks', update);
        },

        deleteTask() {
            let openedTasks = null;
            const taskName = document.querySelector('.home-details__title').querySelector('input').value;
            const listTitle = document.querySelector('.my-list-tittle').textContent;

            this.filterAllTasks(taskName);
            this.filterimportantTasks(taskName);

            for (let j = 2; j < this.tasksLists[this.i]?.length; j++) {
                if (this.tasksLists[this.i][j].name == taskName) {
                    this.$store.state.home.tasksLists[this.i][j] = '0'; /** удаляем наш таск (в масив он не попадет(проверка в computed свойтве компонента Home)) */
                }
            };

            for (let task of document.querySelectorAll('.task')) {
                if (task.querySelector('.task-title').textContent == taskName) {
                    task.remove();
                }
            }

            if (listTitle == 'Tasks') {
                this.updateOpenedTasks(this.tasks)
            } else if (listTitle == 'Important') {
                this.updateOpenedTasks(this.importantTasks)
            } else {
                this.updateOpenedTasks(this.tasksLists[this.i]);
            }


            this.setShowDetails(false);

            document.querySelector('.home__open-task').style.display = 'block';
        },
        closeDetails() {
            document.querySelector('.home__open-task').style.display = 'block';
            this.setShowDetails(false);
        },


    },

    watch: {
        getMode(value) {

            let openedElem = null;
            /**
             * делаем здесь цикл, т.к. при добавлении класса теряем класс open, соответственно не сможем менять данные 
            */
            let inputValue = document.querySelector('.home-details__title').querySelector('input').value;
            for (let elem of document.querySelectorAll('.task')) {
                if (elem.querySelector('.task-title').textContent == inputValue) {
                    openedElem = elem;
                }
            }

            if (value == 'dark') {
                this.$refs.homeDetails.classList.add('dark-background');
                if (openedElem !== null) {
                    openedElem.classList.add('open');
                }
            } else {
                this.$refs.homeDetails.classList.remove('dark-background');
                if (openedElem !== null) {
                    openedElem.classList.add('open');
                }
            }
        },
    },

    computed: {
        ...mapState({
            tasks: state => state.home.tasks,
            importantTasks: state => state.home.importantTasks,
            completedTasks: state => state.home.completedTasks,
            tasksLists: state => state.home.tasksLists,
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

<style scoped lang="scss">
$dark: #201F24;
$darkBlue: #544794;
$white: #E6E1E5;

.dark {
    background: $darkBlue !important;
}

.white {
    color: $white !important;
}

.dark-background {
    background: $dark !important;
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
    border-radius: 5px;
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

.delete-icon-white {}

@media (max-width: 980px) {

    .chevron-left {
        display: block;
    }

    .home__open-task {
        height: 100vh;
    }

    .home-details {
        display: block;
        height: 100vh;
    }

    .home__content {
        background: #009AFF;
    }

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

    .list-title {
        margin-left: 30px;
    }

    .home__open-task {
        display: none;
    }
}

@media (max-width: 980px) {
    .home-details {
        margin: auto;
    }
}
</style>