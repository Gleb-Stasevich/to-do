<template>
    <div class="home">
        <div class="home__container">
            <div class="home__content">
                <div class="home__left-block">
                    <my-input></my-input>
                    <div class="home__tasks-list">
                        <div class="important">
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
                        <div class="view-all-tasks">
                            <div class="view-all-tasks-icon">
                                <img src="img/icon-home.png" alt="">
                            </div>
                            <div class="view-all-tasks-text">
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
                            <div class="task-list choose">
                                <div class="task-list-icon">
                                    <img src="img/icon-more.png" alt="">
                                </div>
                                <div class="task-list-text">
                                    <span>Task List</span>
                                </div>
                                <div class="task-list-all">
                                    <img src="img/chevron_right.png" alt="">
                                </div>
                            </div>

                            <div class="task-list">
                                <div class="task-list-icon">
                                    <img src="img/icon-more.png" alt="">
                                </div>
                                <div class="task-list-text">
                                    <span>House List</span>
                                </div>
                                <div class="task-list-all">
                                    <img src="img/chevron_right.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home__open-task">
                    <div class="open-task__container">
                        <div class="open-task__content">
                            <div class="list-controls">
                                <div class="list-title">
                                    <span>Task List</span>
                                </div>
                                <div class="list-btns">
                                    <a href=""><img src="img/icon-edit.png" alt=""></a>
                                    <a href=""><img src="img/icon-delete.png" alt=""></a>
                                </div>
                            </div>

                            <div class="tasks-checked">
                                <div class="to-do">
                                    <span><a href="">To Do</a></span>
                                </div>
                                <div class="completed">
                                    <span><a href="">Completed</a></span>
                                </div>
                            </div>
                            <div class="open-tasks">

                                <div class="task">
                                    <div class="task-left-part">
                                        <my-checkbox></my-checkbox>
                                        <div class="task-description">
                                            <span class="task-title">Task Name</span>
                                            <br>
                                            <span class="task-date">Today - Note</span>
                                        </div>
                                    </div>
                                    <div class="task-is-important">
                                        <img src="img/star_rate.png" alt="">
                                    </div>
                                </div>

                                <div class="task">
                                    <div class="task-left-part">
                                        <my-checkbox></my-checkbox>
                                        <div class="task-description">
                                            <span class="task-title">Task Name</span>
                                            <br>
                                            <span class="task-date">Today - Note</span>
                                        </div>
                                    </div>
                                    <div class="task-is-important">
                                        <img src="img/icon-star-no-import.png" alt="">
                                    </div>
                                </div>

                                <div class="task">
                                    <div class="task-left-part">
                                        <my-checkbox></my-checkbox>
                                        <div class="task-description">
                                            <span class="task-title">Task Name</span>
                                            <br>
                                            <span class="task-date">Today - Note</span>
                                        </div>
                                    </div>
                                    <div class="task-is-important">
                                        <img src="img/icon-star-no-import.png" alt="">
                                    </div>
                                </div>

                                <div class="task">
                                    <div class="task-left-part">
                                        <my-checkbox></my-checkbox>
                                        <div class="task-description">
                                            <span class="task-title">Task Name</span>
                                            <br>
                                            <span class="task-date date">Wed, 30 Mar</span>
                                        </div>
                                    </div>
                                    <div class="task-is-important">
                                        <img src="img/icon-star-no-import.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="home-details">
                    <div class="home-details__content">
                        <div class="home-details__top-content">
                            <div class="home-details-task">
                                <my-checkbox></my-checkbox>
                                <div class="home-details__title">
                                    <span>Task Name</span>
                                    <br>
                                    <span>Task Name</span>
                                </div>
                                <div class="home-details-is-important">
                                    <img src="img/star_rate.png" alt="">
                                </div>
                            </div>
                            <hr class="blue-hr">
                            <br>
                            <hr class="default-hr">
                            <div class="home-details-date">
                                <input type="date">
                            </div>
                            <hr class="default-hr">
                            <div class="home-details-note">
                                <span class="note">Note</span>
                                <br>
                                <span class="description">Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    1500s.</span>
                                <hr class="default-hr">
                            </div>
                        </div>
                        <div class="home-details__bottom-content">
                            <div class="btn-close">
                                <img src="img/chevron_right.png" alt="">
                            </div>
                            <div class="created">
                                <span>Created Mon, 28 Mar</span>
                            </div>
                            <div class="btn-delete">
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

.open-task {

    &__container {
        max-width: 100%;
    }

    &__content {
        padding-top: 28px;
    }
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

.to-do span a {
    margin-left: 20px;
    color: #5946D2;
    border-bottom: 1px solid #5946D2;
}

.task {
    background-color: white;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
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
        height: 300px;

    }
}

.blue-hr {
    background: #5946D2;
    height: 3px;
    width: 120px;
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

.description {
    display: block;
    padding-bottom: 12px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.5px;
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
</style>