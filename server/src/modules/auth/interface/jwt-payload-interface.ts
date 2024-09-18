export interface IJwtPayload {
  id: string; // or number, depending on your user ID type
  userName: string;
  iat: number; // issued at time
  exp: number; // expiration time
}
