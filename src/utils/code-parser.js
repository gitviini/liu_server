import { sha256 } from "js-sha256";

function encodeHash(text = ""){
    const hash = sha256.create()
    hash.update(text)
    return hash.hex()
}

export default encodeHash