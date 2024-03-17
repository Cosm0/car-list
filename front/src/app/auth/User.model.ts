export interface User {
  id: string;
  username: string;
  authToken: string;
  expiresOn: Date;
  issuedAt: Date;
}
