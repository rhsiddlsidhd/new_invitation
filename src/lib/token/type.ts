type JWTType = "ACCESS" | "REFRESH" | "ENTRY";

interface JWTBaseProps {
  type: JWTType;
}

interface AccessEncrypt {
  type: "ACCESS";
  id: string;
}

interface RefreshEncrypt {
  type: "REFRESH";
  id: string;
}

interface EntryEncrypt {
  type: "ENTRY";
  id?: string;
}

export type EncryptProps = AccessEncrypt | RefreshEncrypt | EntryEncrypt;

export interface DecryptProps extends JWTBaseProps {
  token: string;
}
