export const HomeModule = {
    state: () => ({
        tasks: [],
        importantTasks: [],
        tasksLists: [],
        completedTasks: [],
        visibility: false,
        showDetails: false,
        addList: false,
        renameList: false,
        deleteList: false,
        mode: 'light',
    }),
    /** Изменяем store, но не добавляем мутаций и геттеров-функций
     * для свойства tasksLists по причине того, что пришлось бы писать
     *  огромное количество мутаций и геттеров
     * для свойства tasksLists, т.к. это сложный массив и для его изменения
     * пришлось бы передавать различные параметры и методы, которые только
     * увеличат в обьёме этот модуль, например: push (как в массив, так и во внутренний массив 
     * выполняемых на данный момент тасков, или внутренний массив выполненных тасков и др.)
     * 
     * Шпарналка по компонентам: 
     * 
     * taskslists - массив кастомных списков
     * tasksLists[this.i] - текущий список
     * tasksLists[this.i][0] - имя нашего списка
     * tasksLists[this.i][1] - массив выполненных тасков
     * tasksLists[this.i][n >= 2] - таски
     */
    mutations: {
        pushTasks(state, obj) {
            if (obj == null) {
                return
            }
            state.tasks.push(obj);
        },

        pushImportantTasks(state, obj) {
            if (obj == null) {
                return
            }
            state.importantTasks.push(obj);
        },

        pushCompletedTasks(state, obj) {
            if (obj == null) {
                return
            }
            state.completedTasks.push(obj);
        },

        setVisibility(state, visibility) {
            state.visibility = visibility;
        },
        setShowDetails(state, showDetails) {
            state.showDetails = showDetails;
        },

        setAddList(state, addList) {
            state.addList = addList;
        },
        setRenameList(state, boolean) {
            state.renameList = boolean;
        },
        setDeleteList(state, boolean) {
            state.deleteList = boolean;
        },
        setMode(state, mode) {
            state.mode = mode;
        },

        setTasks(state, localStorage) {
            state.tasks = localStorage
        },
        setImportantTasks(state, localStorage) {
            state.importantTasks = localStorage
        },
        setCompletedTasks(state, localStorage) {
            state.completedTasks = localStorage
        },
        setTasksLists(state, localStorage) {
            state.tasksLists = localStorage
        },

        setDefaultTasks(state, arr) {
            state.tasks = arr;
        },
        setDefaultImportantTasks(state, arr) {
            state.importantTasks = arr;
        },
        setDefaultCompletedTasks(state, arr) {
            state.completedTasks = arr;
        },
        setDefaultTasksLists(state, arr) {
            state.tasksLists = arr;
        },

    },
    getters: {

        filterAllTasks: (state) => (id) => {
            return state.tasks = state.tasks.filter(task => task.id !== id)
        },

        filterImportantTasks: (state) => (id) => {
            return state.importantTasks = state.importantTasks.filter(task => task.id !== id)
        },

        filterCompletedTasks: (state) => (id) => {
            return state.completedTasks = state.completedTasks.filter(task => task.id !== id)
        },
    },

    namespaced: true,

}