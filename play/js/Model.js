/***************************

A MODEL:
- Draggable candidates & voter(s)
- Has to draw & up 'em up & down appropriately.

***************************/

function Model(modelName){

	var self = this;

	// CREATE DATA STRUCTURE
	self.voters = [];
	self.candidates = [];
	self.dom = document.createElement("div");
	self.arena = new Arena("arena",self)
	self.tarena = new Arena("tarena",self)
	self.nLoading = 0 // counter for drawing after everything is loaded
	
	// CONFIGURE DEFAULTS
	// helper
	var all_candidate_names = Object.keys(Candidate.graphicsByIcon["Default"])
	var yes_all_candidates = {}
    for (var i = 0; i < all_candidate_names.length; i++) {
        var a = all_candidate_names[i]
        yes_all_candidates[a] = true
    }
	Object.assign(self,{
		// values used in init
		id:modelName,
		size:300,
		scale:1,
		border:10,
		optionsForElection:{sidebar:true},
	// values used later
	// defaults that are also in main_sandbox.js in the cleanConfig function
		system: "FPTP",
		rbsystem: "Tideman",
		numOfCandidates: 3,
		spread_factor_voters: 1,
		arena_size: 300,
		median_mean: 1,
		utility_shape: "linear",
		dimensions: "2D",
        colorChooser: "pick and generate",
        colorSpace: "hsluv with dark",
		arena_border: 2,
		preFrontrunnerIds: ["square","triangle"],
		autoPoll: "Manual",
		// primaries: "No",
		firstStrategy: "zero strategy. judge on an absolute scale.", // maybe should be for voter, not model
		secondStrategy: "zero strategy. judge on an absolute scale.", // maybe should be for voter, not model
		doTwoStrategies: true,// maybe should be for voter, not model
        yeefilter: yes_all_candidates,
		computeMethod: "ez",
		pixelsize: 60,
		//
		nVoterGroupsRealName: "Single Voter",
		yeeobject: undefined,
		yeeon: false,
		//
		voterType: PluralityVoter,
		election: Election.plurality,
		ballotType: PluralityBallot,
		rbelection: rbvote.calctide
	})
	
	self.yee = new Yee(self);
	
	self.createDOM = function() {
		self.arena.createDOM()
		self.tarena.createDOM()
		self.tarena.canvas.hidden = true

		// My DOM: title + canvas + caption
		self.dom = document.createElement("div");
		self.dom.setAttribute("class", "model");
		self.title = document.createElement("div");
		self.title.id = "title";
		self.caption = document.createElement("div");
		self.caption.id = "caption";

		self.dom.appendChild(self.title);
		self.dom.appendChild(self.arena.canvas);
		self.dom.appendChild(self.tarena.canvas);
		self.dom.appendChild(self.caption);
	}

	self.initDOM = function() {
		self.arena.initDOM()
		self.tarena.initDOM()
		
		self.dom.style.width = (self.size+2*self.border)+"px"; // size+2*borders!
		self.caption.style.width = self.dom.style.width;
	}

	self.initMODEL = function() {

		self.arena.initARENA()
		self.tarena.initARENA()
		
		self.candidatesById = {};
		self.candidatesBySerial = {};
		for (var i=0; i<self.candidates.length; i++) {
			var c = self.candidates[i]
			c.i = i
			self.candidatesById[c.id] = c;
			self.candidatesBySerial[c.serial] = c;
		}

		var expYeeObject = function() {
			// Yee diagram
			if (self.kindayee == "can") {
				return self.candidatesById[self.keyyee]
			} else if (self.kindayee=="voter") {
				return self.voters[self.keyyee]
			} else if (self.kindayee=="off") {
				return undefined
			} else if (self.kindayee=="center") { 
				return self.voterCenter
			} else { // if yeeobject is not defined
				return undefined
			}
		}
		self.yeeobject = expYeeObject()
		self.yeeon = (self.yeeobject != undefined) ? true : false
		self.onInitModel()
	}
	self.onInitModel = function() {} // a hook for a caller

	self.election = function(self,options){};

	// Init!
	self.start = function(){  // TO IMPLEMENT FURTHER IN CALLER
		self.update();
	};

	// Reset!
	self.reset = function(){
		// RE-CREATE DATA STRUCTURE
		self.candidates = [];
		self.voters = [];
		// START - combination of CREATE, CONFIGURE, INIT, UPDATE
		self.start();
	};

	// Update!
	self.onUpdate = function(){}; // TO IMPLEMENT
	self.getSortedVoters = function() {
		var v = _getVoterArray(self)
		var x = v.map( (d,i) => v[self.orderOfVoters[i]] )
		return x
	}
	self.onDrop = function() {
		if (self.theme != "Nicky") {
			if (self.arena.trashes.overTrash) {
				self.arena.trashes.tossInTrash()
			}
		}
	}

	self.onAddCandidate = function() {} // callback
	self.update = function(){

		if (self.nLoading > 0) return // the loading function will call update()

		// update positions of draggables
		self.arena.update();
		self.tarena.update();
		
		// update the position of the voter center
		if (typeof self.voterCenter !== 'undefined') { // does the voterCenter exist?  If so then calculate it.
			self.voterCenter.update()
		}

		// calculate yee if its turned on and we haven't already calculated it ( we aren't dragging the yee object)
		if (self.yeeon && self.arena.mouse.dragging != self.yeeobject && self.tarena.mouse.dragging != self.yeeobject) {
			self.yee.calculate()
		}
		
		// get the ballots for this election
		for(var i=0; i<self.voters.length; i++){
			var voter = self.voters[i];
			voter.update();
		}
		
		if (self.tarena.canvas.hidden == false) // find order of voters
		{
			var v = _getVoterArray(self)
			if (v.length > 0) {
				if (self.dimensions == "1D+B" || self.dimensions == "1D") {
					// easy sort in 1D
					var m = v.map( function(d, i) {	return { i: i, d: d }; } ) // add an index to each voter
					m.sort(function(a,b){return a.d.x - b.d.x}) // sort voters
					self.orderOfVoters = m.map( a => a.i) // get original indices of sorted voters
				} else { 
					// 2D
					var draggingSomething = (self.arena.mouse.dragging || self.tarena.mouse.dragging)
					var changedNumVoters = (self.orderOfVoters != undefined) && (self.orderOfVoters.length != v.length)
					if (changedNumVoters || !draggingSomething ) {
						var tsp = new TravelingSalesman(); 
						tsp.runOnSet(v)
						var order = tsp.getOrder()
						self.orderOfVoters  = order
	
					}
				}
			}
		}
		for(var i=0; i<self.candidates.length; i++){
			var c = self.candidates[i];
			c.update(); // doesn't do anything... yet
		}

		var selected = {}
		selected.winners = []
		selected.colors = []
		for (var i=0; i < self.candidates.length; i++) {
			var c = self.candidates[i]
			if (c.selected) {
				selected.winners.push(c.id)
				selected.colors.push(c.fill)
			}
		}
		if (selected.winners.length == 1) {
			selected.winner = selected.winners[0]
			selected.color = selected.colors[0]
		} else if (selected.winners.length > 1) {
			selected.winner = selected.winners[0]
			selected.color = "#ccc"
		}
		if (selected.winners.length > 0) {
			self.result = selected
		} else {
			self.result = self.election(self,self.optionsForElection);
		}
		
		self.draw()
		self.drawSidebar()

		// Update!
		self.onUpdate();
		publish(self.id+"-update");

	};

	self.updateFromModel = function() {} // hook

	self.onDraw = function(){}; // TO IMPLEMENT
	self.draw = function() {

		self.arena.clear()
		self.tarena.clear()

		// Draw axes
		//var background = new Image();
		//background.src = "../play/img/axis.png";
		//self.ctx.drawImage(background,0,0);
		self.yee.drawBackground()
		
		_drawBars(self.tarena,self,self.round)

		if (self.dimensions == "1D+B") self.arena.drawHorizontal()

		self.arena.draw()
		if (self.tarena.canvas.hidden  == false) {
			self.tarena.draw()
		}


	}
	self.drawSidebar = function () {		
		if (self.result) {
			if(self.result.text) {
				if (self.result.dontredocaption != true) {
					self.caption.innerHTML = self.result.text;
				}
			}
		}
		self.onDraw();
	}


	var finding = false
	var seed = 1
	var goal = []
	var bounce = undefined
	self.buzz = function() {

		var motion = "bounce"
		
		if (motion=="goal") {
			//find goal
			if (!finding) {
				finding = true
				for(var i=0; i<self.candidates.length; i++){
					var can = self.candidates[i]
					goal[i] = self.yee.winSeek(can)
				}
				finding = false
			}
				
			// move toward goal or center
			for(var i=0; i<self.candidates.length; i++){
				var c = self.candidates[i];
				if (self.result) {
					if (self.result.winners.includes(c.id))
					{
						continue // skip this guy because he's winning
					}
				}
				if (goal[i]) {
					var g = goal[i]
				} else {
					if (1) {
						continue // skip this guy
					} else {
						// move toward center
						var g = {
							x: self.canvas.width * .5,
							y: self.canvas.height * .5
						}
					}
				}
				var diff = {
					x: g.x * .5 - c.x,
					y: g.y * .5 - c.y
				}
				lenDiff = Math.sqrt(diff.x**2 + diff.y**2)
				var unit = {
					x: diff.x / lenDiff,
					y: diff.y / lenDiff
				}
				var speed = 5
				c.x += unit.x * speed
				c.y += unit.y * speed
			}
	
			// random movement
			seed++
			Math.seedrandom(seed);
			var stepsize = 1
			for(var i=0; i<self.candidates.length; i++){
				var c = self.candidates[i];
				c.x += Math.round((Math.random()*2-1)*stepsize)
				c.y += Math.round((Math.random()*2-1)*stepsize)
			}
		} else if (motion == "bounce") {
			// bouncing
	
			if (bounce == undefined || bounce.length != self.candidates.length) {
				bounce = []
			
				for(var i=0; i<self.candidates.length; i++){
					var c = self.candidates[i];
					var x = c.x - self.arena.canvas.width * .25
					var y = c.y - self.arena.canvas.height * .25
			
					var lenC = Math.sqrt(x**2 + y**2)
					bounce[i] = {
						x: y / lenC,
						y: -x / lenC
					}
				}
			}
			var speed = 10
			for(var i=0; i<self.candidates.length; i++){
				var c = self.candidates[i];
				c.x += bounce[i].x * speed
				c.y += bounce[i].y * speed
				// r = Math.sqrt(c.x**2 + c.y**2)
				// if (r > modelName.size * .5) {
				// 	// reverse the radial component of the bounce
				// 	theta_approx = c.y/c.x
				// 	c.x = r * theta_approx
				// 	c.y = r * 
				// }
				if (c.x < 0) {
					bounce[i].x = Math.abs(bounce[i].x)
				} else if (c.x > self.arena.canvas.width * .5) {
					bounce[i].x = - Math.abs(bounce[i].x)
				}
				if (c.y < 0) {
					bounce[i].y = Math.abs(bounce[i].y)
				} else if (c.y > self.arena.canvas.height * .5) {
					bounce[i].y = - Math.abs(bounce[i].y)
				}
			}
			// radial
		
		}
	}
	self.icon = function(id) {
		return self.candidatesById[id].texticon_png
	}
};

