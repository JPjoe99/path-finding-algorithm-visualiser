(()=>{"use strict";var t,e=function(){function t(t,e,i,o){this.id=i,this.x=t,this.y=e,this.type=o}return t.prototype.getX=function(){return this.x},t.prototype.getY=function(){return this.y},t.prototype.getId=function(){return this.id},t.prototype.getType=function(){return this.type},t}(),i=(t=function(i,o){return(t=e.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,i){for(var o in i)e.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])})(i,o)},function(i,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=i}t(i,o),i.prototype=null===o?e.create(o):(n.prototype=o.prototype,new n)}),o=function(t){function e(e,i,o){var n=t.call(this,e,i,o,"N")||this;return n.nodesPastThrough=[],n.visitStatus=!1,n.status="",n}return i(e,t),e.prototype.getNodesPastThrough=function(){return this.nodesPastThrough},e.prototype.addNodePastThrough=function(t){this.nodesPastThrough.push(t)},e.prototype.setDistance=function(t){this.distance=t},e.prototype.setNumberOfEdges=function(t){this.numberOfEdges=t},e.prototype.getNumberOfEdges=function(){return this.numberOfEdges},e.prototype.setStatus=function(t){this.status=t},e.prototype.getStatus=function(){return this.status},e.prototype.setVisitStatus=function(t){this.visitStatus=t},e.prototype.getVisitStatus=function(){return this.visitStatus},e.prototype.getDistance=function(){return this.distance},e.prototype.setNodePastThrough=function(t){this.nodeThrough=t},e.prototype.getNodePastThrough=function(){return this.nodeThrough},e}(e),n=function(){function t(t,e,i){this.x=t,this.y=e,this.id=i}return t.prototype.getX=function(){return this.x},t.prototype.getY=function(){return this.y},t.prototype.getId=function(){return this.id},t.prototype.getContent=function(){return this.content},t.prototype.setContent=function(t){this.content=t},t.prototype.placeNode=function(t){this.content=t},t.prototype.placeWall=function(t){this.content=t},t}(),s=function(){function t(t,e){this.squares=[],this.x=t,this.y=e;for(var i=0;i<e;i++)for(var s=0;s<t;s++){var r=t*i+s;this.squares.push(new n(s,i,r)),this.squares[t*i+s].placeNode(new o(s,i,r))}}return t.prototype.getX=function(){return this.x},t.prototype.getY=function(){return this.y},t.prototype.getSquares=function(){return this.squares},t.prototype.getSquare=function(t){for(var e=0;e<this.squares.length;e++)if(this.squares[e].getId()==t)return this.squares[e]},t}(),r=function(){function t(){this.mainBody=document.querySelector("#main")}return t.prototype.drawGrid=function(t){var e=document.createElement("div");e.id="grid",e.className="grid-container";var i=screen.availWidth/30;console.log(screen.availWidth),i=Math.round(i),console.log(i),e.style.gridTemplateColumns="repeat("+t.getX()+", "+100/t.getX()+"vw)",e.style.gridTemplateRows="repeat("+t.getY()+", "+100/t.getY()+"vh";for(var o=t.getSquares(),n=0;n<o.length;n++)e.appendChild(this.drawSquare(o[n]));this.mainBody.appendChild(e)},t.prototype.drawSquare=function(t){var e=document.createElement("div");return e.className="grid-square",e.id=""+t.getId(),e},t.prototype.drawNode=function(t){var e=document.createElement("div");return e.className="grid-square",e.id=""+t.getId(),e},t.prototype.highlightSquare=function(t,e){var i=document.getElementById(""+t);i.style.backgroundColor=""+e,i.style.border=""},t.prototype.highlightPath=function(t){var e=document.getElementById(""+t),i=document.createElement("img");i.src="https://img.icons8.com/material-outlined/24/000000/filled-circle--v1.png",i.style.height="100%",i.style.width="100%",e.appendChild(i)},t.prototype.unhighlightStart=function(t){document.getElementById(""+t).innerHTML=""},t.prototype.highlightStart=function(t){var e=document.getElementById(""+t),i=document.createElement("img");i.src="https://img.icons8.com/ios-filled/50/000000/runner-starting-the-race.png",i.style.height="100%",i.style.width="100%",e.appendChild(i)},t.prototype.highlightEnd=function(t){var e=document.getElementById(""+t),i=document.createElement("img");i.src="https://img.icons8.com/android/24/000000/finish-flag.png",i.style.height="100%",i.style.width="100%",e.appendChild(i)},t.prototype.drawMaze=function(t){for(var e=0;e<t.getSquares().length;e++)"W"==t.getSquare(e).getContent().getType()&&this.highlightSquare(e,"gray")},t}(),g=function(){var t=function(i,o){return(t=e.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,i){for(var o in i)e.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])})(i,o)};return function(i,o){if("function"!=typeof o&&null!==o)throw new TypeError("Class extends value "+String(o)+" is not a constructor or null");function n(){this.constructor=i}t(i,o),i.prototype=null===o?e.create(o):(n.prototype=o.prototype,new n)}}(),u=function(t){function e(e,i,o){return t.call(this,e,i,o,"W")||this}return g(e,t),e}(e),h=function(){function t(t){this.unvisitedNodes=[],this.shortestPath=[],this.visitedNodes=[],this.grid=t,this.startingNode=null,this.endingNode=null;for(var e=t.getSquares(),i=0;i<e.length;i++){var o=e[i].getContent();"N"==o.getType()&&this.unvisitedNodes.push(o)}this.totNumberOfEdges=0}return t.prototype.getStartingNode=function(){return this.startingNode},t.prototype.setStartingNode=function(t){this.startingNode=t,this.startingNode.setStatus("S")},t.prototype.getEndingNode=function(){return this.endingNode},t.prototype.setEndingNode=function(t){this.endingNode=t,this.endingNode.setStatus("F")},t.prototype.getVisitedNodes=function(){return this.visitedNodes},t.prototype.resetVisitedNodes=function(){this.visitedNodes=[]},t.prototype.resetUnvisitedNodes=function(){this.unvisitedNodes=[];for(var t=this.grid.getSquares(),e=0;e<t.length;e++){var i=t[e].getContent();"N"==i.getType()&&this.unvisitedNodes.push(i)}for(e=0;e<this.unvisitedNodes.length;e++)this.unvisitedNodes[e].setVisitStatus(!1)},t.prototype.setShortestPath=function(t){this.shortestPath=t},t.prototype.resetShortestPath=function(){this.shortestPath=[]},t.prototype.getShortestPath=function(){return this.shortestPath},t.prototype.getUnvisitedNodes=function(){return this.unvisitedNodes},t.prototype.setDistances=function(){for(var t=0;t<this.unvisitedNodes.length;t++)"S"==this.unvisitedNodes[t].getStatus()?this.unvisitedNodes[t].setDistance(0):this.unvisitedNodes[t].setDistance(1/0);this.unvisitedNodes.sort((function(t,e){return t.getDistance()>e.getDistance()?1:-1}))},t.prototype.setNumberOfEdges=function(){for(var t=0;t<this.unvisitedNodes.length;t++)"S"==this.unvisitedNodes[t].getStatus()?this.unvisitedNodes[t].setNumberOfEdges(0):this.unvisitedNodes[t].setNumberOfEdges(1/0)},t.prototype.generateMaze=function(){for(var t=0;t<this.grid.getSquares().length;t++){var e=this.grid.getSquare(t).getX(),i=this.grid.getSquare(t).getY();this.grid.getSquare(t).placeWall(new u(e,i,t))}},t.prototype.performDijkstra=function(t){for(var e=this.getUnvisitedNodes(),i=[],o=4,n=(this.totNumberOfEdges,0);n<e.length;n++)"W"!=e[n].getType()&&((t.getX()-e[n].getX()!=1&&t.getX()-e[n].getX()!=-1||t.getY()-e[n].getY()!=0||t.getNodePastThrough()==e[n])&&(t.getY()-e[n].getY()!=1&&t.getY()-e[n].getY()!=-1||t.getX()-e[n].getX()!=0||t.getNodePastThrough()==e[n])||i.push(e[n]));for(n=0;n<i.length;n++){o=3,9==i[n].getX()||i[n].getX()==this.grid.getX()?o=0!=i[n].getY()||i[n].getY()!=this.grid.getY()?2:1:0!=i[n].getY()&&i[n].getY()!=this.grid.getY()||(o=9!=i[n].getX()||i[n].getX()!=this.grid.getX()?2:1);var s=o+t.getNumberOfEdges(),r=i[n].getX()-t.getX(),g=i[n].getY()-t.getY(),u=Math.pow(Math.pow(r,2)+Math.pow(g,2),.5)+t.getDistance();i[n].getDistance()==u?(i[n].getNumberOfEdges()>s&&(i[n].setNumberOfEdges(s),i[n].setNodePastThrough(t)),i[n].setNumberOfEdges(s),i[n].addNodePastThrough(t)):i[n].getDistance()>u&&(i[n].setNumberOfEdges(s),this.totNumberOfEdges=s,i[n].setNumberOfEdges(s),i[n].setDistance(u),i[n].addNodePastThrough(t),i[n].setNodePastThrough(t))}t.setVisitStatus(!0),this.visitedNodes.push(t),e.splice(e.indexOf(t),1),e.sort((function(t,e){return t.getDistance()>e.getDistance()?1:-1}))},t}();new(function(){function t(t){var e=this;this.placeImage=function(t){var i=t.target.id;if(null==e.image){var o=e.grid.getSquare(i),n=o.getX(),s=o.getY();o.placeWall(new u(n,s,i)),e.draw.highlightSquare(i,"gray")}console.log(i),"start"==e.image.type?(null!=e.startingNode&&e.draw.unhighlightStart(e.startingNode.getId()),e.selectStartingNode(e.grid.getSquare(i).getContent()),e.draw.highlightStart(i)):"end"==e.image.type&&(null!=e.endingNode&&e.draw.unhighlightStart(e.endingNode.getId()),e.selectEndingNode(e.grid.getSquare(i).getContent()),e.draw.highlightEnd(i)),null!=e.startingNode&&null!=e.endingNode&&e.runDijkstra()},this.grabImage=function(t){var i=t.target;e.image={type:""+i.id,src:""+i.src}},this.runVisualiser=function(){e.runDijkstra()},this.createMaze=function(){e.logic.generateMaze(),e.draw.drawMaze(e.grid)},this.grid=t,this.draw=new r,this.logic=new h(t),this.startingNode=null,this.endingNode=null,this.image=null}return t.prototype.startApplication=function(){this.draw.drawGrid(this.grid),this.runApplication()},t.prototype.runApplication=function(){for(var t=document.querySelector("#grid").children,e=0;e<t.length;e++)t[e].addEventListener("click",this.placeImage);document.querySelector(".visualise").addEventListener("click",this.runVisualiser);var i=document.getElementsByTagName("img");for(e=0;e<i.length;e++)i[e].addEventListener("mousedown",this.grabImage);document.querySelector("#maze").addEventListener("click",this.createMaze)},t.prototype.selectStartingNode=function(t){this.startingNode=t},t.prototype.selectEndingNode=function(t){console.log(t),this.endingNode=t},t.prototype.runDijkstra=function(){for(var t=this.logic.getShortestPath(),e=0;e<t.length;e++)this.draw.highlightSquare(t[e].getId(),"white");this.logic.resetShortestPath(),t=this.logic.getShortestPath(),this.logic.resetUnvisitedNodes(),this.logic.resetVisitedNodes(),this.logic.setStartingNode(this.startingNode),this.logic.setEndingNode(this.endingNode),this.logic.setDistances(),this.logic.setNumberOfEdges();for(var i=this.logic.getStartingNode();0!=this.logic.getUnvisitedNodes().length;)this.logic.performDijkstra(i),i=this.logic.getUnvisitedNodes()[0];for(this.logic.getVisitedNodes().push(this.logic.getEndingNode()),e=0;e<this.logic.getVisitedNodes().length;e++)"F"==this.logic.getVisitedNodes()[e].getStatus()&&console.log(this.logic.getVisitedNodes()[e]);for(var o=this.logic.getVisitedNodes()[this.logic.getVisitedNodes().length-1];"S"!=o.getNodePastThrough().getStatus();)t.push(o),o=o.getNodePastThrough();for(t.push(o),t.shift(),console.log(t),e=0;e<t.length;e++)this.draw.highlightSquare(t[e].getId(),"yellow")},t}())(new s(45,20)).startApplication()})();