var l = new Loader()
l.onload = function(){

  // CREATE
  var model = new Model();
  // CONFIGURE
  model.border = 2
  // INIT
  model.initDOM()

  var modelName = "model1"
  var basediv = document.querySelector("#" + modelName)
  basediv.appendChild(model.dom);

  model.start = function(){
    // CREATE
    model.voters.push(new SingleVoter(model))
    model.candidates.push(new Candidate(model))
    model.candidates.push(new Candidate(model))
    // CONFIGURE
    Object.assign( model.voters[0],    {x:125, y:200, type: new PluralityVoter(model)} )
    Object.assign( model.candidates[0],{x: 50, y:125, id:"square"} )
    Object.assign( model.candidates[1],{x:250, y:125, id:"triangle"} )
    // INIT
    model.initMODEL()
    model.voters[0].init()
    model.candidates[0].init()
    model.candidates[1].init()
    // UPDATE
    model.update()
  };
  model.onUpdate = function(){
    var id = model.voters[0].ballot.vote;
    var color = Candidate.graphics[model.skin][id].fill;
    var text = "VOTES FOR <b style='color:"+color+"'>"+id.toUpperCase()+"</b>";
    model.caption.innerHTML = text;
  };

  // UPDATE
  model.start();

};
l.load([
"play/img/voter_face.png",
"play/img/square.png",
"play/img/triangle.png",
"play/img/hexagon.png"
]);
