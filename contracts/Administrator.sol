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
        require(
            bytes(Admins[_email].email).length == 0,
            "Admin with this email already exists"
        );

        Admin memory admin = Admin({
            email: _email,
            name: _name,
            password: _password
        });

        Admins[_email] = admin;

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

        require(
            keccak256(bytes(Admins[email].email)) == keccak256(bytes(email)) && keccak256(bytes(Admins[email].password)) == keccak256(bytes(password)),
            "Admin does not exist"
        );

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