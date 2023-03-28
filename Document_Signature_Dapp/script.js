const contractAddress = "0xE441254cA2b064dD8fc6511A10eB9b87661101a4";
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addressToAdd",
				"type": "address"
			}
		],
		"name": "addToWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_documentHash",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "signer",
				"type": "address"
			}
		],
		"name": "DocumentSigned",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "sign",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "signer",
				"type": "address"
			}
		],
		"name": "isSignedBy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

provider.send("eth_requestAccounts", []).then(()=>{
    provider.listAccounts().then((accounts)=> {
        signer = provider.getSigner(accounts[0])
        contract = new ethers.Contract(contractAddress, abi, signer);
    });
});

async function add_to_whitelist() {
    const address = document.getElementById("address_1").value;
    await contract.addToWhitelist(address);
}

async function sign() {
    await contract.sign();
}

async function check_if_signed() {
    const address = document.getElementById("address_2").value;
    const answer = await contract.isSignedBy(address);
    document.getElementById("result").innerText = answer;
}