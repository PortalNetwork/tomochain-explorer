import {
  getTomoChainProvider
} from './web3Service';
import Resolver from './resolver';
import {
  getContentHash
} from '../helpers/ipfsHelper';
import {
  contentHash,
  address
} from '../lib/resolver';
const abi = require('ethereumjs-abi');
const Web3 = require('web3');
const namehash = require('eth-ens-namehash');
let web3 = new Web3();
let resolver = null;

const setWeb3Provider = () => {
  web3.setProvider(new web3.providers.HttpProvider(getTomoChainProvider(process.env.TNS_NETWORK)));
}

/**
 * 
 * @param {*} name 
 * @param {*} content 
 */
export const setContent = async (name, content) => {
  try {
    // name 要用 namehash
    console.log('name', name, 'content', content);
    let byteData = "0x" +
      abi.methodID("setContent", ["bytes32", "bytes32"]).toString("hex") +
      abi.rawEncode(["bytes32", "bytes32"], [namehash.hash(name), getContentHash(content)]).toString("hex");
    console.log('HASHED: name', namehash.hash(name), 'content', getContentHash(content));
    return byteData;
  } catch (err) {
    console.log('setResolver: ', name, content, err);
    return 'setResolver error';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} resolver 
 */
export const getContent = async (name, resolverAddr) => {
  try {
    setWeb3Provider();
    resolver = new Resolver(web3, resolverAddr);
    const content = await resolver.contentHash(namehash.hash(name));
    return content;
  } catch (err) {
    console.log('getContent: ', name, err);
    return 'getContent not found';
  }
}

/**
 * 
 * @param {*} name 
 * @param {*} resolver 
 */
export const getAddress = async (name, resolverAddr) => {
  try {
    setWeb3Provider();
    resolver = new Resolver(web3, resolverAddr);
    const content = await resolver.address(namehash.hash(name));
    return content;
  } catch (err) {
    console.log('getAddress: ', name, err);
    return 'getAddress not found';
  }
}
