var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    autoSetCanvasSize(canvas)

    var eraserEnabled = false
    eraser.onclick = function () {
        eraserEnabled = true
        actions.className = 'actions x'
    }
    brush.onclick = function () {
        eraserEnabled = false
        actions.className = 'actions'
    }


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }



    listenToMouse(canvas)




    function listenToMouse(canvas) {
        //特效检测
        if (document.body.ontouchstart !== undefined) {
            //触控设备
            canvas.ontouchstart = function (aaa) {

                using = true
                var x = aaa.touches[0].clientX
                var y = aaa.touches[0].clientY
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 50, 50)
                } else {

                    lastPoint = { "x": x, "y": y }
                    //drawCircle(x,y,0.1)
                }
            }
            canvas.ontouchmove = function (aaa) {
                if (using) {
                    var x = aaa.touches[0].clientX
                    var y = aaa.touches[0].clientY
                    if (!using) { return }
                    console.log(x, y)
                    if (eraserEnabled) {
                        context.clearRect(x - 5, y - 5, 50, 50)
                    } else {
                        var newPoint = { "x": x, "y": y }
                        //drawCircle(x,y,0.1)
                        drawline(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                        lastPoint = newPoint
                    }
                }
                canvas.onmouseup = function () {
                    using = false
                }
            }
        }
        else {
            canvas.onmousedown = function (aaa) {
                using = true
                var x = aaa.clientX
                var y = aaa.clientY
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 50, 50)
                } else {

                    lastPoint = { "x": x, "y": y }
                    //drawCircle(x,y,0.1)
                }
            }
            canvas.onmousemove = function (aaa) {

                if (using) {
                    var x = aaa.clientX
                    var y = aaa.clientY
                    if (!using) { return }

                    if (eraserEnabled) {
                        context.clearRect(x - 5, y - 5, 50, 50)
                    } else {
                        var newPoint = { "x": x, "y": y }
                        //drawCircle(x,y,0.1)
                        drawline(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                        lastPoint = newPoint
                    }
                }
                canvas.onmouseup = function (aaa) {
                    using = false
                }
            }

        }



    //     function drawCircle(x, y, radius) {
    //     context.beginPath()
    //     context.strokeStyle = 'red'
    //     context.arc(x, y, radius, 0, Math.PI * 2)
    //     context.stroke()}

    function drawline(x1, y1, x2, y2) {

        context.beginPath()
        context.moveTo(x1, y1)
        context.lineWidth = 2
        context.lineTo(x2, y2)
        context.stroke()
        //context.closepath()
    }
}

    function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}