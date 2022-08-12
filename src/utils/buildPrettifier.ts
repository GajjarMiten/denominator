import prettier from "prettier";
import fs from "fs";
import path from "path";

export const buildPrettifier = (prettierConfig: any) => {
    let config = prettierConfig;

    if (!config) {
        const currentPath = process.cwd();

        try {
            config = fs.readFileSync(path.join(currentPath, "/.prettierrc"), {
                encoding: "utf8",
                flag: "r",
            });
        } catch (err) {
            // No big deal, they don't have a prettier config
        }

        if (config) {
            try {
                config = JSON.parse(config);
            } catch (err) {
                console.error(
                    "Count not parse .prettierrc, does not appear to be JSON"
                );
            }
        }
    }

    return (text: any) => {
        return prettier.format(text, config);
    };
};
