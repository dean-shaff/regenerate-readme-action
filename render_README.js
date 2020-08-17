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


function main() {

  const optionDefinitions = [
    { name: 'input-file-name', alias: 'i', type: String },
    { name: 'output-file-name', alias: 'o', type: String },
    { name: 'keys', alias: 'k', type: String, multiple: true },
    { name: 'values', alias: 'v', type: String, multiple: true },
    { name: "help", alias: "h", type: Boolean }
  ]
  const sections = [
    {
      header: 'Generate README from template'
    },
    {
      header: 'Main options',
      optionList: optionDefinitions
    }
  ]

  const options = commandLineArgs(optionDefinitions)
  if (options.help) {
    const usage = commandLineUsage(sections)
    console.log(usage)
  }


  renderREADME(
    options["input-file-name"],
    options["output-file-name"],
    options["keys"],
    options["values"]
  )


}


main()

exports.renderREADME = renderREADME
