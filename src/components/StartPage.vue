<template>
    <div class="start-page">
        <div class="start-page__container">
            <div class="start-page__content">
                <div class="start-page__block">
                    <div class="start-page__body">
                        <div class="start-page__logo">
                            <img src="img/logoPlatform.png" alt="">
                        </div>
                        <h1 class="start-page__title">Welcome to<br>
                            Uno To Do!</h1>
                        <span class="start-page__sub-title">Start using the best to-do app, you can<br>
                            create and manage your To Do lists to<br> improve your organization.</span>
                        <a href="#" class="get-started">Get started</a>
                    </div>
                </div>
                <div class="start-page__img">
                    <img src="img/.LogoUnoMD.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.start-page {
    width: 100%;
    height: 100%;
    background: rgba(89, 70, 210, 0.08);

    &__container {
        max-width: 100%;
    }

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__block {
        padding: 0px 15px;
        background-color: white;
        width: 450px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__title {
        padding-top: 100px;
        font-size: 57px;
        line-height: 64px;
        letter-spacing: -0.25px;
        color: #1C1B1F;

    }

    &__sub-title {
        display: block;
        padding-top: 16px;
        font-weight: 500;
        line-height: 24px;
        color: #5835E5;

    }

    &__img img {
        height: 99vh;
    }
}

.get-started {
    border-radius: 20px;
    color: black;
    padding: 15px 20px;
    text-transform: uppercase;
    width: 320px;
    text-decoration: none;
    text-align: center;
    margin: 30px 0;
    display: block;
    background-image: linear-gradient(to left, transparent, transparent 50%, #5946D2 50%, #5946D2);
    background-position: 100% 0;
    background-size: 200% 100%;
    transition: all .25s ease-in;
    font: 400 18px tahoma;
    border: 1px solid #5946D2;
}

.get-started:hover {
    background-position: 0 0;
    color: #fff;
}

@media (max-width:963px) {
    .start-page__img img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
        z-index: 2;
    }

    .start-page__block {
        width: 100%;
        opacity: 0.8;
        z-index: 3;
    }

    .start-page__title {
        color: black;
    }

    .start-page__sub-title {
        padding-top: 25px;
    }
}

@media (max-width:500px) {
    .start-page__block {
        text-align: center;
    }

    .get-started {
        width: 320px;
    }
}
</style>
