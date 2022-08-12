import { bold, rgb } from "chalk";

const colors = {
    red: [216, 16, 16] as const,
    green: [142, 215, 0] as const,
    blue: [0, 186, 255] as const,
    gold: [255, 204, 0] as const,
    mediumGray: [128, 128, 128] as const,
    darkGray: [90, 90, 90] as const,
};

const logComponentType = (selected: string) =>
    ["class", "pure-class", "functional"]
        .sort((a, b) => (a === selected ? -1 : 1))
        .map((option) =>
            option === selected
                ? `${bold.rgb(...colors.blue)(option)}`
                : `${rgb(...colors.darkGray)(option)}`
        )
        .join("  ");

export function logIntro({
    name,
    dir,
    type,
}: {
    name: string;
    dir: string;
    type: string;
}) {
    console.info("\n");
    console.info(
        `✨  Creating the ${bold.rgb(...colors.gold)(name)} component ✨`
    );
    console.info("\n");

    const pathString = bold.rgb(...colors.blue)(dir);
    const typeString = logComponentType(type);

    console.info(`Directory:  ${pathString}`);
    console.info(`Type:       ${typeString}`);
    console.info(
        rgb(...colors.darkGray)("=========================================")
    );

    console.info("\n");
}

export function logItemCompletion(successText: string) {
    const checkmark = rgb(...colors.green)("✓");
    console.info(`${checkmark} ${successText}`);
}

export function logConclusion() {
    console.info("\n");
    console.info(bold.rgb(...colors.green)("Component created! 🚀 "));
    console.info(rgb(...colors.mediumGray)("Thanks for using new-component."));
    console.info("\n");
}

export function logError(error: any) {
    console.info("\n");
    console.info(bold.rgb(...colors.red)("Error creating component."));
    console.info(rgb(...colors.red)(error));
    console.info("\n");
}
