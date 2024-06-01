#! /usr/bin/env node

// following tasks are required to complete "ATM assingment"
// login user for ATM - Done
// PIN CODE verification - Done
// Balance Inquiry - Done
// Fast Cash Withdrawal Options (different values: i.e. 1000, 3000, 5000, 10000, 20000) - Done
// Withdrawal Balance - Done
// Exit

import inquirer from "inquirer";
import { listenerCount } from "process";

type userType = {
  user: string;
  pin: number;

  balance: number;
};

let user: userType = {
  user: "Syed Huzaifa",
  pin: 4321,
  balance: 50000,
};

console.log(`Welcome to ATM build using typeScrpit. \t
There is a dummy account created with User ID ${
  '"' + user.user + '"'
} to use the developed functionality of ATM built.`);

let pinCodeAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: "Enter your PIN Code:",
    type: "password",
  },
]);
if (pinCodeAnswer.pin == user.pin) {
  console.log(
    "Welcome to your Account. You may continue to perform your transaction."
  );

  const userAnswers: userType = await inquirer.prompt([
    {
      type: "list",
      name: "accountType",
      choices: ["Current A/c", "Saving A/c", "Default"],
      message: "Please select your Account Type",
    },
  ]);
  const operationAns = await inquirer.prompt([
    {
      name: "selectedType",
      message: "Select your desired option to perform transaction.",
      type: "list",
      choices: [
        "Balance Inquiry",
        "Fast Cash",
        "Withdrawal Other Amount",
        "Exit",
      ], //TODO: add Deposit, and bill payment
    },

    {
      name: "amount",
      message: "Please Select Amount",
      type: "list",
      choices: [
        "500",
        "1000",
        "3000",
        "5000",
        "7000",
        "10000",
        "15000",
        "20000",
      ],
      when(operationAns) {
        return operationAns.selectedType === "Fast Cash";
      },
      // TODO: amount should be multiple of 500
    },

    {
      name: "amount",
      message: "Please Enter Amount",
      when(operationAns) {
        return operationAns.selectedType === "Withdrawal Other Amount";
      },

      //   TODO: Do you want to try another transaction
    },

    {
      name: "balanceInquiry",
      message: "Your available balance is : ",
      when(operationAns) {
        operationAns.selectedType === "Balance Inquiry";
        if (operationAns.selectedType === "Balance Inquiry") {
          console.log(
            `Dear ${user.user}, Your Balance is ${'"' + user.balance + '"'}.`
          );
        }
      },
    },

    {
      name: "accExit",
      message: "Thanks for using ATM.",
      when(operationAns) {
        if (operationAns.selectedType === "Exit") {
          console.log("Thank You for using ATM.");
        }
      },
    },
  ]);

  if ((user.balance = user.balance -= operationAns.amount))
    console.log(
      `Dear ${'"' + user.user + '"'}, Your remaining balance is ${
        user.balance
      }.`
    );
  else if (operationAns.amount >= user.balance) {
    console.log(
      `Dear ${
        '"' + user.user + '"'
      }, Your have insufficient balance to perform this transaction.`
    );
  }
} else {
  console.log("You have enetered incorrect PIN CODE. Please Try again.!");
}
