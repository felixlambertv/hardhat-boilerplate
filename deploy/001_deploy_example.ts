import { Lock__factory } from "./../typechain-types/factories/Lock__factory";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;

  type LockDeploArgs = Parameters<Lock__factory["deploy"]>;

  const { deployer } = await getNamedAccounts();

  const lockContract = await deployments.getOrNull("Lock");
  if (!lockContract) {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    const args: LockDeploArgs = [unlockTime];

    await deployments.deploy("Lock", {
      contract: "Lock",
      from: deployer,
      args: args,
      log: true,
    });
  }
};

func.tags = ["LockContract"];

export default func;
