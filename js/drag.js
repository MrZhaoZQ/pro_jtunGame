var flag = false;	//是否按下鼠标的标记
var cur = {			//记录鼠标按下时的坐标
    x:0,
    y:0
}
var nx,ny,dx,dy,x,y ;
//鼠标按下时的函数
function down(){
    flag = true;
    var touch ;
    if(event.touches){
        touch = event.touches[0];
    }else{
        touch = event;
    }
    cur.x = touch.clientX;		//记录当前鼠标的x坐标
    cur.y = touch.clientY;		//记录当前鼠标的y坐标
	dx = moveDom.offsetLeft;		//记录div当时的左偏移量
    dy = moveDom.offsetTop;		//记录div当时的上偏移量
}
//鼠标移动时的函数
function move(){
    if(flag){					//如果是鼠标按下则继续执行
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        nx = touch.clientX - cur.x;		//记录鼠标在x轴移动的数据
        ny = touch.clientY - cur.y;		//记录鼠标在y轴移动的数据
        x = dx+nx;		//div在x轴的偏移量加上鼠标在x轴移动的距离
        y = dy+ny;		//div在x轴的偏移量加上鼠标在x轴移动的距离
        x>0?x=0:x;
        x<-screenW*3?x=-screenW*3:x;	//限制左右拖动的范围
        moveDom.style.left = x +"px";
        //moveDom.style.top = y +"px";		//上下不能拖动
        
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove",function(e){
        	if(e.target.id != "move"){
        		event.preventDefault();
        	}
        },false);
    }
}
//鼠标释放时候的函数
function end(){
    flag = false;
}


function drag(){
    var isMove = false;
    var tx, x, ty, y;
    //滑动开始事件  
    function touchStart(e){
        isMove = true;
        e.preventDefault();
        tx = parseInt($("#move").css('left'));
        x = e.touches[0].pageX;
    }
    function touchMove(e){
        if (isMove) {
            //e.preventDefault();
            var n = tx + e.touches[0].pageX - x;
			n>0?n=0:n;
			n<-screenW*3?n=-screenW*3:n;	//限制左右拖动的范围
            $("#move").css("left", n).siblings(".bottom").css("left", n);
        }
    }
    document.getElementById("move").addEventListener('touchstart', touchStart);
    document.getElementById("move").addEventListener('touchmove', touchMove);
    document.getElementById("move").addEventListener('touchend', function (){
        isMove = false;
    });
}