    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    autoSetCanvasSize(canvas)
    // var lastPoint = {
    //    x: undefined,
    //     y: undefined }
  
    var using = false
    var eraserEnabled = false
    listenToUser(canvas)

    pen.onclick = function(){
        eraserEnabled = false
        pen.classList.add('active')
        eraser.classList.remove('active')
    }
    eraser.onclick = function(){
        eraserEnabled = true
        eraser.classList.add('active')
        pen.classList.remove('active')
    }
    black.onclick = function(){
        context.strokeStyle ='black'
        black.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }
    red.onclick = function(){
        context.strokeStyle ='red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
        yellow.classList.remove('active')
        black.classList.remove('active')
    }
    green.onclick = function(){
        context.strokeStyle ='green'
        green.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
        yellow.classList.remove('active')
        black.classList.remove('active')
    }
    blue.onclick = function(){
        context.strokeStyle ='blue'
        blue.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
        yellow.classList.remove('active')
        black.classList.remove('active')
    }
    yellow.onclick = function(){
        context.strokeStyle ='yellow'
        yellow.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
        black.classList.remove('active')
    } 

    lineWidth = 5
    z = 20
    thin.onclick = function(){
        lineWidth = 5
        z=20
        thin.classList.add('row')
        thick.classList.remove('row')
    }
    thick.onclick = function(){
        lineWidth = 10
        z=50
        thick.classList.add('row')
        thin.classList.remove('row')
    }
    
    clear.onclick = function(){
        context.clearRect(0,0,canvas.width,canvas.height)
    } 
    download.onclick = function(){
        var url = canvas.toDataURL("image/png")
        console.log(url)
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '我的绘画'
        a.target = '_blank'
        a.click()
    }

//***********************************************************************


    function listenToUser(canvas) {
        //特效检测
        if (document.body.ontouchstart !== undefined) { 
            //是触控设备
            canvas.ontouchstart = function (aaa) {

                using = true
                var x = aaa.touches[0].clientX
                var y = aaa.touches[0].clientY
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, z, z)
                } else {

                    lastPoint = { "x": x, "y": y }
                    //drawCircle(x,y,0.1)
                }
            }
            canvas.ontouchmove = function (aaa) {
                if (using) {
                    var x = aaa.touches[0].clientX
                    var y = aaa.touches[0].clientY
                   // if (!using) { return }
                   // console.log(x, y)
                    if (eraserEnabled) {
                        context.clearRect(x - 5, y - 5, z, z)
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
                    context.clearRect(x - 5, y - 5, z, z)
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
                        context.clearRect(x - 5, y - 5, z, z)
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
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.beginPath()
        
        context.moveTo(x1, y1)
        context.lineWidth = lineWidth
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
//at.alicdn.com/t/font_757697_lp5qy5vn2z8.js