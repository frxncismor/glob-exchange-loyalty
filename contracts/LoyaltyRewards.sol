pragma solidity ^0.5.0;

contract LoyaltyRewards {
	address public owner;

    struct Employee {
        uint loyaltyPoints;
        uint totalCourses;
    }

    struct Course {
        string name;
        string url;
        string date;
    }

    uint etherPerPoint = 0.0005 ether;

    Course[] public courses;

    mapping(address => Employee) public employees;
    mapping(address => Course[]) public employeeCourses;
    mapping(address => uint) public employeeTotalCourses;

    event CourseUploaded(address indexed customer, string name, string url, string date);
    
    constructor() public {
        owner = msg.sender;
    }
    
    modifier isOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function getFundableEther() public view returns (uint) {
        return etherPerPoint * employees[msg.sender].loyaltyPoints;
    }

    function totalCourses() public view returns (uint) {
        return courses.length;
    }

    function redeemLoyaltyPoints() public {
        require(address(this).balance > 0);
        Employee storage employee = employees[msg.sender];
        require(employee.loyaltyPoints > 0);
        uint etherToRefund = etherPerPoint * employee.loyaltyPoints;
        msg.sender.transfer(etherToRefund);
        employee.loyaltyPoints = 0;
    }

    function uploadCourse(string memory name, string memory url, string memory date) public {
        courses.push(Course(name, url, date));
        Course storage course = courses[courses.length - 1];

        Employee storage employee = employees[msg.sender];
        employee.loyaltyPoints += 5;
        employee.totalCourses += 1;
        employeeCourses[msg.sender].push(course);
        employeeTotalCourses[msg.sender]++;

        emit CourseUploaded(msg.sender, course.name, course.url, course.date);
    }
    
    function addBalanceToContract() public payable returns (uint){
        return address(this).balance;
    }
    
    function getBalanceInEther() public view returns (uint) {
        return getContractBalance() / 1e18;
    }
    
     function getLoyaltyPoints() public view returns (uint) {
        Employee storage employee = employees[msg.sender];
        return employee.loyaltyPoints;
    }

}
