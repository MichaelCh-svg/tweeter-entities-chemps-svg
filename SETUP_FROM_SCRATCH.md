# How to publish a typescript module

1. Copy code for package.json and tsconfig.json from the following link:
https://60devs.com/guides/publishing-a-typescript-module-to-npm.html#:~:text=1%20Step%201.%20Create%20the%20folder%20structure%20create,the%20global%20registry.%20...%204%20Step%204.%20Publishing

2. Make the following changes to tsconfig.json:
    - add "esModuleInterop": true, to the compileroptions.
    - add "lib": ["ES2021"], to the compileroptions
    <br><br>
3. Make the following changes to package.json:
    - Either remove typescript from devDependencies, or update typescript to version 5 or later.
    <br><br>

3. Update/install the modules that you will need.

4. Check that the 'tsc' command works in the terminal without error.

5. Run 'nmp i' to install the dependencies.
5. Run 'npm run compile'.
    - note: The 'compile' script is defined in the package.json file. 

## Additional instructions
- To change the name of the module, change the"name" parameter in the package.json file.

## Lookout
- Sometimes, after changing the package.json file, you may need to delete the package-lock.json file before running npm i.
    - This may be necessary if you get the following error:
'error TS1084: Invalid 'reference' directive syntax.
35 /// <reference lib="es2017" />'
<br><br>
- Make sure to place the files to compile in the libs folder, or else add a new folder to the tsconfig "include" options. Otherwise they will not be included in compilation.
