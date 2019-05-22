document.addEventListener('DOMContentLoaded', function () {
    var solutionMatrix=[[0,1,1,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0]]
    var inGameMatrix=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    var count=0;
    var squares = document.getElementsByClassName("square")
    

    var startPaint = function(event){
        count++;
        event.target.style.backgroundColor="pink";
        var cell = event.target.id
        var row = parseInt(cell[0,1]-2)
        var col = parseInt(cell[2,3]-2)
        inGameMatrix[row][col]=1
        event.target.addEventListener("mousedown",startUnpaint);
        event.target.removeEventListener("mousedown",startPaint)
        window.addEventListener("mouseup",stopPaint);//mouseup should only happen in the squares 
        for(el of squares){
            el.addEventListener("mouseover",paint);   
        }
           
    }
    var startUnpaint = function(event){
        count--;
        event.target.style.backgroundColor="white";
        var cell = event.target.id
        var row = parseInt(cell[0,1]-2)
        var col = parseInt(cell[2,3]-2)
        inGameMatrix[row][col]=0
        event.target.addEventListener("mousedown",startPaint);
        event.target.removeEventListener("mousedown",startUnpaint)
        window.addEventListener("mouseup",stopUnpaint);//mouseup should only happen in the squares 
        for(el of squares){
            el.addEventListener("mouseover",unpaint);   
        }
           
    }

    function paint(){//paint is working. while mouse is down it can be dragged to other squares to paint them
        if(event.target.style.backgroundColor!="pink" && event.target.classList.contains("square")){
            count++;
            var cell = event.target.id
            var row = cell[0,1]-2
            var col = cell[2,3]-2
            inGameMatrix[row][col]=1
            event.target.style.backgroundColor="pink";
            event.target.addEventListener("mousedown",startUnpaint);
            event.target.removeEventListener("mousedown",startPaint);
        }
        
        
    }
    function unpaint(){
        if(event.target.style.backgroundColor=="pink" && event.target.classList.contains("square")){
            count--;
            var cell = event.target.id
            var row = parseInt(cell[0,1]-2)
            var col = parseInt(cell[2,3]-2)
            inGameMatrix[row][col]=0
            event.target.style.backgroundColor="white";
            event.target.addEventListener("mousedown",startPaint);
            event.target.removeEventListener("mousedown",startUnpaint);
        }
        
        
    }

    function stopPaint(){//stop paint is working. when mouse is up it will stop painting.
        for(el of squares){
            el.removeEventListener("mouseover",paint)
        }
        if(count==17){
            compareToSolution();
        }
        window.removeEventListener("mouseup",stopPaint)
    }
    
    function stopUnpaint(){
        for(el of squares){
            el.removeEventListener("mouseover",unpaint)
        }
        if(count==17){
            compareToSolution();
        }
        window.removeEventListener("mouseup",stopUnpaint)
    }
    
    var gridClear = function(){
        var myCollection = document.getElementsByClassName("square");
        for(var el of myCollection){
            el.style.backgroundColor="white";
        }
    }

    function compareToSolution(){
        for(var i=0;i<solutionMatrix.length;i++){
            for(var j=0;j<solutionMatrix.length;j++){
                if (solutionMatrix[i][j] != inGameMatrix[i][j]){
                    return;
                }
            }
        }
        alert("good job")
    }
    for(el of squares){
        el.addEventListener("mousedown",startPaint);
    }
})