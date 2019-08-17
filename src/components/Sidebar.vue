<template>
    <header @click.stop>
        <div class="controller">
            <svg class="icon" :class="{open: open}" @click="open = !open">
                <use xlink:href="#icon-open"></use>
            </svg>
        </div>
        <div class="bar" :class="{open: open}">
            <div class="width">
                <span>大小：</span>
                <el-slider class="slider" input-size="mini" :value="lineWidth" :min="4" :max="48" @input="setLineWidth"></el-slider>
            </div>
            <div class="color">
                <span>颜色：</span>
                <el-color-picker class="picker" size="small" show-alpha :predefine="predefineColors" :value="color" @change="setColor"></el-color-picker>
            </div>
            <div class="back">
                <span>撤销：</span>
                <svg class="icon" @click="$parent.back">
                    <use xlink:href="#icon-back"></use>
                </svg>
            </div>
            <div class="back">
                <span>清除：</span>
                <svg class="icon" @click="setClean">
                    <use xlink:href="#icon-clear"></use>
                </svg>
            </div>
            <div class="save">
                <span>保存：</span>
                <svg class="icon" @click="savePng">
                    <use xlink:href="#icon-save"></use>
                </svg>
            </div>
            <div class="play">
                <span>播放：</span>
                <svg class="icon" @click="animation">
                    <use xlink:href="#icon-play"></use>
                </svg>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                predefineColors: [
                    '#fff',
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    'hsla(209, 100%, 56%, 0.73)',
                    '#c7158577'
                ]
            }
        },
        computed: {
            lineWidth() {
                return this.$parent.lineWidth
            },
            color() {
                return this.$parent.color
            }
        },
        mounted() {
            this.canvas = document.getElementById('myCanvas')
            this.context = this.canvas.getContext('2d')
        },
        methods: {
            setLineWidth(e) {
                this.$bus.$emit('setLineWidth', e)
            },
            setColor(e) {
                this.$bus.$emit('setColor', e)
            },
            setClean() {
                this.$bus.$emit('setClean')
            },
            savePng() {
                let newA = document.createElement('a')
                newA.href = this.canvas.toDataURL('image/png')
                let ua = window.navigator.userAgent.toLowerCase()
                if (ua.match(/iphone|android|ipad/)) {
                    newA.target = '_blank'
                } else {
                    newA.download = 'myCanvas'
                }
                newA.click()
            },
            animation() {
                let array = this.$parent.stack.reduce((reducer, value) => {
                    return reducer.concat(value)
                })
                let maxLength = array.length
                let length = 2
                let draw = () => {
                    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                    if (length <= maxLength) {
                        for (let i = 0; i < length; i++) {
                            let value = array[i]
                            if (value.width) {
                                this.context.lineWidth = value.width
                                this.context.strokeStyle = value.style
                            } else {
                                if (array[i - 1].width) {
                                    // 第一个点
                                    this.context.beginPath()
                                    this.context.moveTo(value.x, value.y)
                                    this.context.lineTo(value.x, value.y)
                                } else {
                                    let x1 = array[i - 1].x, y1 = array[i - 1].y, x2 = value.x, y2 = value.y
                                    let x3 = x1 / 2 + x2 / 2, y3 = y1 / 2 + y2 / 2
                                    this.context.quadraticCurveTo(x1, y1, x3, y3)
                                }
                                if ((i === length - 1) || array[i + 1].width) {
                                    // 最后一个点
                                    this.context.lineTo(value.x, value.y)
                                    this.context.stroke()
                                }
                            }
                        }
                    }
                    length += 1
                    if (length > maxLength) {
                        cancelAnimationFrame(raf)
                        return
                    }
                    if (this.$parent.drawing) {
                        cancelAnimationFrame(raf)
                        this.$parent.drawLine()
                        return
                    }
                    requestAnimationFrame(draw)
                }
                let raf = requestAnimationFrame(draw)
            }
        }
    }
</script>

<style lang="scss">
    .icon {
        display: flex;justify-content: center;align-items: center;
        width: 32px;height: 32px;
        overflow: hidden;
        cursor: pointer;
        fill: #666;
        transition: fill .2s linear;
    }
    .icon.open {
        fill: #d4237a;
        transition: fill .2s linear;
    }
    header {
        .controller {
            position: fixed;top: 0;left: 0;z-index: 10;
            margin: 16px 0 0 16px;
        }
        .bar {
            position: fixed;top: 64px;left: 0;
            padding-left: 16px;
            color: #666;background: #fff;
            box-shadow: 0 0 10px 2px #aaa;
            transform: translateX(-110%);
            transition: transform .2s linear;
            div {
                display: flex;align-items: center;
            }
            .width {
                .slider {width: 80px;margin-right: 8px;}
            }
            .color {
                padding: 3px 0;
            }
            .back {
                padding: 3px 0;
            }
            .clean {
                padding: 3px 0;
            }
            .save {
                padding: 3px 0;
            }
            .play {
                padding: 3px 0;
            }
        }
        .bar.open {
            transform: translateX(0);
            transition: transform .2s linear;
        }
    }
</style>