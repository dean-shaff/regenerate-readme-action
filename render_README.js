const fs = require("fs")

const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')

function format(str, keys, values) {
  for (var idx=0; idx<keys.length; idx++) {
    str = str.replace(`{${keys[idx]}}`, values[idx])
  }
  return str
}


function renderREADME(inputFileName, outputFileName, keys, values)
{
  console.log(`inputFileName=${inputFileName}, outputFileName=${outputFileName}, keys=${keys}, values=${values}`)
  const contents = fs.readFileSync(inputFileName, "utf8")
  const newContents = format(contents, keys, values)
  fs.writeFileSync(outputFileName, newContents, "utf8")
}


exports.renderREADME = renderREADME
