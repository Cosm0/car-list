export class SingInDto {
  username: string;
  password: string;
}

export class SignedInUserDto {
  id: number;
  username: string;
  authToken: string;
  issuedAt: Date;
  expiresOn: Date;
}