function Arena(arenaName, model) {
	var self = this
	self.id = arenaName
	
	self.createDOM = function() {
		self.canvas = document.createElement("canvas");
		self.canvas.setAttribute("class", "interactive");
		self.ctx = self.canvas.getContext("2d");
		self.mouse = new Mouse(model.id + "-" + self.id, self.canvas);	// MAH MOUSE
		// if (self.id == "arena") self.draggableManager = new DraggableManager(self,model); // only allow dragging for the main arena... for now.. TODO
		self.draggableManager = new DraggableManager(self,model); 
		self.plusCandidate = new Plus(model)
		self.plusOneVoter = new Plus(model)
		self.plusVoterGroup = new Plus(model)
		self.plusCandidate.isPlusCandidate = true
		self.plusOneVoter.isPlusOneVoter = true
		self.plusVoterGroup.isPlusVoterGroup = true
		self.trashes = new Trashes(model)
		self.modify = new Modify(model)
	}
	self.initDOM = function() {
		// RETINA canvas, whatever.
		self.canvas.width = self.canvas.height = model.size*2; // retina!
		self.canvas.style.width = self.canvas.style.height = model.size+"px";
		self.canvas.style.borderWidth = model.border+"px";
		//self.canvas.style.margin = (2-self.border)+"px"; // use margin instead of border
		
		self.plusCandidate.init()
		self.plusOneVoter.init()
		self.plusVoterGroup.init()
		self.trashes.init()
		self.modify.init()
	}


	function Plus(model){

		var self = this;
		Draggable.call(self);
		self.isplus = true // when we try to drag the plus, we'll find out it's a plus and make a new candidate
		
		// CONFIGURE DEFAULTS
		self.size = 20;
		self.isPlusCandidate = false
		self.isPlusOneVoter = false
		self.isPlusVoterGroup = false
		
		self.init = function() {
			self.y = model.size - 20
			var between = 40
			if (self.isPlusCandidate) {
				self.x = model.size - between * 3.5
				var srcPlus = "play/img/plusCandidate.png"
			} else if (self.isPlusOneVoter) {
				self.x = model.size - between * 2.5
				var srcPlus = "play/img/plusOneVoter.png"
			} else if (self.isPlusVoterGroup) {
				self.x = model.size - between * 1.5
				var srcPlus = "play/img/plusVoterGroup.png"
			}
			// if (Loader) {
			// 	if (Loader.assets[srcPlus]) {
			// 		self.img = Loader.assets[srcPlus]
			// 	}
			// }
			self.img = new Image();
			self.img.src = srcPlus
			model.nLoading++
			self.img.onload = onLoadTool
		}
		self.draw = function(ctx,arena){
	
			// RETINA
			var p = self
			var x = p.x*2;
			var y = p.y*2;
			var size = self.size*2;
	
			if(self.highlight) {
				var temp = ctx.globalAlpha
				ctx.globalAlpha = 0.8
				size *= 2
				// y -= size/4
			}
			ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
			if(self.highlight) {
				ctx.globalAlpha = temp
			}
		};

		self.doPlus = function() {
			if (self.isPlusCandidate) {
				// add candidate
				var n = new Candidate(model)
				n.x = self.x
				n.y = self.y
				// generate a new id
				// look for the first one that isn't taken
				for (var i=1; i < 10000000; i++) {  // million is more than enough candidates
					var c = Candidate.graphicsByIcon[model.theme]
					for (var icon in c) {
						if (i == 1) {
							var newId = icon
						} else {
							var newId = icon + i
						}
						if (model.candidatesById[newId] != undefined) {
							// already done
						} else {
							var doBreak = true
							break
						}
					}
					if (doBreak) break
				}
				n.icon = icon
				n.instance = i
				model.candidates.push(n)
					
				// INIT
				n.init()
				if (model.nLoading > 0) {  // the loading function will call these after it's done.
					return n
				} else {
					model.initMODEL()
					// update the GUI
					model.onAddCandidate()
				}
				return n
			} else if (self.isPlusOneVoter || self.isPlusVoterGroup) {
				if (self.isPlusOneVoter) {
					var n = new SingleVoter(model)
				} else if (self.isPlusVoterGroup) {
					var n = new GaussianVoters(model)
				}
				n.x = self.x
				n.y = self.y
				// n.x_voters = true
				n.disk = 1
				var max = 0
				for (var i = 0; i < model.voters.length; i++) {
					var a = model.voters[i].vid
					if (a > max) max = a
				}
				n.vid = max + 1
				n.setType(model.voterType)
				n.firstStrategy = model.firstStrategy
				n.secondStrategy = model.secondStrategy
                n.spread_factor_voters = model.spread_factor_voters
				model.voters.push(n)
				// INIT
				model.initMODEL()
				n.init()
				return n
			}
		}
	
	}

	function Trashes(model) {
		var self = this
		self.init = function() {
			self.t = [new Trash(model)]
			if (model.dimensions != "2D") {
				self.t.push (new Trash(model))
			}
			for (var i=0; i<self.t.length; i++) {
				self.t[i].init()
			}
			if (model.dimensions == "1D+B") {
				self.t[1].y = model.arena.yDimOne
			} else if (model.dimensions == "1D") {
				self.t[0].y = model.arena.yDimOne * 2
				self.t[1].y = model.arena.yDimOne * 1
			}
		}
		self.tossInTrash = function() {
			for (var i=0; i<self.t.length; i++) {
				if (self.t[i].overTrash) self.t[i].tossInTrash()
			}
		}
		self.test = function() {
			var r = false
			for (var i=0; i<self.t.length; i++) {
				self.t[i].test()
				r = r || self.t[i].overTrash
			}
			self.overTrash = r
		}
		self.draw = function(ctx,a) {
			for (var i=0; i<self.t.length; i++) {
				self.t[i].draw(ctx,a)
			}
		}
	}

	function Trash(model){

		var self = this;
		Draggable.call(self);
		self.istrash = true
		self.isArenaObject = true

		// CONFIGURE DEFAULTS
		self.size = 20;
		self.img = new Image();
		self.img.src = "play/img/trash.png"
		model.nLoading++
		self.img.onload = onLoadTool
		self.init = function() { // these x & y are with respect to the arena, rather than the model
			self.x = model.size - 20
			self.y = model.size - 20
		}
		self.init()
		self.draw = function(ctx,arena){
	
			// RETINA
			var x = self.x*2;
			var y = self.y*2;
			var size = self.size*2;
	
			if(self.highlight) {
				var temp = ctx.globalAlpha
				ctx.globalAlpha = 0.8
			}
			ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
			if(self.highlight) {
				ctx.globalAlpha = temp
			}
	
			// TODO: make the trashcan open
		};

		self.tossInTrash = function() {
			var d = model.arena.mouse.dragging
			// find the candidate in the candidate list
			for (var i=0; i < model.candidates.length; i++) {
				if (model.candidates[i] == d) {
					// delete candidate
					model.candidates.splice(i,1)
					break
				}
			}
			// find the voter in the list
			for (var i=0; i < model.voters.length; i++) {
				if (model.voters[i] == d) {
					// delete candidate
					model.voters.splice(i,1)
					break
				}
			}

			// INIT
			model.initMODEL()
			// update the GUI
			model.onAddCandidate()

			self.size = 20
			return 
		}

		self.test = function() {
			var d = model.arena.mouse.dragging
			var p = d.newArenaPosition(model.arena.mouse.x,model.arena.mouse.y);
			var dx = p.x - self.x
			var dy = p.y - self.y
			var r = self.size * self.radiusScale
			if (dx * dx + dy * dy < r * r) {
				// we have trash
				self.size = 40
				self.overTrash = true
			} else {
				self.size = 20
				self.overTrash = false
			}
		}
	
	}

	function Modify(model) {
		var self = this;
		Draggable.call(self);
		self.isModify = true // might help later
		self.isArenaObject = true
		
		// CONFIGURE DEFAULTS
		self.size = 20;
		
		self.init = function() {
			var srcMod = "play/img/gear.png"
			// if (Loader) {
			// 	if (Loader.assets[srcMod]) {
			// 		self.img = Loader.assets[srcMod]
			// 	}
			// }
			self.img = new Image();
			self.img.src = srcMod
			model.nLoading++
			self.img.onload = onLoadTool
			self.configure()
		}
		self.configure = function() {
			if (self.active) {
				var f = model.arena.modelToArena(self.focus)
				self.x = f.x
				self.y = f.y
			} else {
				self.y = model.size - 20
				var between = 40
				self.x = model.size - between * 4.5
			}
		}
		self.draw = function(ctx,arena){
			// if it is near a candidate, then draw it on that candidate
			// when the mouse is let go, the coordinates will snap to the candidate



			// RETINA
			var p = self
			var x = p.x*2;
			var y = p.y*2;
			var size = self.size*2;
	
			if(self.highlight) {
				var temp = ctx.globalAlpha
				ctx.globalAlpha = 0.8
				size *= 2
				// y -= size/4
			}
			ctx.drawImage(self.img, x-size/2, y-size/2, size, size);
			if(self.highlight) {
				ctx.globalAlpha = temp
			}
		};

		self.doModify = function(flashydude) {
			// snap to the nearest candidate, that we've been drawing on
			if (flashydude && (flashydude.isCandidate || flashydude.isGaussianVoters) ) {
				self.focus = flashydude
				self.active = true
				self.configure()
				if (flashydude.isGaussianVoters) {
					model.arena.up = new Up(model,flashydude) // create controls
					model.arena.up.init()
				}
				model.arena.right = new Right(model,flashydude)
				model.arena.right.init()
				model.arena.initARENA() // add the controls to the arena
			} else {
				self.unInit()
				self.init()
			}
		}

		self.unInit = function() {
			self.active = false
			self.focus = null
			model.arena.up = null
			model.arena.right = null
		}
	}

	function Up(model,o) {  // o is the object that is being modified
		var self = this;
		Draggable.call(self);
		self.isUp = true // might help later
		self.isArenaObject = true
		self.dontchangex = true
		self.o = o
		self.scale = 4
		
		// CONFIGURE DEFAULTS
		self.size = 20;
		
		self.init = function() {
			var srcMod = "play/img/gear.png"
			// if (Loader) {
			// 	if (Loader.assets[srcMod]) {
			// 		self.img = Loader.assets[srcMod]
			// 	}
			// }
			self.img = new Image();
			self.img.src = srcMod
			model.nLoading++
			self.img.onload = onLoadTool
			self.configure()
		}
		self.configure = function() {
			var oa = model.arena.modelToArena(o)
			if (typeof o.group_count !== "undefined") {
				var length = o.group_count / self.scale
				self.y = oa.y - length
			} else {
				self.y = oa.y - 60
			}
			self.x = oa.x
			self.xC = oa.x
			self.yC = oa.y
		}
		self.draw = function(ctx,arena){
			// RETINA
			var p = self
			var x = p.x*2;
			var y = p.y*2;
			var size = self.size*2;
	
			if(self.highlight) {
				var temp = ctx.globalAlpha
				ctx.globalAlpha = 0.8
				size *= 2
				// y -= size/4
			}
			
			ctx.drawImage(self.img, x-size/2, y-size/2, size, size);

			var arrow_size = 20
			var offset_y = 0
			ctx.beginPath();
			ctx.moveTo(x,y+offset_y)
			ctx.lineTo(self.xC*2,self.yC*2)
			ctx.moveTo(x,y+offset_y)
			ctx.lineTo(x+arrow_size, y + offset_y + arrow_size)
			ctx.moveTo(x,y+offset_y)
			ctx.lineTo(x-arrow_size, y + offset_y + arrow_size)
			ctx.lineWidth = 10
			ctx.strokeStyle = "#333";
			ctx.stroke();

			if(self.highlight) {
				ctx.globalAlpha = temp
			}
		};

	}

	function Right(model,o) {  // o is the object that is being modified
		var self = this;
		Draggable.call(self);
		self.isRight = true // might help later
		self.isArenaObject = true
		self.dontchangey = true
		self.o = o
		self.scale = 5
		self.sizeScale = 2/3
		
		// CONFIGURE DEFAULTS
		self.size = 20;
		
		self.init = function() {
			var srcMod = "play/img/gear.png"
			// if (Loader) {
			// 	if (Loader.assets[srcMod]) {
			// 		self.img = Loader.assets[srcMod]
			// 	}
			// }
			self.img = new Image();
			self.img.src = srcMod
			model.nLoading++
			self.img.onload = onLoadTool
			self.configure()
		}
		self.configure = function() {
			var oa = model.arena.modelToArena(o)	
			self.y = oa.y
			self.yC = oa.y
			self.xC = oa.x
			if (typeof o.group_spread !== "undefined") {
				var length = o.group_spread / self.scale
				self.x = oa.x + length
			} else if (typeof o.b !== "undefined") {
				var length = o.size / self.sizeScale
				self.x = oa.x + length
			} else {
				self.x = oa.x + 60
			}
		}
		self.draw = function(ctx,arena){
			// RETINA
			var p = self
			var x = p.x*2;
			var y = p.y*2;
			var size = self.size*2;
	
			if(self.highlight) {
				var temp = ctx.globalAlpha
				ctx.globalAlpha = 0.8
				size *= 2
				// y -= size/4
			}
			
			ctx.drawImage(self.img, x-size/2, y-size/2, size, size);

			var arrow_size = 20
			var offset_x = 0

			ctx.beginPath();
			ctx.moveTo(x-offset_x,y)
			ctx.lineTo(self.xC*2,self.yC*2)
			ctx.moveTo(x-offset_x,y)
			ctx.lineTo(x-offset_x-arrow_size, y + arrow_size)
			ctx.moveTo(x-offset_x,y)
			ctx.lineTo(x-offset_x-arrow_size, y - arrow_size)
			ctx.lineWidth = 10
			ctx.strokeStyle = "#333";
			ctx.stroke();
			
			if(self.highlight) {
				ctx.globalAlpha = temp
			}
		};

	}
	function onLoadTool() {
		model.nLoading--
		if (model.nLoading == 0) {
			model.initMODEL()
			// update the GUI
			model.onAddCandidate()
			
			model.update() // now we have extra text for the model's output
		}
	}
	

	self.bFromY = function (y) {
		return (model.size - y)/60
	}
	self.yFromB = function (b) {
		return model.size - b * 60
	}
	
	// function Right(model,o) {  // o is the object that is being modified
	// 	Up.call(self,model,o)
	// }


	self.initARENA = function() {

		// Draggable candidates and voters
		var doControls = false
		var doVoters = true
		var doCandidates = true
		
		if (self.id == "arena" && model.theme != "Nicky") {
			doControls = true
		}

		self.draggables = [];
		if (doControls) {
			self.draggables.push(self.plusCandidate)
			self.draggables.push(self.plusOneVoter)
			self.draggables.push(self.plusVoterGroup)
			for (var i=0; i<self.trashes.t.length; i++) {
				self.draggables.push(self.trashes.t[i])
			}
		}
		for (var i=0; i<model.candidates.length; i++) {
			var c = model.candidates[i]
			self.draggables.push(c);
		}
		for (var i=0; i<model.voters.length; i++) {
			var v = model.voters[i]
			self.draggables.push(v);
		}
		if(model.voterCenter) self.draggables.push(model.voterCenter)
		if (doControls) {
			self.draggables.push(self.modify)
			if (self.modify.active) {
				if (self.up) {
					self.draggables.push(self.up)
				}
				self.draggables.push(self.right)
			}
		}
	}

		
	self.modelToArena = function(d) {
		if (d.isArenaObject) {
			return d
		}
		if (self.id == "tarena") {
			if (d.isCandidate) {
				if (model.dimensions == "2D") {
					// find closest voter's index
					var i = _closestVoterIndex(d,model)
					var xP = i  * (self.canvas.width/2)
					return {x:xP,y:35}
				} else {
					var xP = _xToPercentile(d.x,model) / 100 * (self.canvas.width/2)
					// return {x:xP,y:15*d.i+7} // each candidate has his own track
					return {x:xP,y:35}
				}
			} else {
				return {x:0,y:-100} // offscreen... move voter offscreen
			}
		} else {
			var x,y
			// just a regular arena
			x = d.x
			if (model.dimensions == "1D+B") {
				if (d.isCandidate) {
					y = self.yFromB(d.b)
				} else if (d.isVoter || d.isVoterCenter) {
					y = self.yDimOne
				} else {
					y = d.y
				}
			} else if (model.dimensions == "1D" ) {
				if (d.isCandidate) {
					y = 2*self.yDimOne
				} else if (d.isVoter || d.isVoterCenter) {
					y = self.yDimOne
				} else {
					y = d.y
				}
			} else {
				y = d.y
			}
			return {x:x,y:y}
		}

	}

	function _closestVoterIndex(d,model) { // returns where the candidate should be in the sorted list of voters
		closest = 0
		min = Infinity
		var a = _getVoterArray(model)
		for (var i = 0; i < a.length; i++) {
			v = a[model.orderOfVoters[i]]
			var dx = d.x - v.x
			var dy = d.y - v.y
			var d2 = dx*dx + dy*dy
			if (d2 < min) {
				min = d2
				closest = i
			}
		}
		return closest / a.length
	}

	self.arenaToModel = function(p,d) { // p is the new arena coordinate and d is the old model object (usually it is being dragged)
		
		var x,y,b // return variables

		if (d.isArenaObject) {
			return p
		}
		if (self.id == "tarena") {
			// Percentiles for Tetris Ballot Arena
			var percentile = p.x/(self.canvas.width/2) * 100
			percentile = Math.min(100,percentile)
			percentile = Math.max(0,percentile) // TODO: figure out why I would get a mouse at a negative x
			x = _percentileToX(percentile, model)
			y = _percentileToY(percentile, model)
			if (d.isCandidate) {
				b = d.b
			}
		} else {
			// Main Arena
			x = p.x
			if (model.dimensions == "2D") {
				y = p.y
				if (d.isCandidate) {
					b = d.b
				}
			} else {
				y = d.y
				if (d.isCandidate) {
					if (model.dimensions == "1D+B") {
						var h = (self.yDimOne + self.yDimBuffer)
						var limYc = (model.size - h) * .3 + h
						if (p.y < limYc) {
							b = self.bFromY(limYc)
						} else {
							b = self.bFromY(p.y)
						}
					} else {
						b = d.b
					}
				}
			}
		}
		return {x:x,y:y,b:b} // b is sometimes undefined, on purpose
	}

	self.update = function(){
		// Move the one that's being dragged, if any
		
		self.yDimOne = 100
		self.yDimBuffer = 20
		// self.yDimBuffer = (model.size - self.yDimOne) * .3
		
		// if (self.id == "arena") {
		if(self.mouse.dragging){
			var d = self.mouse.dragging
			if (d.isCandidate || d.isVoter || d.isVoterCenter) {
				var p = d.newArenaPosition(self.mouse.x,self.mouse.y);
				var n = self.arenaToModel(p,d)
				d.x = n.x
				d.y = n.y
				if (d.isCandidate) {
					d.b = n.b
					d.update()
				}
			} else {
				var p = d.newArenaPosition(self.mouse.x,self.mouse.y);
				d.x = p.x
				d.y = p.y
			}
			if (d.isUp) {
				d.x = d.xC
				d.y = Math.min(d.yC,d.y)
				if (d.o.voterGroupType && d.o.voterGroupType=="GaussianVoters") {
					var length = -(d.y - d.yC)
					d.o.group_count = length * d.scale
					d.o.init()
					model.updateFromModel()
				}
			} else if (d.isRight) {
				d.y = d.yC
				d.x = Math.max(d.xC,d.x)
				var length = d.x - d.xC
				if (d.o.voterGroupType && d.o.voterGroupType=="GaussianVoters") {
					d.o.group_spread = length * d.scale
					d.o.init()
					model.updateFromModel()
				} else if (d.o.isCandidate) {
					d.o.size = length * d.sizeScale
					d.o.b = d.o.bFromSize(d.o.size)
				}	
			} else if (d.isModify) {
				d.unInit() // dont show the axes when we're dragging the modify gear
			}
		}
		if (self.modify && self.modify.active) { // update the modify value
			self.modify.configure()
			self.right.configure()  // so re-configure the lengths of these controls
			if (self.modify.focus.group_spread) { // this value might have changed
				self.up.configure()	
			} 
		}
	}


	self.clear = function(){
		// Clear it all!
		self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
	}

	self.drawHorizontal = function() {
		// draw line through middle
		var yLine = self.yDimOne + self.yDimBuffer
		var ctx = self.ctx
		ctx.beginPath();
		ctx.moveTo(0,yLine*2);
		ctx.lineTo(ctx.canvas.width,yLine*2);
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#888";
		ctx.stroke();
	}

	self.draw = function(){

		// DRAW 'EM ALL.
		// Draw voters' BG first, then candidates, then voters.

		var noClip = true
		//set annotations
		resetAnnotations()
		if (self.id == "arena") {
			setAnnotations()
			// drawSortLines()
			drawToolbar()
			var flashydude = getFlashydude()
			if (model.dimensions == "2D" || noClip) {
				drawExtraTrash()
				drawVoters()
				drawCandidates()
				drawVoterCenterAndAnotherYeeObject()
				drawFlashydude()
				drawWinners()
			} else {
				var flashyFirst = (flashydude && flashydude.isCandidate)
				// startClip()
				drawCandidates()
				if (flashyFirst) drawFlashydude()
				drawWinners()
				// resetClip()
				clipCandidates()
				drawExtraTrash()
				drawVoters()
				if (!flashyFirst) drawFlashydude()
				drawVoterCenterAndAnotherYeeObject()
			}
			drawModify()
			setBorderColor()
		} else {	
			var flashydude = getFlashydude()
			drawCandidates()
			drawFlashydude()
			drawWinners()
			setBorderColor()
		}
		
		// //set annotations
		// if (self.id == "arena") {
		// 	setAnnotations()
		// 	// drawSortLines()
		// 	drawToolbar()
		// }
		// var flashydude = getFlashydude()
		// if (model.dimensions != "2D") {
		// 	drawCandidates()
		// 	if (flashydude && flashydude.isCandidate) drawFlashydude()
		// 	if (self.id == "arena") clipCandidates()
		// }
		// if (self.id == "arena") {
		// 	drawVoters()
		// }
		// if (model.dimensions == "2D") {
		// 	drawCandidates()
		// }
		// if (self.id == "arena") {
		// 	drawVoterCenterAndAnotherYeeObject()
		// }
		// if (!(flashydude && flashydude.isCandidate && model.dimensions != "2D")) drawFlashydude()

		// if (self.id == "arena") {
		// 	drawModify()
		// }
		// drawWinners()
		// setBorderColor()

		function resetAnnotations() {
			// reset annotations
			for(var i=0; i<self.draggables.length; i++){
				var draggable = self.draggables[i];
				draggable.drawAnnotation = (function(){});
				draggable.drawBackAnnotation = (function(){});
			}
		}
		function setAnnotations() {
			if(model.yeeobject) model.yeeobject.drawBackAnnotation = model.yee.drawYeeGuyBackground
			if(model.yeeobject) model.yeeobject.drawAnnotation = model.yee.drawYeeAnnotation
		}

		function drawSortLines() {
			// draw sort lines
			var s = model.getSortedVoters()
			for (var i=0; i<s.length-1; i++) {
				// draw line from here to next
				
				var ctx = self.ctx
				var va = s[i]
				var vb = s[i+1]
				ctx.beginPath();
				ctx.moveTo(va.x*2	,va.y*2	);
				ctx.lineTo(vb.x*2	,vb.y*2	);
				ctx.lineWidth = 2;
				ctx.strokeStyle = "#888";
				ctx.stroke();

			}

		}

		function drawToolbar() {
			if (model.theme != "Nicky") {
				self.plusCandidate.draw(self.ctx,self)
				self.plusOneVoter.draw(self.ctx,self)
				self.plusVoterGroup.draw(self.ctx,self)
				self.trashes.t[0].draw(self.ctx,self)
			}
		}
		

		function getFlashydude() {
			for(var i=0; i<model.candidates.length; i++){
				var c = model.candidates[i];
				if (c.highlight) {
					return c
				}
			}
			for(var i=0; i<model.voters.length; i++){
				var voter = model.voters[i];
				if (voter.highlight) {
					return voter
				}
			}
			return null
		}

		function startClip() {
			// Clip a rectangular area
			var dy = self.yDimOne + self.yDimBuffer
			var ctx = self.ctx
			ctx.rect(0,dy,self.canvas.width,self.canvas.height-dy);
			ctx.stroke();
			ctx.clip();
		}

		function resetClip() {
			// Clip a rectangular area
			var ctx = self.ctx
			ctx.rect(0,0,self.canvas.width,self.canvas.height);
			ctx.stroke();
			ctx.clip();
		}
		
		function drawCandidates() {
			for(var i=0; i<model.candidates.length; i++){
				var c = model.candidates[i];
				if (c.highlight) {
					continue
				}
				c.draw(self.ctx,self);
			}
		}

		function clipCandidates() {
			// draw a white rectangle
			var ctx = self.ctx
			var temp = ctx.globalAlpha
			ctx.globalAlpha = 1
			ctx.fillStyle = "#fff"
			ctx.fillRect(0,0,ctx.canvas.width,(self.yDimOne + self.yDimBuffer)*2)  // draw a white background
			ctx.fill()
			ctx.globalAlpha = temp
		}


		function drawExtraTrash() {
			if (model.theme != "Nicky" && model.dimensions != "2D") {
				self.trashes.t[1].draw(self.ctx,self)
			}
		}

		function drawVoters() {
			for(var i=0; i<model.voters.length; i++){
				var voter = model.voters[i];
				voter.draw1(self.ctx,self);
			}
			for(var i=0; i<model.voters.length; i++){
				var voter = model.voters[i];
				if (voter.highlight) {
					var flashydude = voter
					continue
				}
				voter.draw2(self.ctx,self);
			}
		}
		
		function drawVoterCenterAndAnotherYeeObject() {	
			var oneVoter = (model.voters.length == 1 && model.voters[0].points.length == 1)
			var isCenter = (typeof model.voterCenter !== 'undefined')
			if (isCenter && ! oneVoter) {
				model.voterCenter.draw(self.ctx)
			}

			// draw the Yee object last so it is easy to see.
			if (model.yeeon && model.yeeobject) {
				var yeeCenter = (isCenter) ? (model.yeeobject == model.voterCenter) : false
				var yeeOne = model.yeeobject == model.voters[0]
				var covering = (oneVoter && (yeeOne || yeeCenter) )
				// unless it covers the one voter
				if (! covering ) {
					model.yeeobject.draw(self.ctx,self)
				}
			}
		}

		function drawFlashydude() {
			var d = self.mouse.dragging
			var dontdo = true // I'm not sure why I did this part and it probably can be removed.
			if (!dontdo && d) { // draw the dragging object again (twice but that's okay)
				if (d.isVoter) {
					d.draw2(self.ctx,self)
				} else if (d.isVoterCenter){
					if(! oneVoter) {
						d.draw(self.ctx,self)
					}
				} else {
					d.draw(self.ctx,self)
				}
			} else {
				if (flashydude) {
					if (flashydude.isVoter) {
						flashydude.draw2(self.ctx,self)
					} else {
						flashydude.draw(self.ctx,self)
					}
				}
			}
		}
			
		function drawModify() {
			if (model.theme != "Nicky") {
				self.modify.draw(self.ctx,self)
				
				if (self.modify.active) {
					if (self.up) {
						self.up.draw(self.ctx,self)
					}
					self.right.draw(self.ctx,self)
				}
			}

		}
		
		function drawWinners() {
			if (!model.dontdrawwinners) {
				// draw text next to the winners
				if(model.result && model.result.winners) {
					for(var i=0; i<model.candidates.length; i++){
						var c = model.candidates[i];
						if (model.result.winners.includes(c.id)) {
							if (model.result.winners.length > model.seats) {
								c.drawTie(self.ctx,self)
							} else {
								c.drawWin(self.ctx,self)
							}
						}
					}
				}
	
				// if(model.result && model.result.winners) {
				// 	var objWinners = model.result.winners.map(x => model.candidatesById[x])
				// 	if (objWinners.length > model.seats) {
				// 		for (i in objWinners) {
				// 			objWinners[i].drawTie(self.ctx,self)
				// 		}
				// 	} else {
				// 		for (i in objWinners) {
				// 			objWinners[i].drawWin(self.ctx,self)
				// 		}
				// 	}
				// }
	
			}
		}
		
		function setBorderColor() {
			if (model.result) {
				self.canvas.style.borderColor = model.result.color;
				if (model.yeeon) self.canvas.style.borderColor = "#fff"
			}
		}
	}

}