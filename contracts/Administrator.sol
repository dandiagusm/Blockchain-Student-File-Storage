// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Administrator {
    struct Admin {
      string email;
      string name;
      string password;
    }

    mapping(string => Admin) public Admins;
    event AdminGenerated(string email);

    function generateAdmin(
        string memory _email,
        string memory _name,
        string memory _password
    ) public {
        // Check if certificate with the given ID already exists
        require(
            bytes(Admins[_email].email).length == 0,
            "Admin with this email already exists"
        );

        // Create the certificate
        Admin memory admin = Admin({
            email: _email,
            name: _name,
            password: _password
        });

        // Store the certificate in the mapping
        Admins[_email] = admin;

        // Emit an event
        emit AdminGenerated(_email);
    }

    function getAdmin(
        string memory email,
        string memory password
    )
        public
        view
        returns (
          string memory _name,
          string memory _email,
          string memory _password
        )
    {
        Admin memory admin = Admins[email];

        // Check if the admin with the given email exists
        require(
            bytes(Admins[email].name).length != 0 && bytes(Admins[password].password).length != 0 ,
            "Admin does not exist"
        );

        // Return the values from the certificate
        return (
            admin.name,
            admin.email,
            admin.password
        );
    }

    function isVerified(
        string memory _email
    ) public view returns (bool) {
        return bytes(Admins[_email].name).length != 0;
    }
}