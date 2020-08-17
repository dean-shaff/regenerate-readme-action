const core = require("@actions/core");
const github = require("@actions/github");

const render = require("./render_README.js")


try {
  const inputFileName = core.getInput("input-file-name")
  const outputFileName = core.getInput("output-file-name")
  const key = core.getInput("key")
  const value = core.getInput("value")

  console.log(`inputFileName=${inputFileName}`)
  console.log(`outputFileName=${outputFileName}`)
  console.log(`key=${key}`)
  console.log(`value=${value}`)

  render.renderREADME(
    inputFileName,
    outputFileName,
    [key],
    [value]
  )
  const nameToGreet = core.getInput("who-to-greet");

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
