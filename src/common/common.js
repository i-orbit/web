import JSEncrypt from 'jsencrypt'

const __RSA_PUBLIC_KEY_ = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCAqdUwxEiBO4HVawLDSNfXRX36caZOFwbgTWA0btPvnTNC7hPeoTKePKu7kf5FF7d0RQj2gDr6CNRv+OR1lVCshpe0YMfLaon7NxtAUbV/ffkqD4rTCluIgsE5LGfWhJ9Zy6pvXVJxE4yw+iRALuI9GIuK6Efo/HbYFb6plrVXYQIDAQAB-----END PUBLIC KEY-----";
const encryptor = new JSEncrypt();
encryptor.setKey(__RSA_PUBLIC_KEY_);
export const encrypt = function (raw) {
    return encryptor.encrypt(raw);
}