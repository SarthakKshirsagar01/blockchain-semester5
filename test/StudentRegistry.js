const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StudentRegistry", function () {
  // ✓ TEST 1 — its own it() block
  it("should register a student and retrieve their data", async function () {
    const [owner] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory("StudentRegistry");
    const registry = await Registry.deploy();

    await registry.registerStudent("Arjun", 42);
    const [name, rollNumber] = await registry.getStudent(owner.address);
    expect(name).to.equal("Arjun");
    expect(rollNumber).to.equal(42n);
  }); // ← Test 1 closes here

  // ✓ TEST 2 — its own separate it() block
  it("should revert if a non-owner tries to register", async function () {
    const [owner, attacker] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory("StudentRegistry");
    const registry = await Registry.deploy();

    await expect(
      registry.connect(attacker).registerStudent("Hacker", 99),
    ).to.be.revertedWith("Only owner can call this function");
  }); // ← Test 2 closes here

  it("should emit a StudentRegistered event", async function () {
    const [owner] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory("StudentRegistry");
    const registry = await Registry.deploy();

    await expect(registry.registerStudent("Arjun", 42))
      .to.emit(registry, "StudentRegistered")
      .withArgs(owner.address, "Arjun", 42n);
  });

  it("should revert when fetching an unregistered student", async function () {
    const [owner, stranger] = await ethers.getSigners();
    const Registry = await ethers.getContractFactory("StudentRegistry");
    const registry = await Registry.deploy();

    // stranger was never registered — getStudent must revert
    await expect(registry.getStudent(stranger.address)).to.be.revertedWith(
      "Student does not exist",
    );
  });
}); // ← describe closes here
