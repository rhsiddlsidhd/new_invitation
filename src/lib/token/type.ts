type JWTType = "ACCESS" | "REFRESH" | "ENTRY";

interface JWTBaseProps {
  type: JWTType;
}

interface AccessEncrypt {
  type: "ACCESS";
  email: string;
}

interface RefreshEncrypt {
  type: "REFRESH";
  email: string;
}

interface EntryEncrypt {
  type: "ENTRY";
  email?: string;
}

export type EncryptProps = AccessEncrypt | RefreshEncrypt | EntryEncrypt;

export interface DecryptProps extends JWTBaseProps {
  token: string;
}
