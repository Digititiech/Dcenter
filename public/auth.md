# Client Authentication and Registration

To access the Decision Center APIs programmatically:

## 1. Registering your agent
To request API credentials, send an email to `info@dcenterfe.com` or contact us via our website at [https://www.dcenterfe.com/contact](https://www.dcenterfe.com/contact).
Include the following information:
* Agent Name and Owner Organization
* Target Use Case (e.g., automated feasibility analysis, financial report parsing)
* Expected request frequency

## 2. Authenticating
Use the provided client credentials or API key in your request headers:
```http
Authorization: Bearer <your-api-key>
```
