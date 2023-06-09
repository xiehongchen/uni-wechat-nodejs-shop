const AlipaySdk = require('alipay-sdk').default;
const alipaySdk = new AlipaySdk({
  // appid
  appId: '2021000122674738',
  //签名算法
  signType:'RSA2',
  //支付宝网关
  gateway:'https://openapi.alipaydev.com/gateway.do',
  //支付宝公钥
  alipayPublicKey:'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv22RhS00t1GjZTBt+crzAoaWdauS3bmmdDJ1t+4QhbGG9752egJuo68ZC7ExmUnPFAz/jrpziaaVUJy9UdM5c5v945/6fvr3I7e/VoholB5nm37qam9U3lirOJbYxm3cohZpe0FV0QX9XZsuv9vLOMRn75WYU6922k73GWw0g/2nsOBAFvlpU/OTVawkWqaHRKNX2OcgERkvTAhPqKPpst7+F7cy15/6HrVo5s6qhEjBNaZ3Jk8I2e7tQn200do6KLYYmR6lHZIAWtFXD2oueXVqzDLoyGOl7I9z2wSajONJt0zdbrRjwIiSI/0pQHqgCrd2u8XG7Qa6GCFLtqPNsQIDAQAB',
  //应用私钥
  privateKey:'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/bZGFLTS3UaNlMG35yvMChpZ1q5LduaZ0MnW37hCFsYb3vnZ6Am6jrxkLsTGZSc8UDP+OunOJppVQnL1R0zlzm/3jn/p++vcjt79WiGiUHmebfupqb1TeWKs4ltjGbdyiFml7QVXRBf1dmy6/28s4xGfvlZhTr3baTvcZbDSD/aew4EAW+WlT85NVrCRapodEo1fY5yARGS9MCE+oo+my3v4XtzLXn/oetWjmzqqESME1pncmTwjZ7u1CfbTR2joothiZHqUdkgBa0VcPai55dWrMMujIY6Xsj3PbBJqM40m3TN1utGPAiJIj/SlAeqAKt3a7xcbtBroYIUu2o82xAgMBAAECggEAdP3Mwtym7CabursHa3NqYy/IArBSOOo+XaN9KGT5egvOVdj0ZYrY/XaE0w1/J5ThVvq+sQcol4bUmIjCd6Ck6w/58cSS/kn5Ar5I1OTXLTcL0Q+WymeyMZV1R0eBwnvgLLuPycFbZjzH5Q5zWtREdjQq5VTC3NpOxAsgn0vvKH6tuf6jrT+E0RKSqeU4tu+TJmDYsOI5RSA9TKHprOspUMyVITEwtIQvG+sC2lzxR6MKdtM7zY7/+0tuzOoie/Bj2dumQ+VD2YeJoE6Guf8uD5cqlQ/k7wTrXvPlXyrXQN17J96HP54AZ5mUt8fVBfvj3Yh+eCwsUQvUjkyCF7mIMQKBgQDoJzceuarKU7TCrTZcG74K+oXMwbmUzO1482biwgaUlnVB4tOY1HWAmNrPYwlIra9xPHFt66+ab570c/zk+nqr2+oWE+HoR/HQUg2kmWw9G2WtOEloHY3ZY3Tv9fuSMy6OxEbT4TYQf2mFWvex+514BhSAQ3i+gQc074PQZbw+7QKBgQDTF23LH9Ac9IBrX/YwyNxxfPXGV31zL+mo1DWftUxu8H23Ly3sSTllGez9VDGbGkoe5M0KtO6wcb47SgUZ6y5x1j//BVOYarZNJGtsaAiQsMrBcXVus4dQmsZCjbtkWhw/VBZfkapgISUBO8Iz4l72gA4Dtx6BfSVKTfrKBrhtVQKBgCzHS6F4jJHkHWyjfmW70CdL9TzubP5fnLqEsGayqBRHBS0FNG05JcT9Ns9juemz3rBHyVU7ba6rMwzRxojgK4M0su05PozQO7tD6G/ETBVpUG5d+gLEGJVC0s5qMvEbQDK3dzXtLcF24gKf7kD9WH1LJu8qlIKiXqJ+RH2Q8gNtAoGAZ72L59eqn5BJzHtMso0ESYHwB5nXvVQ+sQoZkHO5LIxkPDKjjwwteNJU9er6tg8lfilT238wDubXZqvp9eLu4GM68End23oWPbM4V/6ItxMrkgYAgHcaeTKXXP3qqlbeqwDYPf+Ii9W+Ke0EdBs8MEiempTUGS83tFy+c6r52EECgYA1xt/0ehPSuDf4ERz3GBr4519IN05ByYoDTJNCvrYBrglWz+O5xZ0tUqeubv4qJ9NSikMN+vg+6htvNDwwZjPO34sSNEXVBz6XM0Ft5oeA1zeuGBBU1QzbwuoSegPAtHTRnJBYCX1z429st+j9p6EM4zWqjs5GqH3ecJVQhAuJgQ=='
});

module.exports = alipaySdk;