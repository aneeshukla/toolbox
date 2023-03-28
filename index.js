const fs = require('fs');

const unStringify = () => {
    const type = process.argv[2];
    console.log("Processing ", type)
    // paste the stringified json here
    var fileContent = readFile(getFromFilePathByType(type));
    processByType(type, fileContent);
    console.log("unStringify complete!");
}

const processByType = (type, fileContent) => {
    const toFile = getToFilePathByType(type);
    switch (type) {
        case "json": processJson(toFile, fileContent);
            break;
        case "csv": processCsv(toFile, fileContent);
            break;
        default: throw new Error("Unsupported type");
    }
}

const processJson = (toFile, fileContent) => {
    fs.writeFileSync(toFile, JSON.parse(fileContent), 'utf8');
    console.log(`Output stored in ${toFile}`);
}

const processCsv = (toFile, fileContent) => {
    let csvContent = fileContent.slice(1, -1);
    const replaceMap = {
        "\\n": "\n",
        "\\\"": "\""
    };
    for (const [from, to] of Object.entries(replaceMap)) {
        csvContent = csvContent.replaceAll(from, to);
    }

    fs.writeFileSync(toFile, csvContent, 'utf8');
    console.log(`Output stored in ${toFile}`);
}

const getFromFilePathByType = (type) => {
    return `./from/${type}.txt`;
}

const getToFilePathByType = (type) => {
    return `./to/to.${type}`;
}

const readFile = (file) => {
    return fs.readFileSync(file, 'utf8');
}

unStringify();