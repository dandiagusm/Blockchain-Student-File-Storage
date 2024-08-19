// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Administrator {
    struct Admin {
      string id;
      string name;
      string contact;
    }

    mapping(string => Admin) public Admins;
    event AdminGenerated(string std_id);

    function generateAdmin(
        string memory _id,
        string memory _name,
        string memory _contact
    ) public {
        // Check if certificate with the given ID already exists
        require(
            bytes(Admins[_id].id).length == 0,
            "Student with this ID already exists"
        );

        // Create the certificate
        Admin memory admin = Admin({
            id: _id,
            name: _name,
            contact: _contact
        });

        // Store the certificate in the mapping
        Admins[_id] = admin;

        // Emit an event
        emit AdminGenerated(_id);
    }

    function getAdmin(
        string memory id
    )
        public
        view
        returns (
          string memory _name,
          string memory _contact
        )
    {
        Admin memory admin = Admins[id];

        // Check if the certificate with the given ID exists
        require(
            bytes(Admins[id].name).length != 0,
            "Admin does not exist"
        );

        // Return the values from the certificate
        return (
            admin.name,
            admin.contact
        );
    }

    function isVerified(
        string memory _id
    ) public view returns (bool) {
        return bytes(Admins[_id].name).length != 0;
    }
}