declare module 'crypto-browserify' {
    import { Hash, Hmac, Cipher, Decipher, Signer, Verify, DiffieHellman, ECDH, randomBytes } from 'crypto';
  
    export function createHash(algorithm: string): Hash;
    export function createHmac(algorithm: string, key: string | Buffer): Hmac;
    export function createCipher(algorithm: string, password: string | Buffer): Cipher;
    export function createDecipher(algorithm: string, password: string | Buffer): Decipher;
    export function createSign(algorithm: string): Signer;
    export function createVerify(algorithm: string): Verify;
    export function createDiffieHellman(prime_length: number, generator?: number | string | Buffer): DiffieHellman;
    export function createECDH(curve_name: string): ECDH;
    export { randomBytes };
  }