<template>
    <div>
        <Sidebar></Sidebar>
        <canvas id="myCanvas"></canvas>
    </div>
</template>

<script>
    import Sidebar from './components/Sidebar'

    export default {
        components: {
            Sidebar
        },
        data() {
            return {
                canvas: undefined,
                context: undefined,
                drawing: false,
                myTimeStamp: undefined,
                minTimeDiff: 8, // 值越大 记录的点越少
                minPointDistance: 8,
                lineWidth: 10,
                strokeStyle: 'rgba(0,0,0,0.6)',
                color: 'rgba(0,0,0,0.6)',
                stack: [],
                path: []
            }
        },
        mounted() {
            this.canvas = document.getElementById('myCanvas')
            this.context = this.canvas.getContext('2d')
            this.initCanvas()
            this.initContext()
            this.sideBarListen()
            window.onresize = () => {this.initCanvas()}
            this.canvas.addEventListener('mousedown', this.handleMousedown)
            this.canvas.addEventListener('touchstart', this.handleTouchstart)
        },
        methods: {
            handleMousedown(e) {
                this.drawing = true
                this.myTimeStamp = new Date().getTime()
                let x = e.clientX, y = e.clientY
                this.path.push({"width": this.lineWidth, "style": this.strokeStyle})
                this.path.push({x, y})
                this.stack.push(this.path)
                this.drawLine()
                this.canvas.addEventListener('mousemove', this.handleMousemove)
                this.canvas.addEventListener('mouseup', this.handleMouseup)
            },
            handleMousemove(e) {
                // 类似函数节流 控制笔迹数量
                if ((new Date().getTime() - this.myTimeStamp) < this.minTimeDiff) {
                    return
                }
                let x = e.clientX, y = e.clientY
                // 判断两个点是否太靠近 太近的点不要
                let x0 = this.path[this.path.length - 1].x, y0 = this.path[this.path.length - 1].y
                if (Math.abs(x - x0) < this.minPointDistance && Math.abs(y - y0) < this.minPointDistance) {
                    return
                }
                this.path.push({x, y})
                this.stack.pop()
                this.stack.push(this.path)
                this.drawLine()
                this.myTimeStamp = new Date().getTime()
            },
            handleMouseup() {
                this.drawing = false
                this.path = []
                this.canvas.removeEventListener('mousemove', this.handleMousemove)
                this.canvas.removeEventListener('mouseup', this.handleMouseup)
            },
            handleTouchstart(e){
                e.preventDefault()
                this.drawing = true
                this.myTimeStamp = new Date().getTime()
                let x = e.touches[0].clientX, y = e.touches[0].clientY
                this.path.push({"width": this.lineWidth, "style": this.strokeStyle})
                this.path.push({x, y})
                this.stack.push(this.path)
                this.drawLine()
                this.canvas.addEventListener('touchmove', this.handleTouchmove)
                this.canvas.addEventListener('touchend', this.handleTouchend)
            },
            handleTouchmove(e){
                e.preventDefault()
                // 类似函数节流 控制笔迹数量
                if ((new Date().getTime() - this.myTimeStamp) < this.minTimeDiff) {
                    return
                }
                let x = e.touches[0].clientX, y = e.touches[0].clientY
                // 判断两个点是否太靠近 太近的点不要
                let x0 = this.path[this.path.length - 1].x, y0 = this.path[this.path.length - 1].y
                if (Math.abs(x - x0) < this.minPointDistance && Math.abs(y - y0) < this.minPointDistance) {
                    return
                }
                this.path.push({x, y})
                this.stack.pop()
                this.stack.push(this.path)
                this.drawLine()
                this.myTimeStamp = new Date().getTime()
            },
            handleTouchend(e){
                e.preventDefault()
                this.drawing = false
                this.path = []
                document.removeEventListener('mousemove', this.handleTouchmove)
                document.removeEventListener('mouseup', this.handleTouchend)
            },
            drawLine() {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.stack.forEach((path) => {
                    let length = path.length
                    path.forEach((value, index, array) => {
                        if (index === 0) {
                            // 这条线的样式
                            this.context.lineWidth = value.width
                            this.context.strokeStyle = value.style
                        } else if (index === 1) {
                            // 第一个点
                            this.context.beginPath()
                            this.context.moveTo(value.x, value.y)
                            this.context.lineTo(value.x, value.y)
                        } else {
                            // 贝塞尔优化
                            let x1 = array[index - 1].x, y1 = array[index - 1].y, x2 = value.x, y2 = value.y
                            let x3 = x1 / 2 + x2 / 2, y3 = y1 / 2 + y2 / 2
                            this.context.quadraticCurveTo(x1, y1, x3, y3)
                        }
                        if (index === length - 1) {
                            this.context.lineTo(value.x, value.y)
                            this.context.stroke()
                        }
                    })
                })
            },
            initCanvas() {
                this.canvas.width = document.documentElement.clientWidth
                this.canvas.height = document.documentElement.clientHeight
            },
            initContext() {
                this.context.lineCap = 'round'
                this.context.lineJoin = 'round'
            },
            back(){
                this.stack.pop()
                this.drawLine()
            },
            sideBarListen() {
                this.$bus.$on('setLineWidth', e => {
                    this.lineWidth = e
                    this.strokeStyle = this.color
                })
                this.$bus.$on('setColor', e => {
                    this.color = e
                    this.strokeStyle = this.color
                })
                this.$bus.$on('setClean', e => {
                    this.stack = []
                    this.context.clearRect(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight)
                })
            }
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;padding: 0;
        position: relative;
        overflow: hidden;
    }
    canvas {
        cursor: crosshair;
    }
</style>
