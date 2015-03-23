#! /usr/bin/env node

/* @start Globals */

// List of reserved keywords
var RESERVED_KEYWORDS = [
  "list", "ls",
  "add",
  "remove", "rm",
  "help"
];
var ARGV = process.argv.slice(2);
var ARGC = ARGV.length;

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
  var banner = "BANNER";
  console.log(banner);
}

/* @end Banner */

/* @start Command interpreter */

function run_command(){
  switch(ARGC[1]){
    case "add":
      break;
    case "remove":
    case "rm":
      break;
    case "list":
    case "ls":
      break;
    case "help":
    default:
      print_banner();
      break;
  }
}

/* @end Command interpreter */

/* @start Command functions */

/* @end Command functions */
