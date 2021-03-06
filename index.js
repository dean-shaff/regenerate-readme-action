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
    const gitBranchPath = core.getInput("git-branch")
    let gitBranchPathSplit = gitBranchPath.split("/")
    const gitBranch = gitBranchPathSplit[gitBranchPathSplit.length - 1]


    console.log(`inputFileName=${inputFileName}`)
    console.log(`outputFileName=${outputFileName}`)
    console.log(`key=${key}`)
    console.log(`value=${value}`)
    console.log(`gitEmail=${gitEmail}`)
    console.log(`gitName=${gitName}`)
    console.log(`gitBranchPath=${gitBranchPath}`)
    console.log(`gitBranch=${gitBranch}`)

    render.renderREADME(
      inputFileName,
      outputFileName,
      [key],
      [value]
    )

    await exec(`git config --global user.email ${gitEmail}`)
    await exec(`git config --global user.name ${gitName}`)
    await exec(`git add ${outputFileName}`)
    try {
      await exec(`git commit -m "Re-build ${outputFileName}"`)
    } catch (error) {
      console.log("nothing to commit!")
    }
    try {
      await exec(`git push origin ${gitBranch}`)
    } catch (error) {
      console.log("nothing to commit!")
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

main()
