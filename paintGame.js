var puzzleObj=fetch("https://raw.githubusercontent.com/katieberg/Painting-Game/master/Puzzles.json")
  .then(response => response.json())
  .then(function(json){  
    return json;
  });

document.addEventListener('DOMContentLoaded', function () {//one issue occurs normally on the first time you try to do unpaint because the mouse is selecting items as it is painting.
    var puzzleID="Puzzle-1"
    var squares = document.getElementsByClassName("square")//array of all the paintable cells
    var columnHints = document.getElementsByClassName("speshSquareCol")
    var rowHints = document.getElementsByClassName("speshSquareRow")
    var countHTML=document.querySelector("#count")
    var firstPuzzle=true;
    document.querySelector("#Puzzle-1").addEventListener("click",newPuzzle)
    document.querySelector("#Puzzle-2").addEventListener("click",newPuzzle)
    document.querySelector("#Puzzle-3").addEventListener("click",newPuzzle)
    document.querySelector("#Puzzle-4").addEventListener("click",newPuzzle)
    document.querySelector("#Puzzle-5").addEventListener("click",newPuzzle)
    function newPuzzle(){
        puzzleID=this.id;
        loadPuzzle()
    }
    loadPuzzle()
    function loadPuzzle(){
        for(el of squares){
            el.style.backgroundColor="white"
        }

        puzzleObj.then(function(data){
            solutionCount=0;
            var solMat=data[0][puzzleID]["solutionMatrix"]
            for(arr of solMat){//sets solutionCount to the number of painted cells so we can know when to check if the solution is correct.
                for(el of arr){
                    if(el==1)
                        solutionCount++;
                }
            }

        })
        var solutionCount;//number of painted squares in the solution
        var columnHintContent//HTML STUFF - assigned value at puzzleObj.then
        var rowHintContent//HTML STUFF - assigned value at puzzleObj.then
        var inGameMatrix=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]//always all zeros when game begins
        var paintedCount=0;//number of painted cells - none so far
        
        puzzleObj.then(function(data){
            columnHintContent=data[0][puzzleID]["colHint"]
            rowHintContent=data[0][puzzleID]["rowHint"]
            var count=0;
            for(el of columnHints){
                el.childNodes[0].innerHTML=columnHintContent[count]
                count++
            }
            count=0;
            for(el of rowHints){
                el.childNodes[0].innerHTML=rowHintContent[count]
                count++
            }
        })
        //this is how we have to make this work BUT i think we can use a function to do this so we can have a local count to iterate over the JSON array.

        var startPaint = function(event){
            if(event.target.style!="darkred"){
                paintedCount++;
                countHTML.textContent=paintedCount;
                event.target.style.backgroundColor="darkred";
                var cell = event.target.id
                var row = parseInt(cell[0,1]-2)
                var col = parseInt(cell[2,3]-2)
                inGameMatrix[row][col]=1
                event.target.addEventListener("mousedown",startUnpaint);
                
                event.target.removeEventListener("mousedown",startPaint)
                
                window.addEventListener("mouseup",stopPaint);
                
                for(el of squares){
                    el.addEventListener("mouseover",paint);
                }
            }
        }

        var startUnpaint = function(event){
            if(event.target.style.backgroundColor=="darkred"){
                paintedCount--;
                countHTML.textContent=paintedCount;
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
            
        }

        var paint = function(){//paint is working. while mouse is down it can be dragged to other squares to paint them
            if(event.target.style.backgroundColor!="darkred" && event.target.classList.contains("square")){
                paintedCount++;
                countHTML.textContent=paintedCount;
                var cell = event.target.id
                var row = cell[0,1]-2
                var col = cell[2,3]-2
                inGameMatrix[row][col]=1
                event.target.addEventListener("mousedown",startUnpaint);
                event.target.removeEventListener("mousedown",startPaint);
                event.target.style.backgroundColor="darkred";
                
            }
            
            
        }
        var unpaint = function(){
            if(event.target.style.backgroundColor=="darkred" && event.target.classList.contains("square")){
                paintedCount--;
                countHTML.textContent=paintedCount;
                var cell = event.target.id
                var row = parseInt(cell[0,1]-2)
                var col = parseInt(cell[2,3]-2)
                inGameMatrix[row][col]=0
                event.target.addEventListener("mousedown",startPaint);
                event.target.removeEventListener("mousedown",startUnpaint);
                event.target.style.backgroundColor="white";
                
            }
            
            
        }

        var stopPaint = function(){//stop paint is working. when mouse is up it will stop painting.
            
            window.removeEventListener("mouseup",stopPaint)
            
            for(el of squares){
                el.removeEventListener("mouseover",paint)
                
            }
            if(paintedCount==solutionCount){
                compareToSolution();
            }
        }
        
        var stopUnpaint = function(){
            window.removeEventListener("mouseup",stopUnpaint)
            
            for(el of squares){
                el.removeEventListener("mouseover",unpaint)
                
            }
            if(paintedCount==solutionCount){
                compareToSolution();
            }
        }

        var compareToSolution = function(){
            puzzleObj.then(function(data){
                var solutionMatrix=data[0][puzzleID]["solutionMatrix"]
                for(var i=0;i<solutionMatrix.length;i++){
                    for(var j=0;j<solutionMatrix.length;j++){
                        if (solutionMatrix[i][j] != inGameMatrix[i][j]){
                            return;
                        }
                    }
                }
                for(el of squares){
                    if (el.style.backgroundColor=="darkred"){
                        el.style.backgroundColor="black";
                        el.removeEventListener("mousedown",startUnpaint);
                        
                        var puzzleImg=document.querySelector(`#${puzzleID}`)
                        puzzleImg.src="https://cdn.britannica.com/s:300x300/18/137318-004-A879596D.jpg"
                        puzzleImg.removeEventListener("click",newPuzzle)
                        paintedCount=0;
                        countHTML.textContent=paintedCount;
                        
                    }
                    else{
                        el.removeEventListener("mousedown",startPaint)
                    }
                    
                }
                var newPuzzleID="#" + puzzleID.substring(0,puzzleID.length-1)+(parseInt(puzzleID[puzzleID.length-1])+1)
                if(document.querySelector(newPuzzleID)){
                    document.querySelector(newPuzzleID).style.display="block"
                }
            })
            
        }
        
        for(el of squares){
            el.addEventListener("mousedown",startPaint);
        }
        
    
    }
    
})