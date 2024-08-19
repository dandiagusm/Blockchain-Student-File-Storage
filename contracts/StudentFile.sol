// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract StudentFile {
    struct StdFile {
      address issuer;
      string nik;
      string ipfs_hash;
      uint256 season;
      string created_time;
    }

    mapping(uint256 => StdFile) public StdFiles;
    event StdFileGenerated(string student_file_id);
    uint256 public fileCounter;

    function addFileCounter() public 
    {
        fileCounter = fileCounter + 1;
    }

    function getNumberOfFiles() public view returns (uint256) {
      return fileCounter;
    }

    function generateStdFile(
        address _issuer,
        string memory _nik,
        string memory _ipfs_hash,
        uint256 _season,
        string memory _created_time
    ) public {
        // Check if certificate with the given ID already exists
        // require(
        //     bytes(StdFiles[_student_file_id].ipfs_hash).length == 0,
        //     "Files with this ID already exists"
        // );

        // Create the certificate
        StdFile memory file = StdFile({
            issuer: _issuer,
            nik: _nik,
            ipfs_hash: _ipfs_hash,
            season: _season,
            created_time: _created_time
        });

        // Store the certificate in the mapping
        StdFiles[fileCounter] = file;

        fileCounter = fileCounter + 1;
        // Emit an event
        emit StdFileGenerated(_ipfs_hash);
    }

    function getStdFile(
        string memory cid
    )
        public
        view
        returns (
          StdFile memory
        )
    {

        StdFile memory stdfile;

        uint256 i;
        for (i = 0; i < fileCounter; i++) {
            if (keccak256(bytes(cid)) == keccak256(bytes(StdFiles[i].ipfs_hash))){
                stdfile = StdFiles[i];
            } else {
                require(
                    i < fileCounter,
                    "Student does not exist"
                );        
            }
        }
        return (
            stdfile
        );
    }

    function isFile(
        string memory cid
    )
        public
        view
        returns (
          bool
        )
    {

        bool found = false;

        uint256 i;
        while (i < fileCounter && !found) {
            if (keccak256(bytes(cid)) == keccak256(bytes(StdFiles[i].ipfs_hash))){
                found = true;
            }
        }
        return (
            found
        );
    }

    function getAllFiles()
        public
        view
        returns (StdFile[] memory)
    {
        StdFile[] memory result = new StdFile[](fileCounter);
        for (uint256 i = 0; i < fileCounter; i++) {
          result[i] = StdFiles[i];
          i++;
        }
        return result;
    }

    function getFilesByNik(
        string memory nik
    )
        public
        view
        returns (StdFile[] memory)
    {
        uint count = 0;
        for (uint256 i = 0; i < fileCounter; i++) {
            if (keccak256(bytes(nik)) == keccak256(bytes(StdFiles[i].nik))){
                count = count + 1;
            }
        }

        StdFile[] memory result = new StdFile[](count);
        uint count_enter = 0;
        for (uint256 i = 0; i < fileCounter; i++) {
            if (keccak256(bytes(nik)) == keccak256(bytes(StdFiles[i].nik))){
                result[count_enter] = StdFiles[i];
                count_enter = count_enter + 1;
            }
        }
        return result;
    }
}