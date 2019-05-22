var puzzleObj=fetch("https://raw.githubusercontent.com/katieberg/Painting-Game/master/Puzzles.json")
  .then(response => response.json())
  .then(function(json){  
    return json;
  });

document.addEventListener('DOMContentLoaded', function () {//one issue occurs normally on the first time you try to do unpaint because the mouse is selecting items as it is painting.
    var solutionMatrix=[[0,1,0,1,0],[1,1,1,1,1],[1,1,1,1,1],[0,1,1,1,0],[0,0,1,0,0]]//could do different colors for each puzzle
    var solutionCount=0;
    for(arr of solutionMatrix){//sets solutionCount to the number of painted cells so we can know when to check if the solution is correct.
        for(el of arr){
            if(el==1)
                solutionCount++;
        }
    }
    puzzleObj.then(data => console.log(data))

    var inGameMatrix=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]//always all zeros when game begins
    var paintedCount=0;//number of painted cells - none so far
    var squares = document.getElementsByClassName("square")//array of all the paintable cells
    var columnHints = document.getElementsByClassName("speshSquareCol")
    for(el of columnHints){
        el.childNodes[0].innerHTML=el.childNodes[0].innerHTML
        
    }//this is how we have to make this work BUT i think we can use a function to do this so we can have a local count to iterate over the JSON array.

    var startPaint = function(event){
        paintedCount++;
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
        paintedCount--;
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
            paintedCount++;
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
            paintedCount--;
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
        if(paintedCount==solutionCount){
            compareToSolution();
        }
        window.removeEventListener("mouseup",stopPaint)
    }
    
    function stopUnpaint(){
        for(el of squares){
            el.removeEventListener("mouseover",unpaint)
        }
        if(paintedCount==solutionCount){
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