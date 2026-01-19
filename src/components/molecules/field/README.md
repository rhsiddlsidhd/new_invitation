# Field Components

## 정의

> **"Label + Control + (선택적) 설명/에러메시지가 결합된 폼 입력 필드 단위 컴포넌트"**

`field/` 폴더는 사용자 입력을 받는 **폼 필드 단위** 컴포넌트를 포함한다.

---

## atoms vs molecules/field 차이

| 구분 | 위치 | 설명 | 예시 |
|-----|-----|------|-----|
| **단일 요소** | `atoms/` | 순수 UI 요소 | `<Input />`, `<Select />` |
| **필드 단위** | `molecules/field/` | Label + Control 조합 | `<InputField />`, `<SelectField />` |

```tsx
// atoms/Input - 순수 Input 요소
<Input placeholder="이름" />

// molecules/field/InputField - Label이 결합된 필드 단위
<InputField label="이름" placeholder="이름을 입력하세요" />
```

---

## 파일 네이밍 규칙

### 기본 규칙

```
{Control}Field.tsx
```

- `{Control}`: 핵심 입력 요소의 이름 (Input, Select, Switch 등)
- `Field`: 접미사로 필드 단위임을 명시

### 예시

| 파일명 | 구성 | 설명 |
|-------|-----|------|
| `InputField.tsx` | Label + Input | 텍스트 입력 필드 |
| `SelectField.tsx` | Label + Select | 선택 드롭다운 필드 |
| `SwitchField.tsx` | Label + Switch | 토글 스위치 필드 |
| `RadioField.tsx` | Label + RadioGroup | 라디오 버튼 그룹 필드 |
| `ImageField.tsx` | Label + ImageUpload | 이미지 업로드 필드 |

### 복합 필드

특수한 용도의 복합 필드는 **도메인 + Field** 형식으로 명명한다.

| 파일명 | 구성 | 설명 |
|-------|-----|------|
| `AddressField.tsx` | Label + 주소검색 + Input | 주소 검색 필드 |
| `BankAccountField.tsx` | Label + 은행선택 + 계좌입력 | 은행 계좌 입력 필드 |

---

## 컴포넌트 구조 가이드

### 필수 요소

```tsx
interface FieldProps {
  label: string;        // 필드 레이블 (필수)
  name: string;         // 폼 필드 이름 (필수)
  // ... control specific props
}
```

### 선택 요소

```tsx
interface FieldProps {
  description?: string; // 필드 설명
  error?: string;       // 에러 메시지
  required?: boolean;   // 필수 여부 표시
  disabled?: boolean;   // 비활성화 상태
}
```

### 기본 구조 예시

```tsx
const InputField = ({ label, name, description, error, ...props }) => {
  return (
    <div className="field">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...props} />
      {description && <p className="description">{description}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
```

---

## 폴더 구조

```
molecules/
└── field/
    ├── README.md           # 이 문서
    ├── InputField.tsx
    ├── SelectField.tsx
    ├── SwitchField.tsx
    ├── RadioField.tsx
    ├── ImageField.tsx
    ├── AddressField.tsx
    └── BankAccountField.tsx
```
