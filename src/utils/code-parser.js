import sha256 from 'crypto-js/sha256.js';
import hmacSHA512 from 'crypto-js/hmac-sha512.js';
import Base64 from 'crypto-js/enc-base64.js';


function encodeHash(text = ""){
    const hashDigest = sha256(text);
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, ""));
    return hmacDigest.substring(0,9)
}

export default encodeHash