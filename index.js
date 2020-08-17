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

    // console.log(process.env.GIT_EMAIL, process.env.GIT_NAME)

    await exec(`git config user.email ${gitEmail}`)
    await exec(`git config user.name ${gitName}`)
    await exec(`git add ${outputFileName}`)
    await exec(`git commit -m "Re-build ${outputFileName}" || echo "No changes to commit"`)
    await exec(`git push origin master || echo "No changes to commit"`)

    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main()
