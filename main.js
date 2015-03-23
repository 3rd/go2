#! /usr/bin/env node

/* @start Modules */

var fs = require('fs');
var path = require('path');

/* @end Modules */

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
var HOME_DIRECTORY = process.env['HOME'];
var DATA_FILE = path.join(HOME_DIRECTORY, '.go2.json');
var DATA = {
  'home' : HOME_DIRECTORY
};

/* @end Globals */

/* @start Main */

fs.exists(DATA_FILE, function(exists){
  if(exists){
    fs.readFile(DATA_FILE, function(err, data){
      if(!err){
        try {
          DATA = JSON.parse(data);
        } catch(ex){}
      }
      if(ARGC == 0){
          print_banner();
      } else {
        run_command();
      }
    });
  } else {
    if(ARGC == 0){
        print_banner();
    } else {
      run_command();
    }
  }
});

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
    DATA[alias] = CWD;
    save_data(function(){
      console.log('New bind: %s ---> go2 %s', CWD, alias);
      exit();
    });
  }
}

function command_rm(){
  if(ARGC != 2) {
    print_banner();
    return;
  }
  var alias = ARGV[1];
  if(DATA.hasOwnProperty(alias)){
    delete DATA[alias];
    save_data(function(){
      console.log('Removed alias "%s".', alias);
      exit();
    });
  } else {
    console.log('ERROR: Specified alias "%s" does not exist.', alias);
    exit();
  }
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
    console.log('Switching to location: %s', location);
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

/* @start Storage functions */

function save_data(callback){
  fs.writeFile(DATA_FILE, JSON.stringify(DATA), function(err){
    if(err){
      console.log('ERROR: Could not save configuration file to "%s".', DATA_FILE);
    }
    callback();
  });
}

/* @end */

