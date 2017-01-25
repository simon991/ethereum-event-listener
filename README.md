# Ethereum contract event listener
This NPM module can subscribe to events that are fired by contracts in the Ethereum blockchain. At this
time the module can only be used as a CLI tool.

## Installation
At the moment there are two possibilities to run the CLI tool.

https://www.npmjs.com/package/ethereum-listener

### 1. Run the script locally
First download the project from Github and navigate to the project directory. 
Then simply run:

`$ node index.js`

### 2. Install as global NPM package
Install the CLI tool as a global NPM packe by running:

`$ npm install ethereum-listener -g`

Now you can easily start the script by typing:

`$ ethereum-listener`

## Usage
The usage of this script is self explaining. It will ask you for the address of your ethereum client and the
password for the first user (the one at eth.accounts[0]). Then it asks for the contract address as well as
for the contract abi. The last thing you need to provide is the name of the event that you want to subscribe to.

```
  _____   _     _                                                  _   _         _                                
 | ____| | |_  | |__     ___   _ __    ___   _   _   _ __ ___     | | (_)  ___  | |_    ___   _ __     ___   _ __ 
 |  _|   | __| | '_ \   / _ \ | '__|  / _ \ | | | | | '_ ` _ \    | | | | / __| | __|  / _ \ | '_ \   / _ \ | '__|
 | |___  | |_  | | | | |  __/ | |    |  __/ | |_| | | | | | | |   | | | | \__ \ | |_  |  __/ | | | | |  __/ | |   
 |_____|  \__| |_| |_|  \___| |_|     \___|  \__,_| |_| |_| |_|   |_| |_| |___/  \__|  \___| |_| |_|  \___| |_|   
                                                                                                                                                                                                                       
? Enter your ethereum client address: http://localhost:8545
? Enter your ethereum user password: ***
? Enter the address of the contract that you want to listen to: 0x593d12e2676e50b0254346f1bac6ff1257323706
? Enter the ABI of the contract that you want to listen to: Received
? Enter the name of the event that you want to subscribe to: newMonitorRecord
```