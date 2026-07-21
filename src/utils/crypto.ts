import JSEncrypt from 'jsencrypt';

const PRIVATE_KEY_BASE64 =
  'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAICp1TDESIE7gdVrAsNI19dFffpxpk4XBuBNYDRu0++dM0LuE96hMp48q7uR/kUXt3RFCPaAOvoI1G/45HWVUKyGl7Rgx8tqifs3G0BRtX99+SoPitMKW4iCwTksZ9aEn1nLqm9dUnETjLD6JEAu4j0Yi4roR+j8dtgVvqmWtVdhAgMBAAECgYByZY52Q68rqFsyBGl6dKPkdZcjPDVfrT2h5WoqdHffzmerlL757V1yMAOJTK9Fg2bL7C2h7jWB5qPrwuJuYYpN9R6+jyiGymw+/sfUTkU4nE4WCL390zZYQR/fho8o0LFfY21AHX8vPJtULdC5cQB8HKIaWLodfmOSV+rWwrfboQJBANL/P8KgLWzi2kT66Ji6pETypQEoTO58Psz38s+z+u/U2/jx3/XrprMJ24MiKdqWOgkQjw6CWN9TvbGhhlVPBb0CQQCcGwtsjtWkOemsTcGaBsjnlCIbEF2q0m9zhDnrFDcanIBrpD0UBNwXhII2/kJuTArOL4T7FHvkuNDvyB+jJhh1AkARVxzcV+Gj0zjw9lXrR1t8txxMbg10hA19Nttjqnzy/OFfIjGvukAm8qZxrnsWFcaLPCslnBzFrdInKQkrNaVZAkBtpe1rThSwKuGAXol7OALL7tfZ7K/uOauBF0JbZbKi5YSqlw0zz4oMls2j9QoSUSVR2Dzu4192s35GvmnCfhK1AkAoQGW95ZuFMmsg2x28hWcTTV+kow+LLhCd/gXCbWo2qryipnqSyNmKnRDNm5hmY29fPsuSsJXmU1Dhr8JN5QnQ';

function toPem(base64Key: string): string {
  const chunks = base64Key.match(/.{1,64}/g) || [];
  return [
    '-----BEGIN PRIVATE KEY-----',
    ...chunks,
    '-----END PRIVATE KEY-----',
  ].join('\n');
}

let encryptInstance: JSEncrypt | null = null;

function getEncrypt(): JSEncrypt {
  if (!encryptInstance) {
    encryptInstance = new JSEncrypt();
    encryptInstance.setPrivateKey(toPem(PRIVATE_KEY_BASE64));
  }
  return encryptInstance;
}

/**
 * RSA encrypt the password before submitting to the login API.
 */
export function encryptPassword(password: string): string {
  const encrypted = getEncrypt().encrypt(password);
  if (!encrypted) {
    throw new Error('RSA encryption failed');
  }
  return encrypted;
}
