# How to publish a typescript module

1. Copy code for package.json and tsconfig.json from the following link:
https://60devs.com/guides/publishing-a-typescript-module-to-npm.html#:~:text=1%20Step%201.%20Create%20the%20folder%20structure%20create,the%20global%20registry.%20...%204%20Step%204.%20Publishing

2. Make the following changes to tsconfig.json:
    - add "esModuleInterop": true, to the compileroptions.
    - add "lib": ["ES2021"], to the compileroptions

3. Make the following changes to package.json:

    - Change the name of the module in the "name" parameter at the top. Make sure it is not the same name as an already existing public npm module.
    - Replace "typescript": "^2.6.1" from devDependencies with version 5 or later.
        - e.g., "typescript": "^5.1.6". 


3. Install the modules that you will need.

4. Check that the 'tsc' command works in the terminal without error.

5. Run npm adduser, and follow the instructions for logging in or signing up.

6. Run 'npm publish'.

## How to publish a new version
1. Change the "version": "0.0.1" parameter in the package.json to a new version. 
2. Run 'npm publish' in the terminal.

## Lookout
- Sometimes, after changing the package.json file, you may need to delete the package-lock.json file before running npm i.
    - This may be necessary if you get the following error:
'error TS1084: Invalid 'reference' directive syntax.
35 /// <reference lib="es2017" />'

- Make sure to place the files to compile in the libs folder, or else add a new folder to the tsconfig "include" options. Otherwise they will not be included in compilation.
- Sometimes the errors when publishing a module are not descriptive. 
    - For example, you could get a login error if you try to publish a module with the name of an already existing public module.
    - You could also get an error if you delete a module then try to republish it, since it needs some time
to delete it completely.
