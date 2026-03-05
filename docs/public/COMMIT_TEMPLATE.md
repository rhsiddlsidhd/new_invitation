CLAUDE GUIDE (COMMIT)

이 문서는 Claude가 자동으로 생성하는 커밋 메시지의 형식을 통일하고,
리뷰, 추적, 자동화를 안정적으로 수행하기 위한 가이드이다.

Claude는 이 문서의 규칙을 **반드시** 따른다.
자유로운 해석이나 추측은 허용되지 않는다.

Claude는 아래 규칙을 반드시 따른다.

- 커밋 메시지는 **영어로만** 작성한다
- 감정 표현, 불필요한 수식어 사용 금지
- 추측성 표현 사용 금지 (maybe, probably 등)
- 코드 diff에 존재하지 않는 내용 작성 금지
- 설명 문장, 회고, 리뷰 스타일 문장 금지
- 커밋 메시지는 항상 간결하고 사실 기반으로 작성한다

## 1. Commit Message Format

모든 커밋 메시지는 아래 형식을 따른다.

<type>(<scope>): <summary>

---

## 2. type 규칙

type은 반드시 아래 목록 중 **하나만** 사용한다. (이모지 포함)

- ✨ feat : 새로운 기능 추가
- 🐛 fix : 버그 수정
- ♻️ refactor : 기능 변경 없는 코드 구조 개선
- ⚡ perf : 성능 개선
- 🧪 test : 테스트 추가 또는 수정
- 📝 docs : 문서 변경
- 🎨 style : 코드 스타일 변경 (포맷, 세미콜론 등)
- 🔧 chore : 빌드, 설정, 의존성, 워크플로우 변경

### type 규칙

- 여러 type을 동시에 사용하지 않는다
- 애매한 경우 `refactor` 또는 `chore`를 사용한다

---

## 3. scope 규칙

scope는 변경된 **주요 책임 영역**을 나타낸다.

### scope 작성 규칙

- 소문자만 사용
- 반드시 1개만 사용
- 폴더명, 도메인, 기능 단위 기준으로 선택

### scope 예시

- auth
- api
- ui
- algorithm
- workflow
- config
- docs
- error

---

## 4. summary 규칙

summary는 커밋의 핵심 변경 사항을 한 줄로 요약한다.

### summary 작성 규칙

- 현재 시제, 명령문 사용
- 50자 이내
- 마침표(.) 사용 금지
- “무엇을 했는지”만 작성

### Good

add login validation  
fix null pointer error  
simplify DFS implementation

### Bad

added login validation  
login validation added.  
this commit adds login validation logic
