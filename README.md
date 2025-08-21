# 🥬 냉장고를 부탁해 (냉부해 : Naeng-Bu-Hae) – 냉장고 속 재료 기반 레시피 추천 플랫폼

> **기간**: 2025.07 ~ 2025.08
> **팀 프로젝트**

냉부해는 냉장고 속 남은 재료들을 활용해 만들 수 있는 레시피를 추천해주는 웹 애플리케이션입니다.  
사용자는 재료를 선택하고, 이를 기반으로 **레시피 API**를 호출해 관련 요리를 추천받을 수 있으며, 로컬 스토리지를 활용해 재료 선택 내역을 저장할 수 있습니다.
또한 마트 시스템을 도입하여 장을 본 재료들을 냉장고에 업데이트할 수 있는 기능을 추가했습니다.

---

## 📝 프로젝트 개요
- 사용자가 선택한 재료를 기반으로 레시피를 추천
- 레시피 상세 정보를 조회하고, 유튜브 영상을 통해 조리법을 참고 가능
- 로컬 스토리지 기반으로 선택한 재료 저장 → 새로고침 후에도 유지
- 간단하고 직관적인 카드 UI의 형태로 모바일 환경에서도 사용 가능

---

## ⚙️ 핵심 기능
✅ **재료 선택 기능**  
- 체크박스/버튼 기반으로 원하는 재료를 선택 가능  
- 선택한 재료는 `localStorage`에 저장되어 유지  

✅ **레시피 추천**  
- 선택한 재료들을 조합하여 API 호출  
- 해당 재료로 만들 수 있는 레시피 목록 제공  

✅ **레시피 상세 페이지**  
- 레시피명, 이미지, 필요한 재료, 조리 과정 확인 가능  
- 관련 YouTube 영상/링크 임베딩  

✅ **UX/UI 최적화**  
- 직관적인 카테고리별 재료 선택 UI  
- 반응형 UI 설계로 모바일 브라우저에서도 원활하게 사용 가능  

---

## 💻 기술 스택
| 역할 | 기술 |
|------|------|
| **Frontend** | Next.js 15 (App Router), React, TypeScript |
| **상태 관리 & 저장** | LocalStorage |
| **스타일링** | Tailwind CSS |
| **API 활용** | Recipe API (조리식품의 레시피 DB API) |
| **배포** | Vercel |

---

## 🚀 주요 문제 해결 경험
- **모바일 반응형 CSS 스타일링 오류**: 반응형 CSS 스타일링을 하던 중에 레시피 상세 페이지에서
                                      높이를 명시적으로 지정하지 않아 생긴 레이아웃 오버플로우
                                      오류를 해결함으로써 반응형 처리에 대해 좀 더 깊게 알게 됨

---

## 📌 배운 점 및 성과
- Next.js App Router를 활용한 라우팅 및 서버/클라이언트 컴포넌트 분리 경험  
- 로컬 저장소를 사용하는 패턴 학습  
- 실제 사용 가능한 "냉장고 속 재료 기반" 추천 서비스 제작  

---

## 🎬 배포 사이트 및 스크린샷 
🚀 [냉부해 배포 사이트](https://naeng-bu-hae.vercel.app) - [https://naeng-bu-hae.vercel.app]

(📸 추후 스크린샷 추가 예정)  
- 홈 화면  
- 재료 선택 화면  
- 레시피 추천 결과 화면  
- 레시피 상세 화면  

---

## 🏗 폴더 구조
```bash
📦 src
├── app
│   ├── (ingredients)
│   │   └── ingredients
│   │       └── page.tsx
│   ├── (mart)
│   │   └── mart
│   │       └── page.tsx
│   ├── (recipes)
│   │   └── recipes
│   │       ├── detail
│   │       │   └── [name]
│   │       │       ├── layout.tsx
│   │       │       └── page.tsx
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── api
│   └── recipes
│       └── detail
│           └── route.ts
│
├── components
│   ├── CartModal.tsx
│   ├── DetailRecipe.tsx
│   ├── Header.tsx
│   ├── IngredientListModal.tsx
│   └── RecipeList.tsx
│
├── data
|   └── RecipeList.tsx
│
├── globals.css
├── page.tsx
├── layout.tsx


## 🔧 설치 및 실행 방법

```bash
# 레포지토리 클론
git clone [https://github.com/jiwoopark727/naeng-bu-hae.git]
cd naeng-bu-hae

# 패키지 설치
npm install

# 환경 변수 설정 (.env 파일 생성 후 환경 변수 추가)
(생략... 필요시 문의 메일 부탁드립니다)

# 개발 서버 실행
npm run dev
````

<br/>

## 📜 라이선스

본 프로젝트는 **MIT 라이선스**를 따릅니다.
