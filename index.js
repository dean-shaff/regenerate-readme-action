const core = require("@actions/core");
const github = require("@actions/github");
const { exec } = require("@actions/exec")

const render = require("./render_README.js")

async function main () {
  try {
    const inputFileName = core.getInput("input-file-name")
    const outputFileName = core.getInput("output-file-name")
    const key = core.getInput("key")
    const value = core.getInput("value")
    const gitEmail = core.getInput("git-email")
    const gitName = core.getInput("git-name")
    const gitBranch = core.getInput("git-branch")


    console.log(`inputFileName=${inputFileName}`)
    console.log(`outputFileName=${outputFileName}`)
    console.log(`key=${key}`)
    console.log(`value=${value}`)
    console.log(`gitEmail=${gitEmail}`)
    console.log(`gitName=${gitName}`)

    render.renderREADME(
      inputFileName,
      outputFileName,
      [key],
      [value]
    )

    await exec(`git config --global user.email ${gitEmail}`)
    await exec(`git config --global user.name ${gitName}`)
    await exec(`git add ${outputFileName}`)
    await exec(`git commit -m "Re-build ${outputFileName}"`)
    await exec(`git push origin ${gitBranch}`)

    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main()
