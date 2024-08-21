// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import "./StudentFile.sol";
// importing String.sol from openzeppelin library
// import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract StudentRecord {
    struct Student {
    //   uint256 id;
      string nik;
      string name;
    }

    mapping(uint256 => Student) public Students;
    event StudentGenerated(string _nik);
    uint256 public studentCounter;

    function addstudentCounter() public 
    {
        studentCounter = studentCounter + 1;
    }

    function generateStudent(
        string memory _nik,
        string memory _name
    ) public {
        // Check if student  with the given ID already exists
        string memory nik_temp = getStudent(_nik).nik;

        require(
            bytes(nik_temp).length == 0,
            "Student with this ID already exists"
        );

        // Create the certificate
        Student memory student = Student({
            // id: studentCounter,
            nik: _nik,
            name: _name
        });

        // Store the certificate in the mapping
        Students[studentCounter] = student;

        studentCounter = studentCounter + 1;

        // Emit an event
        emit StudentGenerated(_nik);
    }

    function getStudent(
        string memory nik
    )
        public
        view
        returns (
          Student memory
        )
    {

        Student memory student;

        uint256 i;
        for (i = 0; i < studentCounter; i++) {
            if (keccak256(bytes(nik)) == keccak256(bytes(Students[i].nik))){
                student = Students[i];
            } else {
                require(
                    i < studentCounter,
                    "Student does not exist"
                );        
            }
        }
        return (
            student
        );
    }

    function isStudent(
        string memory nik
    )
        public
        view
        returns (
          bool
        )
    {

        bool found = false;

        uint256 i;
        while (i < studentCounter && !found) {
            if (keccak256(bytes(nik)) == keccak256(bytes(Students[i].nik))){
                found = true;
            }
        }
        return (
            found
        );
    }

    function getAllStudents()
        public
        view
        returns (Student[] memory)
    {
        Student[] memory result = new Student[](studentCounter);
        for (uint256 i = 0; i < studentCounter; i++) {
          result[i] = Students[i];
        }
        return result;
    }

    // function getAllStudents() public view returns (Students memory) {
    //   return Students;
    // }

  function getNumberOfStudent() public view returns (uint) {
    return studentCounter;
  }
}