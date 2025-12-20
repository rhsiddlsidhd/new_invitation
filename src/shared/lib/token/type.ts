type JWTType = "ACCESS" | "REFRESH" | "ENTRY";

interface JWTBaseProps {
  type: JWTType;
}

export interface EncryptProps extends JWTBaseProps {
  email: string;
}

export interface DecryptProps extends JWTBaseProps {
  token: string;
}
