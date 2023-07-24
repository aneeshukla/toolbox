const fs = require("fs");

const utilities = require("./utilities");

const convertByType = (type, folder) => {
    switch (type) {
        case "import":
            convertImportToRequire(folder);
            break;
        case "export":
            convertExport(folder);
            break;
        default:
            "Unsopported convertion";
            break;
    }
};

const convertImportToRequire = (folder) => {
    _getFilesInDirectory(folder).forEach((fileName) => {
        const linesWithImport = utilities
            .readFile(folder + fileName)
            .split(/\r?\n/)
            .filter((line) => line.includes("import "));
        const requireStatements = linesWithImport.map((line) => {
            const aLine = line
                .slice(0, -1)
                .split(" ")
                .filter((keyword) => keyword !== "from");
            // handle case where named imports are used { name , specific } from 'lib'
            // get the lib name and remove from array
            const rhs = aLine.pop();
            // remove import keyword
            aLine.shift();
            return `const ${aLine.join("")} = require(${rhs});`;
        });
        if (requireStatements.length) {
            console.log("====" + fileName + "====");
            console.log(requireStatements.join("\n"));
            console.log("====END====\n");
        }
    });
};

const convertExport = (folder) => {
    _getFilesInDirectory(folder).forEach((fileName) => {
        const fileContent = utilities.readFile(folder + fileName);
        fs.writeFileSync(
            folder + fileName,
            fileContent.replace("export default", "module.exports ="),
            "utf8"
        );
    });
};

const _getFilesInDirectory = (folder) => {
    const files = fs.readdirSync(folder).filter((file) => {
        return file.includes(".js");
    });
    console.log("Fetching the requrie statements for the following files:", files);
    return files;
};

const type = process.argv[2]; // "./tests/";
const folder = process.argv[3]; // "./tests/";
convertByType(type, folder);
