# UDE work flow
## Prerequisites:
- Download & Install [nodejs](https://nodejs.org/en/download/)
- Download & Install [yarn](https://yarnpkg.com/) (Depends on Node.js)
- Download & Install a Code Editor. We are using [VSCode](https://code.visualstudio.com/download)


## Setup
- cd to the project root
- run the following commands:
    - `yarn install`
        - this downloads all of the project dependencies to your machine

- `yarn build`
    - Builds the project and distributes the output files to the dist directory.
- `yarn start`
    - Compile the all src files and distributes files to dist directory.
    - Server the page on http://localhost:5000/ url 

### Unit Tests

- `yarn test`
    - Triggers all the unit test cases specified by any file ending in .test.ts
    - Unit test report is available at coverage/lcov-report/index.html


### USES of this App

    1. open browser - http://localhost:5000/
    2. Click on 'Login '
    3. Click here .... for Edit view
    4. Editor view will be display main menu , treeview and other controls. 

