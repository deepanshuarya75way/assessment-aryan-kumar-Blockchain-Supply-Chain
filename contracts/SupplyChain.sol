// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {

    // =========================
    // DATA STRUCTURES
    // =========================

    struct Movement {
        string location;
        uint256 timestamp;
    }

    struct Product {
        string name;
        string origin;
    
        Movement[] history;
        bool exists;
    }

    

    mapping(uint256 => Product) private products;
    uint256 public productCount;

   

    function addProduct(string memory _name, string memory _origin) public {
        Product storage p = products[productCount];

        p.name = _name;
        p.origin = _origin;
        p.exists = true;
        

        // First location = origin
        p.history.push(Movement(_origin, block.timestamp));

        productCount++;
    }


    //--------------------------
    // Product Identifier
    // -------------------------

    function getproductIdentifier(uint256 _id)
        public
        view
        returns(
            string memory name,
            string memory origin
        )
        {
            require (
                products[_id].exists,
                "Product not found"
            );
        }


    // =========================
    //  ADD MOVEMENT (TRACKING)
    // =========================

    function addMovement(uint256 _id, string memory _location) public {
        require(products[_id].exists, "Product does not exist");

        products[_id].history.push(
            Movement(_location, block.timestamp)
        );
    }

    // =========================
    //  GET PRODUCT DETAILS
    // =========================

    function getProduct(uint256 _id)
        public
        view
        returns (string memory name, string memory origin)
    {
        require(products[_id].exists, "Product not found");

        Product storage p = products[_id];
        return (p.name, p.origin);
    }

    // =========================
    //  GET FULL HISTORY
    // =========================

    function getHistory(uint256 _id)
        public
        view
        returns (Movement[] memory)
    {
        require(products[_id].exists, "Product not found");

        return products[_id].history;
    }

    // =========================
    // GET TOTAL PRODUCTS
    // =========================

    function getTotalProducts() public view returns (uint256) {
        return productCount;
    }
}