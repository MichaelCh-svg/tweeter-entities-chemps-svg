if creat module with name of already existing public module, then get login error
// change target, in tsconfig.json
add  "esModuleInterop": true,  to compileroptions in tsconfig.json

place files into libs folder, or else create a new directory and add it to the includes of the tsconfig.json

test if compiles using 'tsc' in command line

setup:
tsconfig.json

Copy code for package.json and tsconfig.json from following link:
https://60devs.com/guides/publishing-a-typescript-module-to-npm.html#:~:text=1%20Step%201.%20Create%20the%20folder%20structure%20create,the%20global%20registry.%20...%204%20Step%204.%20Publishing

In tsconfig.json, make the following changes:
add "esModuleInterop": true, to the compileroptions.
add "lib": ["ES2021"], to the compileroptions

In package.json, make the following changes:

Replace "typescript": "^2.6.1" from devDependencies with "typescript": "^5.1.6". 
If you already have a package-lock.json file, then after changing package.json, delete package-lock.json and run 'npm i' to regenerate it.
--If you fail to do so, it will complain something like this:
'error TS1084: Invalid 'reference' directive syntax.

35 /// <reference lib="es2017" />'


Run 'npm install moment uuid', or install any other modules that you may need for this project.

Make sure that 'tsc' in the command line runs without error before continuing.

Run 'npm publish'.
-If you have not yet logged in to npm, you will need to do that.
-Run npmadduser, click enter, and a create account page will show up in the browser. Create an account and login.
-You can then save your login info in the .npmrc file. This is located in C:/Users/{username}.
It should already have the following line if you logged in:
//registry.npmjs.org/:_authToken=npm_{authtoken}

Add the follwing 3 lines:
registry=https://registry.npmjs.com/
email={email}
always-auth=true

You will also need the following line:
//registry.npmjs.com/:_authToken=npm_{different auth token}

You may need to do npm adduser again after adding the previous 3 lines for this line to generate.

This should save your login so you don't have to login every time you click publish.

If you want to publish a new version of the same module, change the "version": "0.0.1" parameter in the 
package.json to a new version. 
Then type 'npm publish' in the terminal. This has been successful without regenerating the package-lock.json file.



Lookout,
Make sure to place the files to compile in the libs folder, or else add a new folder to the 
tsconfig "include" options. Otherwise they will not be included in compilation.
Sometimes the errors when publishing a module are not descriptive. 
For example, you could get a login error if you try to publish a module with the name
of an already existing public module.
You could also get an error if you delete a module then try to republish it, since it needs some time
to delete it completely.

If you change the package.json file, for example, changing the name of the module or
changing a dependency, it doesn't automatically update the packae-lock.json file. This
can create further errors that are non-descriptive.

You may need to delete the package-lock.json file and then run npm i to regenerate it.
