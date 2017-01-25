#!/usr/bin/env node

/*
Libraries
 */
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var inquirer = require('inquirer');
var Web3 = require('web3');

/*
Variables
 */
var accountPassword;
var web3;
var contractAddress;
var abi;
var eventName;
var contract;
var event;

/********************************************************************
 1. Print headline
 *******************************************************************/
clear();
console.log(
    chalk.blue(
        figlet.textSync('Contract listener', {horizontalLayout: 'full'})
    )
);

/********************************************************************
 2. Ask for the address of the ethereum client and also for the password of the user
 *******************************************************************/
getWeb3();
function getWeb3() {
    getEthereumProvider(function () {
        accountPassword = arguments[0].password;
        web3 = new Web3(new Web3.providers.HttpProvider(arguments[0].ethereumProvider));
        web3.eth.getBlock('latest', function (error, result) {
            if (!error) {
                web3.eth.defaultAccount = web3.eth.accounts[0];
                unlockDefaultAccount();
            }
            else {
                console.error("Wrong ethereum client address!");
                getWeb3();
            }
        });
    });
}

function getEthereumProvider(callback) {
    var questions = [
        {
            name: 'ethereumProvider',
            type: 'input',
            message: 'Enter your ethereum client address:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your username or e-mail address';
                }
            }
        },
        {
            name: 'password',
            type: 'password',
            message: 'Enter your ethereum user password:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your password';
                }
            }
        }
    ];

    inquirer.prompt(questions).then(callback);
}

function unlockDefaultAccount() {
    web3.personal.unlockAccount(web3.eth.defaultAccount, accountPassword, 999, (function (error, result) {
        if (!error) {
            // all ok
            // console.log(result);
            getContract();
        }
        else {
            console.error("Wrong ethereum password!");
            getWeb3();
        }
    }));
}

/********************************************************************
 3. Ask for the contract address, abi and for the name of the event that we want to subscribe to
  *******************************************************************/
function getContract() {
    getContractArguments(function () {
        contractAddress = arguments[0].contractAddress;
        abi = JSON.parse(arguments[0].contractAbi);
        eventName = arguments[0].eventName;

        web3.personal.unlockAccount(web3.eth.defaultAccount, accountPassword, 9999, eventListener);
    });
}
function getContractArguments(callback) {
    var questions = [
        {
            name: 'contractAddress',
            type: 'input',
            message: 'Enter the address of the contract that you want to listen to:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter the address of the contract that you want to listen to';
                }
            }
        },
        {
            name: 'contractAbi',
            type: 'editor',
            message: 'Enter the ABI of the contract that you want to listen to:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter the ABI of the contract that you want to listen to:';
                }
            }
        },
        {
            name: 'eventName',
            type: 'input',
            message: 'Enter the name of the event that you want to subscribe to:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter the ABI of the contract that you want to listen to:';
                }
            }
        }
    ];

    inquirer.prompt(questions).then(callback);
}
/********************************************************************
 4. Listen to the event of the contract
 *******************************************************************/
function eventListener(error, result) {
    if (!error) {
        contract = web3.eth.contract(abi).at(contractAddress);
        event = contract[eventName]();

        console.log(contract);
        console.log(event);
        event.watch(function (error, eventResult) {
            if (error) {
                console.error(error);
            } else {
                console.log(eventResult);
            }
        });
    }
    else {
        console.error(error);
    }
}

/**
 * TODO Not used so far. At the moment the npm package can only be used as a CLI tool
 */
module.exports = {

    subscribe: function () {
        // watch for changes
        monitoringEvent.watch(function (error, result) {
            if (error) {
                console.error(error);
            } else {
                console.log(result);
            }
        });
    },

    unsubscribe: function () {
        monitoringEvent.stopWatching();
    }

};