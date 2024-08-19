 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Counter {
  uint count = 0;

  function IncrementCount() public{
    count += 1;
  }

  function DecrementCount() public {
    count -= 1;
  }

  function ViewCount() public view returns (uint) {
    return count;
  }

}
