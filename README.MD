# Ethereum Wallet

## About

This is a simple Ethereum Wallet, built with react native for Android. IDEs: Android Studio/VSCode.
Most of the actual code will be found in the eth and src folders.

## Installation

After cloning the project
```
  npx react-native run-android
```
Metro bundler will then install and run the app on your running emulator.

## Using the app

First create a password, you can navigate from the home page using the corresponding button. This application only supports one password at a time. If you already have a password created and then you create another one, the original will be overridden.

Next view your wallet. Before viewing you will be prompted to verify your password. 

If this is the first time using the app, an Ethereum Address and private key will be generated for you. On re-entry to the application the already generated address/private key will persist. 

In the view wallet screen, there is a button to generate a new address/private key. If you do, your original will be overridden.

## Things that could of gone better

There are a number of things that I could be better with this application. The most important one is the security of information and how it's stored. The application uses async storage as a means to keep track of pass/address/private keys. Unfortunately this is not a secure way of storing information, and if someone was able to get a hold of your phone/sim then your information would be un-encrypted and able to view. I wanted to use "React-Native-Keystore', as this provides a way to hold memory on the user's phone while also encrypting it. However I had some environment issues with the module, and I ran out of time before I could get it fixed/implemented. 

Another thing that I did not get to implement was the entropy generator. The plan was to use "React-Native-SecureRandom' as a way to generate the 16 byte random string used to initialize the keystores. 

And lastly the UI is very scrapy. This was my first time using React-Native, so there were a lot of UI things I had to learn, and many more that I still need to learn.


