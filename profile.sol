// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Profiles {

    struct Profile {
        uint256 id;
        string ocid;
        address userAdr;
        bool isRegistered;
    }

    struct Trait {
        uint256 id;
        string desc;
        string uri;
    }

    // Profil ve trait için ID counterları
    uint256 public profileIdCounter;
    uint256 public traitIdCounter;

    // Profil ve traitleri saklamak için mappingler
    mapping(uint256 => Profile) public profiles; // Profil ID'sine göre profil
    mapping(uint256 => Trait) public traits;      // Trait ID'sine göre trait
    mapping(uint256 => uint256[]) public profileTraits; // Profil ID'sine göre trait ID'lerini tutan array

    // Toplam profil sayısını tutan değişken
    uint256 public profileCount;

    // Profil oluşturma fonksiyonu
    function createProfile(string memory _ocid) public {
        uint256 profileId = profileIdCounter++;  // Yeni profil ID'si ve counter'ı artır
        profiles[profileId] = Profile({
            id: profileId,          // Profil ID'si
            ocid: _ocid,
            userAdr: msg.sender,
            isRegistered: true
        });

        profileCount++;  // Toplam profil sayısını artır
    }

    // Trait ekleme fonksiyonu (sadece kontrat sahibi tarafından yapılabilir)
    function addTrait(string memory _desc, string memory _uri) public onlyOwner {
        uint256 traitId = traitIdCounter++;  // Yeni trait ID'si ve counter'ı artır
        traits[traitId] = Trait({
            id: traitId,           // Trait ID'si
            desc: _desc,
            uri: _uri
        });
    }

    // Bir profile trait eklemek için fonksiyon
    function addTraitToProfile(uint256 _profileId, uint256 _traitId) public {
        require(profiles[_profileId].isRegistered, "Profile not registered.");
        require(traits[_traitId].id == _traitId, "Trait not found.");
        
        profileTraits[_profileId].push(_traitId);
    }

    // Bir profile ait tüm trait'leri getirme fonksiyonu
    function getProfileTraits(uint256 _profileId) public view returns (Trait[] memory) {
        require(profiles[_profileId].isRegistered, "Profile not registered.");
        
        uint256[] memory traitIds = profileTraits[_profileId];
        Trait[] memory profileTraitsDetails = new Trait[](traitIds.length);

        for (uint256 i = 0; i < traitIds.length; i++) {
            profileTraitsDetails[i] = traits[traitIds[i]];
        }

        return profileTraitsDetails;
    }

    // Kontrat sahibinin adresi
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can add traits.");
        _;
    }

    // Constructor ile kontrat sahibini ayarlama
    constructor() {
        owner = msg.sender;
        profileIdCounter = 0;
        traitIdCounter = 0;
        profileCount = 0;
    }
}
