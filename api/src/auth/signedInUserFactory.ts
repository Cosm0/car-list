import { SignedInUserDto } from './dto/auth.dto';

export function createSignedInUser(
  id: number,
  authToken: string,
  decodedToken: any,
): SignedInUserDto {
  const { username, exp, iat } = decodedToken;
  return {
    id,
    username,
    authToken,
    expiresOn: exp,
    issuedAt: iat,
  };
}
