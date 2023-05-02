<template>
    <div id="app-cover">
        <div class="row">
            <div class="toggle-button-cover">
                <div class="button-cover">
                    <div class="button r" id="button-1">
                        <input @click="changeMode" type="checkbox" class="checkbox" />
                        <div class="knobs"></div>
                        <div class="layer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'my-top-checkbox',

    methods: {

        ...mapMutations({
            setMode: 'home/setMode',
        }),

        changeMode() {
            if (this.mode == 'light') {
                this.setMode('dark');
                this.$emit('changeMode', 'dark');
                this.$store.state.home.mode = 'dark';
            } else if (this.mode == 'dark') {
                this.setMode('light');
                this.$emit('changeMode', 'light');

            }
        }
    },
    computed: {
        ...mapState({
            mode: state => state.home.mode,
        }),
    },
};

</script>

<style lang="scss" scoped>
.app-cover {
    position: absolute;
}

.row {
    display: table-row;
}

.toggle-button-cover {
    position: absolute;
    top: 90px;
    left: 20px;
    box-sizing: border-box;
}

.button-cover {
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 10px 20px -8px #c5d6d6;
    border-radius: 4px;
}

.button-cover,
.knobs,
.layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 36px;
    margin: -50px auto 0 auto;
    overflow: hidden;
}

.button.r,
.button.r .layer {
    border-radius: 100px;
}

.button.b2 {
    border-radius: 2px;
}

.checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
}

.knobs {
    z-index: 2;
}

.layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
}

/* Button 1 */
#button-1 .knobs:before {
    content: "L";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #03a9f4;
    border-radius: 50%;
    transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

#button-1 .checkbox:checked+.knobs:before {
    content: "D";
    left: 42px;
    background-color: #f44336;
}

#button-1 .checkbox:checked~.layer {
    background-color: #fcebeb;
}

#button-1 .knobs,
#button-1 .knobs:before,
#button-1 .layer {
    transition: 0.3s ease all;
}
</style>