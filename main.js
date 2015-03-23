#! /usr/bin/env node

/* @start Globals */

// List of reserved keywords
var RESERVED_KEYWORDS = [
  'list', 'ls',
  'add',
  'remove', 'rm',
  'help'
];

var ARGV = process.argv.slice(2);
var ARGC = ARGV.length;
var CWD = process.cwd();
var PATH = './';
var DATA = {
  "home" : process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME']
};

/* @end Globals */

/* @start Main */

if(ARGC == 0){
	print_banner();
} else {
	run_command();
}	

/* @end Main */

/* @start Banner */

function print_banner(){
  var banner = 'BANNER';
  console.log(banner);
  exit();
}

/* @end Banner */

/* @start Command interpreter */

function run_command(){
  switch(ARGV[0]){
    case 'add':
      command_add();
      break;
    case 'remove':
    case 'rm':
      command_rm();
      break;
    case 'list':
    case 'ls':
      command_ls();
      break;
    case 'help':
      print_banner();
      break;
    default:
      go2();
      break;
  }
}

/* @end Command interpreter */

/* @start Command functions */

function command_add(){
  if(ARGC != 2) {
    print_banner();
    return;
  }
  var alias = ARGV[1];
  if(RESERVED_KEYWORDS.indexOf(alias) != -1){
    console.log('ERROR: Pick a different name for this location, "%s" is reserved.', alias);
  } else {
    console.log('New bind: %s ---> go2 %s', CWD, alias);
    console.log('You can now use "go2 %s" to cd into this directory.', alias);
  }
  exit();
}

function command_rm(){
  if(ARGC != 2) {
    print_banner();
    return;
  }
  var alias = ARGV[1];
  if(DATA.hasOwnProperty(alias)){
    console.log('Removed alias "%s".', alias);
  } else {
    console.log('ERROR: Specified alias "%s" does not exist.', alias);
  }
  exit();
}

function command_ls(){
  for(var alias in DATA){
    console.log('%s ---> %s', alias, DATA[alias]);
  }
  exit();
}

function go2(){
  if(ARGC != 1) {
    print_banner();
    return;
  }
  var alias = ARGV[0];
  if(DATA.hasOwnProperty(alias)){
    var location = DATA[alias];
    console.log("Switching to location: %s", location);
    PATH = location;
  } else {
    console.log('ERROR: Could not find alias "%s".', alias);
  }
  exit();
}

function exit(){
  console.log(PATH);
}

/* @end Command functions */


