export interface IJwtPayload {
  id: number; // or number, depending on your user ID type
  userName: string;
  iat: number; // issued at time
  exp: number; // expiration time
}
