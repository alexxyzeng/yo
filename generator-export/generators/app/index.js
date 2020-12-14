"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const process = require("process");
const path = require("path");
const childProcess = require("child_process");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the superb ${chalk.red("generator-export")} generator!`)
    );

    const prompts = [
      {
        type: "confirm",
        name: "isTS",
        message: "是否使用TypeScript？",
        default: false
      },
      {
        type: "input",
        name: "dirPath",
        message: "请输入要生成导出的路径",
        default: process.cwd()
      },
      {
        type: "input",
        name: "fileName",
        message: "请输入要生成的文件名",
        default: "index"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // This.fs.copy(
    //   this.templatePath("dummyfile.txt"),
    //   this.destinationPath("dummyfile.txt")
    // );

    const { isTS, dirPath, fileName } = this.props;
    const wholePath = path.resolve(dirPath);
    const extension = isTS ? "ts" : "js";
    childProcess.execSync(`npx generate-export . ${fileName}.${extension}`, {
      stdio: "inherit",
      cwd: wholePath
    });
  }

  // Install() {
  //   // this.installDependencies({ yarn: true });
  //   console.log(this.props);
  // }
};
