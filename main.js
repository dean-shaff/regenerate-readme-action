const commandLineUsage = require('command-line-usage')
const commandLineArgs = require('command-line-args')

const render = require("./render_README.js")

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
    return
  }


  render.renderREADME(
    options["input-file-name"],
    options["output-file-name"],
    options["keys"],
    options["values"]
  )
}

main()
