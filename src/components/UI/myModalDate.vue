<template>
    <div class="modal">
        <div class="modal__container">
            <div class="modal__content">
                <div class="modal__block">
                    <div class="modal__title">
                        <span>Add due date</span>
                    </div>
                    <div class="modal__date">
                        <div class="create-date">
                            <div class="create-date-img"><img src="img/icon-choose-modal-date.png" alt=""></div>
                            <div class="create-date-day">
                                <span>Today</span>
                            </div>

                        </div>
                        <div class="create-date">
                            <div class="create-date-img"><img src="img/icon-choose-modal-date.png" alt=""></div>
                            <div class="create-date-day">
                                <span>Tomorrow</span>
                            </div>

                        </div>

                        <div class="create-date">
                            <div class="create-date-img"><img src="img/icon-choose-modal-date.png" alt=""></div>
                            <div class="create-date-day">
                                <span>Next Week</span>
                            </div>

                        </div>

                        <div class="create-date">
                            <div class="create-date-img"><img src="img/icon-choose-modal-date.png" alt=""></div>
                            <div class="create-date-day">
                                <div class="wrapper"><span>Pick a Date</span></div>

                                <div class="wrapper"><img src="img/chevron_right.png"></div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'myModalDate',
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

    &__block {
        width: 310px;
        height: 172px;
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

    &__date {
        padding-left: 32px;
    }
}

.create-date {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
}

.create-date:hover {
    background: rgba(89, 70, 210, 0.08);
}

.create-date-day {
    padding-left: 16px;
}

.create-date-day:last-child {
    display: flex;
    align-items: center;
}

.wrapper img {
    position: absolute;
    right: 15px;
    bottom: 3px;
}
</style>