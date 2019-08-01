# Avec Test

**Author**: Vinícius Viana dos Santos

**Program**: Using the library puppeteer, request info from the [**Avec website**](https://avec.app/) and
  store in a JSON file, with the following structure:

```js
  [
    {
        "salao":"nome do salao",
        "logo":"nome_arquivo.png"
    },
    {
        "salao":"nome do salao",
        "logo":"nome_arquivo.png"
    }
  ]
```

## Prerequisites

To run this project, install the following libraries:
- [Puppeteer](https://github.com/GoogleChrome/puppeteer)
- [fs](https://www.npmjs.com/package/fs)

## Run

To execute this script, run the following script:

`npm start`

or run:

 `node index.js`

## Others
If you want a different filter to search, include the info in the file *__info-search.js__*

**Example**:
```js
module.exports = {
  establishment: 'SALAO_DE_BELEZA',
  location: 'São Paulo',
}
```
  The results will be available in the directory */response*
