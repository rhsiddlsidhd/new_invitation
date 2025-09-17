interface ProductStore {
  font: string;
  backgroundColor: string;
  setFont: (font: string) => void;
  setBackgroundColor: (color: string) => void;
  setClearProduct: () => void;
}
