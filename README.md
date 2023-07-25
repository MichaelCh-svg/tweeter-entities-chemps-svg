# Steps for compiling this project into a typescript and javascript module
- Compilation will require two files, a tsconfig.json file for compiling the typescript, and a package.json file that handles the javascript settings.
- Run the specified commands in the terminal.


## Compile typescript to javascript

### Create the typescript compilation file (tsconfig.json)

tsc --init

### Compile to javascript

tsc

- tsc is the command for compiling the code.
- This will throw some errors informing of which dependencies and which lib options are missing.

npm install [dependency1] [dependency2]
- This will autogenerate a package.json file with the dependencies.

In the tsconfig.json file, under the "compilerOptions", uncomment "lib": [], and add the dependency mentioned in the errors from running 'tsc' in the terminal.

tsc

- This time, tsc will suggest running a command that starts with npm i --save-dev @types/...
- This is a command that makes a javascript module available as a typescript module, if that has been enabled for that module.

npm i --save-dev @types/[dependency]

### Compile javascript code to a specified directory
- Note that now the project is cluttered with a .js file next to each .ts file. To have clean code, we would like to compile the code to a specified directory

Uncomment  "outDir": "./", in the tsconfig.json file, and add the name of the directory to compile the code to.

Add the following to the package.json file:

"main": "[compilation directory name]/index"
- The code may compile without this but will crash during runtime if used as a javascript module. 
    - If "main" is not set, a javascript project will expect to find the code at index.js in the module root directory instead of in the compilation directory.

### Clean out the project
find . -path './node_modules' -prune -o -name '*.js' -exec rm {} \;
- This will remove all the .js files that were generated in the project, except for the ones in node_modules.

### Clean out the compilation process
Add the following to the package.json:

"scripts": {
    "compile": "npm run clean && tsc",
    "clean": "rm -rf [comppilation directory]"
  }

Now run 'npm run compile' everytime you would like to compile the code
- The compilation directory folder must be removed before recompiling the code, since compilation will override already existing files but will not delete files that should no longer be there.


### Link the module as javascript
Recompile the code using 'npm run compile' so that it is up to date.

From a separate project, run the following command:

npm link --save [path to the module]
- This will throw an undefined error because the module doesn't have a name specified.
- The --save will add the module to the package.json file. If it is not added, then the next time 'npm i' is run, the link will be erased.

Add "name": "[module name]" to the package.json

Rerun the npm link --save [path to the module] from the project.
- It should work this time. 


## Typescript compilation (for reference only):
- Even though this module works as both a typescript and javascript module, it never compiles to typescript in the compilation directory.
- When publishing a module (which we do not do for this course), it might be recommended to only include only the compilation directory in order to save space and have a more professional look. To do so:

Compile typescript declarations to the compilation directory by uncommenting "declaration": true in the tsconfig.json. 
- This will cause compilation to create .d.ts files corresponding to each .js file in the compilation directory, thus making the javascript files available to typescript.

Add the following to the package.json to limit which files are included in publication:

"files": [
    "[compilation directory]/index.js",
    "[compilation directory]/index.d.ts",
    "[compilation directory]/lib"
  ]

