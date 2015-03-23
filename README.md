# go2

---

**go2** is a simple cli utility that allows you to index the directories you use often and create some kind of alias for them without polluting your shell's environment.

### Installation

**go2** has only been tested on OS X so far, but try giving it a spin on **linux**, it _should_ work.

To install **go2** run: `npm install go2 -g`

You may have to use `sudo`

### Usage

Banner: `go2 help`

	go2 - CLI spaceship that takes you wherever you want
	Usage:
  	- go2 list / ls : will list the current path aliases
  	- go2 add [name] : will add a new alias with the given name for cwd
  	- go2 remove / rm [name] : will remove the given alias
  	- go2 help : will print this silly banner

List drectory aliases: `go2 ls`

	home ---> /Users/september
	desktop ---> /Users/september
	git ---> /Users/september/GIT/

Add current directory with new alias: `go2 add mysecretfolder`
	
	New bind: /Users/september/GIT/go2 ---> go2 mysecretfolder
	
Navigate to an aliased directory: `go2 mysecretfolder`

	Switching to location: /Users/september/GIT/go2
	~:

Remove alias: `go2 rm mysecretfolder`

	Removed alias "mysecretfolder".
	
### Grow the project

Here's how you can help:

* Fix stuff and send a pull request.
* Find bugs and open issues.
* Check the code and see if there's something that can be done in a better way.

### License

**go2**'s code is released under the beautiful **MIT** license, check the `LICENSE` file for more information.