var express = require('express');
var router = express.Router();
var fs = require('fs');
var hbs = require('hbs');

// hbs's Helper 注册
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerHelper('list', function(items, options) { 
  var out = "<ul>"; 
 
  for(var i=0, l=items.length; i<l; i++) { 
    out = out + "<li>" + options.fn(items[i]) + "</li>"; 
  } 
 
  return out + "</ul>"; 
});

// hbs's Partial 注册
hbs.registerPartial('partial', fs.readFileSync(__dirname + '/../views/partial.hbs', 'utf8'));
hbs.registerPartials(__dirname + '/../views/partials');

// let hbs = require('hbs');
/* GET home page. */
router.get('/', function(req, res, next) {
var note = {
	immoc: [
	{	teacher: 'itMan',
		openClass: [
			{language: "JavaScript"},
			{language: "HTML"},
			{language: "CSS"}
	]},
	{	teacher: 'Matthew',
		openClass: [
			{language: "语文"},
			{language: "历史"},
			{language: "地理"}
	]},	
	{	teacher: 'Hatchen',
		openClass: [
			{language: "航空发动机"},
			{language: "量子对撞机"},
			{language: "原子裂变"}
	]}
	],
	tennent: [
	{	teacher: 'xioamin',
		openClass: [
			{language: "PHP"},
			{language: "Angular"},
			{language: "Bootstrap"},
			{language: "jQuery"}
	]},
	{	teacher: 'snake',
		openClass: [
			{language: "Laravel5"},
			{language: "Nodejs"},
			{language: "Hbs-Express"}
	]},	
	{	teacher: 'horn',
		openClass: [
			{language: "枪械原理"},
			{language: "电子机"},
			{language: "机器人"}
	]}
	]
	
};
var ls = { 
  people: [ 
    {firstName: "Yehuda", lastName: "Katz"}, 
    {firstName: "Carl", lastName: "Lerche"}, 
    {firstName: "Alan", lastName: "Johnson"} 
  ] 
};
  res.render('index', { title: 'Hbs-Express', 
						note_1: note.immoc[0].openClass,
						p: note.immoc[1].openClass,
						p5: note.immoc[2].openClass,
						people: ls.people
  });
});

router.get('/j', function(req, res, next) {
	res.render('index.jade', { title: 'jade-Express'});
});

module.exports = router;
