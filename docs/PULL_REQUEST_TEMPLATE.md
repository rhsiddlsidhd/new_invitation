CLAUDE GUIDE (PULL REQUEST)

이 문서는 Claude가 자동으로 생성하는 Pull Request의 형식을 통일하고,
명확한 리뷰와 추적을 가능하게 하기 위한 가이드이다.

Claude는 이 문서의 규칙을 **반드시** 따른다.
자유로운 해석이나 추측은 허용되지 않는다.

Claude는 아래 규칙을 반드시 따른다.

- PR 제목은 **영어로만** 작성한다
- PR 본문은 **한글로만** 작성한다
- 감정 표현, 불필요한 수식어 사용 금지
- 추측성 표현 사용 금지 (maybe, probably 등)
- 코드 변경사항에 존재하지 않는 내용 작성 금지
- PR 내용은 항상 간결하고 사실 기반으로 작성한다
- 체크리스트 항목은 실제로 수행한 것만 체크한다

---

## 1. PR Title Format

PR 제목은 아래 형식을 따른다.

<type>(<scope>): <summary>

### 규칙

- 커밋 메시지 컨벤션과 동일한 type, scope 사용
- 50자 이내
- 마침표(.) 사용 금지
- 현재 시제, 명령문 사용

### 예시

✅ Good

- feat(auth): add email verification flow
- fix(api): resolve token expiration issue
- refactor(validation): simplify schema structure

❌ Bad

- Added email verification
- Fix bugs
- Update files

---

## 2. PR Description Format

PR 본문은 아래 형식을 따른다.

```markdown
## Summary

<1-3 bullet points describing what changed>

## Changes

- <specific change 1>
- <specific change 2>
- <specific change 3>

## Test Plan

- [ ] <test item 1>
- [ ] <test item 2>

## Related

- Related to #<issue_number> (if applicable)
- Depends on #<pr_number> (if applicable)
```

---

## 3. Summary Section

변경사항의 핵심을 1-3개의 bullet point로 요약한다.

### 규칙

- 각 bullet point는 한 문장으로 작성
- "무엇을" 변경했는지에 집중
- 기술적 세부사항은 Changes 섹션에 작성

### 예시

✅ Good

```markdown
## Summary

- Refactor auth action structure to flatten nested directories
- Introduce ClientError and ServerError for better error handling
- Add shared libraries for cookies, email, token, and validation
```

❌ Bad

```markdown
## Summary

- Made some improvements to the auth system
- Fixed various issues
- Updated code to be better
```

---

## 4. Changes Section

구체적인 변경사항을 나열한다.

### 규칙

- 파일 단위 또는 기능 단위로 작성
- 동사로 시작 (add, remove, update, refactor, fix 등)
- 각 항목은 독립적이고 구체적이어야 함
- 삭제된 파일/기능도 명시

### 예시

✅ Good

```markdown
## Changes

- Flatten auth action directory structure (remove nested /action/action pattern)
- Replace CustomError with ClientError and ServerError classes
- Move validation schemas to domain-specific locations (auth/validation)
- Add shared/lib modules: cookies, email, token, validation
- Update all API routes to use handleMethodError
- Remove deprecated files: sendEmail.ts, setAuthTokenCookie.ts
```

❌ Bad

```markdown
## Changes

- Improved code quality
- Fixed bugs
- Updated some files
```

---

## 5. Test Plan Section

변경사항을 검증하기 위한 테스트 계획을 작성한다.

### 규칙

- 실제로 수행 가능한 테스트만 작성
- 체크박스 형식 사용
- 수행한 테스트는 체크, 수행하지 않은 테스트는 체크 해제
- 테스트를 수행하지 않았다면 이 섹션을 생략

### 예시

✅ Good

```markdown
## Test Plan

- [x] Build passes without errors
- [x] All TypeScript type checks pass
- [ ] Manual testing of auth flow required
```

❌ Bad

```markdown
## Test Plan

- Everything works fine
- No issues found
```

---

## 6. Related Section

관련된 이슈나 PR을 명시한다.

### 규칙

- 이슈 번호는 `#123` 형식 사용
- 키워드 사용:
  - `Fixes #123` - 이 PR이 이슈를 해결함
  - `Closes #123` - 이 PR이 이슈를 닫음
  - `Related to #123` - 이슈와 관련 있음
  - `Depends on #123` - 다른 PR에 의존함
- 관련 항목이 없으면 이 섹션을 생략

### 예시

✅ Good

```markdown
## Related

- Fixes #45
- Related to #42
```

---

## 7. 추가 규칙

### PR 생성 전 확인사항

Claude는 PR 생성 전 반드시 다음을 확인한다:

1. 모든 변경사항이 커밋되었는지 확인
2. 브랜치가 최신 상태인지 확인
3. 빌드 에러가 없는지 확인
4. base 브랜치가 올바른지 확인 (보통 main 또는 master)

### 금지사항

- 스크린샷이나 이미지를 추가하지 않는다 (사용자가 직접 추가)
- Breaking changes에 대한 추측을 하지 않는다
- 배포 노트를 작성하지 않는다 (필요시 사용자가 추가)
- 체크리스트를 미리 체크하지 않는다
