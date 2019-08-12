function loadpreset(modelName) {
	
	// input
	var htmlname = modelName + '.html'

	// defaults
	var config = []
	var update = function () {
		return
	}

	// helpers
	update_original = function (s) {
		s.ui.menu.systems.choose.buttons.forEach(x => x.dom.hidden = (["FPTP", "IRV", "Borda", "Condorcet", "Approval", "Score"].includes(x.dom.innerHTML)) ? false : true)
		s.ui.menu.systems.choose.buttons.forEach(x => x.dom.style.marginRight = "4px")
		s.ui.menu.systems.choose.buttons.forEach(x => x.dom.style.width = "106px")

		s.ui.menu.nVoterGroups.choose.buttons.forEach(x => x.dom.hidden = (["1", "2", "3"].includes(x.dom.innerHTML)) ? false : true)
		s.ui.menu.nCandidates.choose.buttons.forEach(x => x.dom.hidden = (["two", "three", "four", "five"].includes(x.dom.innerHTML)) ? false : true)
	}
	
	// configurations
	if (htmlname == "election1.html") {
		config = {

			features: 1,
			system: "FPTP",

			candidates: 3,
			candidatePositions: [
				[50, 125],
				[250, 125],
				[280, 280]
			],

			voters: 1,
			voterPositions: [
				[155, 125]
			]
		}
		update = update_original
	} else if (htmlname == "election2.html") {
		config = {

			features: 1,
			system: "IRV",

			candidates: 3,
			candidatePositions: [
				[41, 271],
				[257, 27],
				[159, 65]
			],

			voters: 1,
			voterPositions: [
				[257, 240]
			]


		}
		update = update_original
	} else if (htmlname == "election3.html") {
		config = {

			features: 1,

			system: "Borda",

			candidates: 3,
			candidatePositions: [
				[173, 150],
				[275, 150],
				[23, 150]
			],
			//candidates: 4,
			//candidatePositions: [[174,175],[271,266],[23,149],[23,23]],

			voters: 1,
			voterPositions: [
				[232, 150]
			]
			// voterPositions: [[226,230]]

		}
		update = update_original
	} else if (htmlname == "election4.html") {
		config = {
			features: 2,
			system: "Condorcet",
			candidates: 3,
			voters: 3
		}
		update = update_original
	} else if (htmlname == "election5.html") {
		config = {

			features: 2,
			system: "Borda",

			candidates: 3,
			candidatePositions: [
				[40, 115 + 10],
				[177, 185 + 10],
				[224, 118 + 10]
			],

			voters: 2,
			voterPositions: [
				[75, 120 + 10],
				[225, 120 + 10]
			]

		}
		update = update_original
	} else if (htmlname == "election6.html") {
		config = {

			system: "Score",
			strategy: "normalize",

			candidates: 3,
			candidatePositions: [
				[50, 125],
				[250, 125],
				[280, 280]
			],

			voters: 1,
			voterPositions: [
				[155, 125]
			]

		}
	} else if (htmlname == "election7.html") {
		config = {
			featurelist: ["percentSecondStrategy"],
			percentSecondStrategy: [90, 0, 0],

			system: "Score",

			candidates: 3,
			candidatePositions: [
				[150 - 30, 150],
				[150 + 130, 150],
				[150 + 50, 150]
			],

			voters: 1,
			voterPositions: [
				[150, 150]
			],
			secondStrategies: ["normalize"],
			firstStrategy: "zero strategy. judge on an absolute scale."

		}
	} else if (htmlname == "election8.html") {
		config = {

			/*
			features:3,
			system: "Score",

			candidates: 3,
			candidatePositions: [[100,150],[150,150+100],[300-100,150]],
	
			voters: 2,
			voterPositions: [[100,150],[300-100,150]],
			secondStrategies: ["normalize","zero strategy. judge on an absolute scale."],
			preFrontrunnerIds: ["square","hexagon"]
			*/

			candidatePositions: [
				[100, 150],
				[200, 150],
				[150,250]
			],
			voterPositions: [
				[100, 150],
				[200, 150]
			],
			system: "Score",
			candidates: 2,
			voters: 2,
			secondStrategies: ["normalize", "normalize", "zero strategy. judge on an absolute scale."],
			preFrontrunnerIds: ["square", "hexagon"],
			featurelist: ["percentSecondStrategy"],
			sandboxsave: false,
			hidegearconfig: false,
			description: "",
			percentSecondStrategy: ["70", "49", 0],
			snowman: false,
			firstStrategy: "zero strategy. judge on an absolute scale.",
			keyyee: "off",
			features: undefined,
			doPercentFirst: undefined,
			doFullStrategyConfig: undefined,

		}
	} else if (htmlname == "election9.html") {
		config = {

			features: 3,
			doPercentFirst: true,
			system: "Score",

			candidates: 3,

			voters: 2,
			voterPositions: [
				[200, 160],
				[100, 160]
			],
			secondStrategies: ["normalize", "normalize"],
			percentSecondStrategy: [50, 50],
			doFullStrategyConfig: true

		}
	} else if (htmlname == "election10.html") {
		config = {
			/*
				features:3,
				doPercentFirst:true,
				system: "Approval",

				candidates: 3,
				candidatePositions: [[150-25,150-20],
									 [150+20,150-20],
									 [150,150+75]],
				
				voters: 3,
				voterPositions: [[150,150-70],
									 [150,150+10],
									 [150,150+90]],
				secondStrategies: ["normalize frontrunners only","normalize frontrunners only","normalize frontrunners only"],
				percentSecondStrategy: [100,100,100],
				preFrontrunnerIds: ['square','triangle','hexagon'],
				doFullStrategyConfig: true
				*/

			candidatePositions: [
				[121, 149],
				[118, 170],
				[194, 159]
			],
			voterPositions: [
				[116, 121],
				[116, 184],
				[195, 155]
			],
			system: "Approval",
			candidates: 3,
			voters: 3,
			secondStrategies: ["best frontrunner", "best frontrunner", "best frontrunner"],
			percentSecondStrategy: [18, 22, 92],
			preFrontrunnerIds: ["square", "triangle", "hexagon"],
			featurelist: ["percentSecondStrategy"],
			sandboxsave: false,
			hidegearconfig: false,
			description: "",
			snowman: true,
			firstStrategy: "normalize",
			keyyee: "off",
			kindayee: "off",
			features: undefined,
			doPercentFirst: undefined,
			doFullStrategyConfig: undefined
		}
	} else if (htmlname == "election11.html") {
		config = {
			/*
				features:1,
				doPercentFirst:true,
				system: "Approval",

				candidates: 3,
				candidatePositions: [[150-25,150-20],
									 [150+20,150-20],
									 [150,150+75]],
				
				voters: 3,
				voterPositions: [[150,150-70],
									 [150,150+10],
									 [150,150+90]],
				secondStrategies: ["best frontrunner","best frontrunner","best frontrunner"],
				percentSecondStrategy: [0,100,100],
				preFrontrunnerIds: ['square','triangle','hexagon'],
				doFullStrategyConfig: true,
				firstStrategy: "normalize"
				*/

			candidatePositions: [
				[121, 149],
				[118, 170],
				[194, 159]
			],
			voterPositions: [
				[116, 121],
				[116, 184],
				[195, 155]
			],
			system: "Approval",
			candidates: 3,
			voters: 3,
			secondStrategies: ["best frontrunner", "best frontrunner", "best frontrunner"],
			percentSecondStrategy: [18, 22, 92],
			preFrontrunnerIds: ["square", "triangle", "hexagon"],
			featurelist: ["percentSecondStrategy", "systems"],
			sandboxsave: false,
			hidegearconfig: false,
			description: "",
			snowman: true,
			firstStrategy: "normalize",
			keyyee: "off",
			kindayee: "off",
			features: undefined,
			doPercentFirst: undefined,
			doFullStrategyConfig: undefined
		}
	} else if (htmlname == "election12.html") {
		config = {
			/*
				features:3,
				doPercentFirst:true,
				system: "IRV",

				candidates: 4,
				candidatePositions: [[150-25,150-20],
									 [150+20,150-20],
									 [150,150+75],
									 [150+0,150+10]],
				
				voters: 3,
				voterPositions: [[150,150-70],
									 [150,150+10],
									 [150,150+90]],
				secondStrategies: ["normalize frontrunners only","normalize frontrunners only","normalize frontrunners only"],
				percentSecondStrategy: [100,100,100],
				preFrontrunnerIds: ['square','triangle','hexagon']
				*/

			candidatePositions: [
				[145, 155],
				[184, 153],
				[106, 157]
			],
			voterPositions: [
				[150, 150]
			],
			system: "IRV",
			candidates: 3,
			voters: 1,
			secondStrategies: ["zero strategy. judge on an absolute scale.", "normalize frontrunners only", "normalize frontrunners only"],
			percentSecondStrategy: ["100", 100, 100],
			preFrontrunnerIds: ["square", "triangle", "hexagon"],
			featurelist: ["systems"],
			sandboxsave: false,
			hidegearconfig: false,
			description: "",
			snowman: false,
			firstStrategy: "zero strategy. judge on an absolute scale.",
			keyyee: "off",
			features: undefined,
			doPercentFirst: undefined,
			doFullStrategyConfig: undefined,
		}
	} else if (htmlname == "election13.html") {
		config = {
			/*
				features:3,
				doPercentFirst:true,
				system: "STAR",

				candidates: 3,
				candidatePositions: [[150-25,150-20],
									 [150+20,150-20],
									 [150,150+75]],
				
				voters: 3,
				voterPositions: [[150,150-70],
									 [150,150+10],
									 [150,150+90]],
				secondStrategies: ["starnormfrontrunners","starnormfrontrunners","starnormfrontrunners"],
				percentSecondStrategy: [100,100,100],
				preFrontrunnerIds: ['square','triangle','hexagon']
				*/

			candidatePositions: [
				[121, 149],
				[118, 170],
				[194, 159]
			],
			voterPositions: [
				[116, 121],
				[116, 184],
				[195, 155]
			],
			system: "STAR",
			candidates: 3,
			voters: 3,
			secondStrategies: ["best frontrunner", "best frontrunner", "best frontrunner"],
			percentSecondStrategy: [18, 22, 92],
			preFrontrunnerIds: ["square", "triangle", "hexagon"],
			featurelist: ["percentSecondStrategy"],
			sandboxsave: false,
			hidegearconfig: false,
			description: "",
			snowman: true,
			firstStrategy: "normalize",
			keyyee: "off",
			kindayee: "off",
			features: undefined,
			doPercentFirst: undefined,
			doFullStrategyConfig: undefined
		}
	} else if (htmlname == "election14.html") {
		config = {
			/*
				features:3,
				doPercentFirst:true,
				system: "3-2-1",

				candidates: 3,
				candidatePositions: [[150-25,150-20],
									 [150+20,150-20],
									 [150,150+75]],
				
				voters: 3,
				voterPositions: [[150,150-70],
									 [150,150+10],
									 [150,150+90]],
				secondStrategies: ["starnormfrontrunners","starnormfrontrunners","starnormfrontrunners"],
				percentSecondStrategy: [100,100,100],
				preFrontrunnerIds: ['square','triangle','hexagon']
				*/

			candidatePositions: [
				[121, 149],
				[118, 170],
				[194, 159]
			],
			voterPositions: [
				[116, 121],
				[116, 184],
				[195, 155]
			],
			system: "3-2-1",
			candidates: 3,
			voters: 3,
			secondStrategies: ["best frontrunner", "best frontrunner", "best frontrunner"],
			percentSecondStrategy: [18, 22, 92],
			preFrontrunnerIds: ["square", "triangle", "hexagon"],
			featurelist: ["percentSecondStrategy"],
			sandboxsave: false,
			hidegearconfig: false,
			description: "",
			snowman: true,
			firstStrategy: "normalize",
			keyyee: "off",
			kindayee: "off",
			features: undefined,
			doPercentFirst: undefined,
			doFullStrategyConfig: undefined
		}
	} else if (htmlname == "election15.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[150, 150]
			],
			description: "",
			features: undefined,
			system: "FPTP",
			candidates: 5,
			voters: 1,
			doFullStrategyConfig: undefined,
			doPercentFirst: undefined,
			featurelist: ["systems", "voters", "candidates", "percentSecondStrategy", "secondStrategy", "percentSecondStrategy", "firstStrategy", "frontrunners", "poll", "yee"],
			sandboxsave: true,
			hidegearconfig: false,
			preFrontrunnerIds: ["square"],
			secondStrategies: ["zero strategy. judge on an absolute scale.", "zero strategy. judge on an absolute scale.", "zero strategy. judge on an absolute scale."],
			percentSecondStrategy: [0, 0, 0],
			snowman: false,
			firstStrategy: "zero strategy. judge on an absolute scale.",
			keyyee: "pentagon",
			kindayee: "can",
		}


	} else if (htmlname == "election16.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[151, 144],
				[211, 145]
			],
			voterPositions: [
				[187, 188]
			],
			system: "Approval",
			// candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			// arena_border: 0,
			// spread_factor_voters: 2,
			firstStrategy: "normalize",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			oneVoter: true,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true,
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// kindayee: "off",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// autoPoll: "Manual",
		}


	} else if (htmlname == "election17.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[151, 144],
				[211, 145]
			],
			voterPositions: [
				[197, 199]
			],
			// description: "",
			system: "Approval",
			// candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			// arena_border: 0,
			// spread_factor_voters: 2,
			firstStrategy: "normalize frontrunners only",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			oneVoter: true,
			featurelist: ["frontrunners"],
			// sandboxsave: true,
			hidegearconfig: true,
			preFrontrunnerIds: ["triangle", "hexagon"]
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
			// kindayee: "off",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// autoPoll: "Manual",
		}



	} else if (htmlname == "election18.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[151, 144],
				[211, 145]
			],
			voterPositions: [
				[155, 217]
			],
			// description: "",
			system: "Approval",
			// candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			// arena_border: 0,
			// spread_factor_voters: 2,
			firstStrategy: "normalize frontrunners only",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true,
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
			// kindayee: "off",
			// configversion: 1,
			autoPoll: "Auto",
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
		}


	} else if (htmlname == "election19.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[145, 142],
				[211, 145]
			],
			voterPositions: [
				[176, 193]
			],
			system: "FPTP",
			// candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			// arena_border: 0,
			// spread_factor_voters: 2,
			firstStrategy: "normalize",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			oneVoter: true,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true,
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// kindayee: "off",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// autoPoll: "Manual",
		}


	} else if (htmlname == "election20.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[145, 142],
				[211, 145]
			],
			voterPositions: [
				[176, 193]
			],
			system: "FPTP",
			// candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			// arena_border: 0,
			// spread_factor_voters: 2,
			firstStrategy: "normalize frontrunners only",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			oneVoter: true,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true,
			preFrontrunnerIds: ["square", "hexagon"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// kindayee: "off",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// autoPoll: "Manual",
		}


	} else if (htmlname == "election21.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[143, 144],
				[211, 145]
			],
			voterPositions: [
				[138, 175]
			],
			// description: "",
			system: "FPTP",
			// // candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			// arena_border: 0,
			spread_factor_voters: 2,
			firstStrategy: "normalize frontrunners only",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// oneVoter: false,
			featurelist: ["frontrunners"],
			// sandboxsave: true,
			hidegearconfig: true,
			preFrontrunnerIds: ["square", "hexagon"],
			// // secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
			// kindayee: "off",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// autoPoll: "Manual",
		}


	} else if (htmlname == "election22.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[143, 144],
				[211, 145]
			],
			voterPositions: [
				[138, 175]
			],
			// description: "",
			system: "Approval",
			// // candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			// arena_border: 0,
			spread_factor_voters: 2,
			firstStrategy: "normalize frontrunners only",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// oneVoter: false,
			featurelist: ["systems", "voters", "firstStrategy", "autoPoll"],
			// sandboxsave: true,
			hidegearconfig: false,
			preFrontrunnerIds: ["square", "hexagon"],
			// // secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
			// kindayee: "off",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			autoPoll: "Auto",
		}


	} else if (htmlname == "election23.html") {
		config = {
			candidatePositions: [
				[76, 147],
				[143, 144],
				[211, 145]
			],
			voterPositions: [
				[138, 175]
			],
			system: "Approval",
			arena_size: 300,
			spread_factor_voters: 2,
			firstStrategy: "normalize frontrunners only",
			featurelist: [],
			hidegearconfig: true,
			preFrontrunnerIds: ["square", "hexagon"],
			autoPoll: "Auto",
			// configversion: 1,
			// candidates: 3,
			// voters: 1,
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// arena_border: 2,
			// oneVoter: false,
			// features: undefined,
			// sandboxsave: true,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// description: "",
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: [50,50,50,50,50,50,50,50,50,50],
			// voter_group_spread: [190,190,190,190,190,190,190,190,190,190],
			// secondStrategy: "zero strategy. judge on an absolute scale.",
			// doTwoStrategies: true,
			keyyee: "mean",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 60,
			// filename: "election22.html",
			// presethtmlname: "election22.html",
			kindayee: "center",
		}


	} else if (htmlname == "election24.html") {
		config = {
			candidatePositions: [
				[78, 187],
				[44, 54],
				[218, 204]
			],
			voterPositions: [
				[150, 150]
			],
			// description: "",
			system: "Approval",
			// candidates: 3,
			// voters: 1,
			// doTwoStrategies: false,
			arena_size: 300,
			arena_border: 0,
			// spread_factor_voters: 1,
			firstStrategy: "normalize frontrunners only",
			// secondStrategy: "normalize frontrunners only",
			autoPoll: "Auto",
			// configversion: 1,
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true,
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: [50,50,50,50,50,50,50,50,50,50],
			// voter_group_spread: [190,190,190,190,190,190,190,190,190,190],
			keyyee: "triangle",
			// yeefilter: ["square","triangle","pentagon","bob","hexagon"],
			// computeMethod: "ez",
			pixelsize: 30,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
			kindayee: "can",
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
		}


	} else if (htmlname == "election25.html") {
		config = {
			candidatePositions: [
				[75, 184],
				[264, 102],
				[219, 180]
			],
			voterPositions: [
				[149, 174]
			],
			// description: "",
			system: "FPTP",
			// candidates: 3,
			// voters: 1,
			doTwoStrategies: true,
			// arena_size: 300,
			arena_border: 0,
			spread_factor_voters: 2,
			firstStrategy: "normalize frontrunners only",
			secondStrategy: "zero strategy. judge on an absolute scale.",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true,
			preFrontrunnerIds: ["square", "hexagon"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			percentSecondStrategy: ["27", 0, 0, 0, 0, 0, 0, 0, 0, 0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			keyyee: "triangle",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			pixelsize: 12,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
			kindayee: "can",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// autoPoll: "Manual",
		}


	} else if (htmlname == "election26.html") {
		config = {
			candidatePositions: [
				[40, 132],
				[142, 169],
				[200, 157],
				[101, 180],
				[227, 117]
			],
			voterPositions: [
				[53, 144],
				[231, 152]
			],
			// description: "",
			system: "+Primary",
			candidates: 5,
			voters: 2,
			// doTwoStrategies: false,
			// arena_size: 300,
			// arena_border: 0,
			spread_factor_voters: 2,
			firstStrategy: "normalize",
			// secondStrategy: "normalize frontrunners only",
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true,
			preFrontrunnerIds: ["square", "hexagon"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: ["53",0,0,0,0,0,0,0,0,0],
			// voter_group_count: ["200",50,50,50,50,50,50,50,50,50],
			// voter_group_spread: ["237",190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 12,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
			// kindayee: "off",
			// configversion: 1,
			// features: undefined,
			// doPercentFirst: undefined,
			// doFullStrategyConfig: undefined,
			// autoPoll: "Manual",
		}


	} else if (htmlname == "election27.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[101, 189],
				[148, 91],
				[195, 202]
			],
			// description: "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob.",
			// features: undefined,
			system: "Minimax",
			candidates: 5,
			voters: 3,
			// doFullStrategyConfig: undefined,
			// doTwoStrategies: false,
			// doPercentFirst: undefined,
			arena_size: 300,
			arena_border: 0,
			spread_factor_voters: 1,
			// firstStrategy: "normalize",
			// secondStrategy: "normalize frontrunners only",
			// autoPoll: "Auto",
			// configversion: 1,
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// utility_shape: "linear",
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: [50,50,50,50,50,50,50,50,50,50],
			// voter_group_spread: [190,190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 60,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
		}

	} else if (htmlname == "election28.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[101, 189],
				[148, 91],
				[195, 202]
			],
			// description: "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob.",
			// features: undefined,
			system: "RankedPair",
			candidates: 5,
			voters: 3,
			// doFullStrategyConfig: undefined,
			// doTwoStrategies: false,
			// doPercentFirst: undefined,
			arena_size: 300,
			arena_border: 0,
			spread_factor_voters: 1,
			// firstStrategy: "normalize",
			// secondStrategy: "normalize frontrunners only",
			// autoPoll: "Auto",
			// configversion: 1,
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// utility_shape: "linear",
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: [50,50,50,50,50,50,50,50,50,50],
			// voter_group_spread: [190,190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 60,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
		}
	} else if (htmlname == "election29.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[101, 189],
				[148, 91],
				[195, 202]
			],
			// description: "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob.",
			// features: undefined,
			system: "Schulze",
			candidates: 5,
			voters: 3,
			// doFullStrategyConfig: undefined,
			// doTwoStrategies: false,
			// doPercentFirst: undefined,
			arena_size: 300,
			arena_border: 0,
			spread_factor_voters: 1,
			// firstStrategy: "normalize",
			// secondStrategy: "normalize frontrunners only",
			// autoPoll: "Auto",
			// configversion: 1,
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// utility_shape: "linear",
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: [50,50,50,50,50,50,50,50,50,50],
			// voter_group_spread: [190,190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 60,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
		}
	} else if (htmlname == "election30.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[101, 189],
				[148, 91],
				[195, 202]
			],
			// description: "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob.",
			// features: undefined,
			system: "RBVote",
			rbsystem: "Schulze",
			candidates: 5,
			voters: 3,
			// doFullStrategyConfig: undefined,
			// doTwoStrategies: false,
			// doPercentFirst: undefined,
			arena_size: 300,
			arena_border: 0,
			spread_factor_voters: 1,
			// firstStrategy: "normalize",
			// secondStrategy: "normalize frontrunners only",
			// autoPoll: "Auto",
			// configversion: 1,
			// snowman: false,
			// x_voters: false,
			// median_mean: 1,
			// utility_shape: "linear",
			// oneVoter: false,
			featurelist: [],
			// sandboxsave: true,
			hidegearconfig: true
			// preFrontrunnerIds: ["square","triangle"],
			// secondStrategies: ["zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale.","zero strategy. judge on an absolute scale."],
			// percentSecondStrategy: [0,0,0,0,0,0,0,0,0,0],
			// voter_group_count: [50,50,50,50,50,50,50,50,50,50],
			// voter_group_spread: [190,190,190,190,190,190,190,190,190,190],
			// keyyee: "off",
			// yeefilter: ["square","triangle","hexagon","pentagon","bob"],
			// computeMethod: "ez",
			// pixelsize: 60,
			// filename: "sandbox.html",
			// presethtmlname: "sandbox.html",
		}

	} else if (htmlname == "election31.html") {
		config = {

			features: 1,
			system: "FPTP",

			candidates: 3,
			candidatePositions: [
				[50, 125],
				[250, 125],
				[280, 280]
			],

			voters: 1,
			voterPositions: [
				[155, 125]
			]


		}
		update = function (s) {
			s.ui.menu.systems.choose.buttons.forEach(x => x.dom.hidden = (["FPTP", "Condorcet", "Approval", "Score"].includes(x.dom.innerHTML)) ? false : true)
		}
	} else if (htmlname == "elect_bees.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[150, 150],
			],
			candidates: 5,
			theme: "Bees",
			// featurelist: ["yee"],
			featurelist: [],
			hidegearconfig: true,
			keyyee: "mean",
			pixelsize: 30,
			kindayee: "center",
		}

	} else if (htmlname == "elect_quotaApproval.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[150, 150],
			],
			candidates: 5,
			// dimensions:"1D+B",
			dimensions:"2D",
			system: "QuotaApproval",
			hidegearconfig: true,
		}

	} else if (htmlname == "elect_try.html") {
		config = {
			candidatePositions: [
				[92, 69],
				[210, 70],
				[245, 182],
				[149, 250],
				[55, 180]
			],
			voterPositions: [
				[150, 150],
			],
			candidates: 5,
			// dimensions:"1D",
			dimensions:"2D",
			system: "QuotaMinimax",
			hidegearconfig: true,
			configversion: 2.3
		}

	} else if (htmlname == "sandbox.html") {
		config = {
			description: "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob.",
			features: 4,
			system: "FPTP",
			candidates: 5,
			voters: 1,
			doFullStrategyConfig: true,
			doTwoStrategies: false,
			doPercentFirst: false,
			arena_size: 300,
			arena_border: 2,
			spread_factor_voters: 2,
			firstStrategy: "normalize",
			secondStrategy: "normalize frontrunners only",
			autoPoll: "Auto"
		}
	} else if (htmlname == "sandbox_original.html") {
		config = {
			description: "[type a description for your model here. for example...]\n\nLook, it's the whole shape gang! Steven Square, Tracy Triangle, Henry Hexagon, Percival Pentagon, and last but not least, Bob.",
			features: 4,
			system: "FPTP",
			candidates: 5,
			voters: 1
		}
		update = update_original
	} else if (htmlname == "ballot1.html") {
		config = {
			system: "Plurality"
		}

	} else if (htmlname == "ballot2.html") {
		config = {
			system: "Ranked",
			method: "IRV"
		}

	} else if (htmlname == "ballot3.html") {
		config = {
			system: "Approval"
		}

	} else if (htmlname == "ballot4.html") {
		config = {
			system: "Score"
		}

	} else if (htmlname == "ballot5.html") {
		config = {
			system: "Score",
			firstStrategy: "normalize"
		}
	} else if (htmlname == "ballot6.html") {
		config = {
			system: "Score",
			firstStrategy: "best frontrunner",
			preFrontrunnerIds: ["square", "triangle"],
			showChoiceOfFrontrunners: true,
			showChoiceOfStrategy: true
		}
	} else if (htmlname == "ballot7.html") {
		config = {
			system: "Score",
			firstStrategy: "not the worst frontrunner",
			showChoiceOfFrontrunners: true
		}
	} else if (htmlname == "ballot8.html") {
		config = {
			system: "Score",
			firstStrategy: "normalize frontrunners only",
			preFrontrunnerIds: ["square", "triangle"],
			showChoiceOfFrontrunners: true,
			showChoiceOfStrategy: true
		}
	} else if (htmlname == "ballot9.html") {
		config = {
			system: "Score",
			firstStrategy: "normalize frontrunners only",
			preFrontrunnerIds: ["square", "triangle"],
			showChoiceOfFrontrunners: true,
			doStarStrategy: true
		}
	} else if (htmlname == "ballot10.html") {
		config = {
			system: "Three",
			firstStrategy: "normalize frontrunners only",
			preFrontrunnerIds: ["square", "triangle"],
			showChoiceOfFrontrunners: true,
			doStarStrategy: true
		}
	} else if (htmlname == "ballot11.html") {
		config = {
			system: "Score",
			firstStrategy: "best frontrunner",
			preFrontrunnerIds: ["square", "triangle"],
			showChoiceOfFrontrunners: true,
			showChoiceOfStrategy: true
		}
	} else if (htmlname == "ballot12.html") {
		config = {
			system: "Score",
			firstStrategy: "not the worst frontrunner",
			preFrontrunnerIds: ["square", "triangle"],
			showChoiceOfFrontrunners: true,
			showChoiceOfStrategy: true
		}
		// } else if (htmlname == "election.html") {
		// 	config = 
	} else if (htmlname == "ballot13.html") {
		config = {
			system: "Plurality",
			method: "FPTP",
			newWay: true
		}

	} else if (htmlname == "ballot14.html") {
		config = {
			system: "Ranked",
			method: "RankedPair",
			newWay: true
		}

	} else if (htmlname == "ballot15.html") {
		config = {
			system: "Approval",
			newWay: true
		}

	} else if (htmlname == "ballot16.html") {
		config = {
			system: "Score",
			newWay: true
		}

	} else if (htmlname == "ballot17.html") {
		config = {
			system: "Ranked",
			method: "IRV",
			newWay: true
		}
	}
	return {
		config: config,
		update: update,
		modelName: modelName
	}
}