import { jwtDecode } from "jwt-decode";
export const decodeJWT = (token: string | null) => jwtDecode(token ?? "");
