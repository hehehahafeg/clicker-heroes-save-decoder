# Clicker Heroes save file decoder (unity format)

## Requirements

1. [Node.js](https://nodejs.org/en)

## How to use

1. In game save your data and put into `clickerHeroSave.txt` file
2. Specify required options changes in `index.mjs`. For example you can change number of `autoclickers`, `rubies` or any other data. Look at debug file for all available options
3. Run `node index.mjs` to modify your save file
4. Copy `clickerHeroSave.txt` contents and import in game
