import yaml from 'yaml';
import fs from 'fs/promises';
import path from 'path';
import semver from 'semver';
import chalk from 'chalk';

type Requirements = {
  dependencies: Record<string, string>;
};

type Package = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

const readPackage = async (): Promise<Package> => {
  const packageJson = await fs.readFile(path.resolve('./package.json'));

  return {
    dependencies: {},
    devDependencies: {},
    ...JSON.parse(packageJson.toString()),
  };
};

const readRequirements = async (): Promise<Requirements> => {
  return {
    dependencies: {
      chalk: "4.0.0",
    },
  };
};

export const satisfies = (
  packageVersion: string,
  requirement: string
): boolean => {
  return semver.gte(packageVersion, requirement);
};

const report = (name: string, version: string, minVersion: string): void => {
  console.log(
    `The minimum accepted version of ${name} is ${chalk.green(
      minVersion
    )}, but your repo uses ${chalk.red(version)}`
  );
};

export const check = async (): Promise<boolean> => {
  let passed = true;
  const requirements = await readRequirements();
  const packageJson = await readPackage();
  const allDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  if (requirements.dependencies) {
    Object.entries({
      ...requirements.dependencies,
    }).forEach(([name, minVersion]) => {
      const version: string = allDependencies[name];
      if (!satisfies(version, minVersion)) {
        passed = false;
        report(name, version, minVersion);
      }
    });
  }

  return passed;
};
