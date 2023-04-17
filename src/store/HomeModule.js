export const HomeModule = {
    state: () => ({
        tasks: [],
        importantTasks: [],
        tasksLists: [],
        completedTasks: [],
        visibility: false,
        showDetails: false,
        renameList: false,
        deleteList: false,
    }),
    namespaced: true,

}