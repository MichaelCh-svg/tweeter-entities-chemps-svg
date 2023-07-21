# Steps for setting up project.

1. Run 'npm update' to update and install the dependencies.
    - if you want to install the dependencies without updating them, run 'npm i'.
            - Occasionally updates cause compatibility conflicts, and you may need to revert to an old dependency to get the project running before finding a fix.
    - if you later want to update the dependencies, remove the node_modules folder so that all files will be up to date (not just the ones that get overwritten).
1. Run 'npm run compile'.
    - note: The 'compile' script is defined in the package.json file. 


### Creating a typescript module from scratch.
Follow the instructions at [setup from scratch](SETUP_FROM_SCRATCH.md) to figure out how to create your own typescript module.
