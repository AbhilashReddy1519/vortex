```
1. User logs in → Server sends { onBoarding: true/false }
                ↓
2. Client stores in localStorage via setOnboardingStatus()
                ↓
3. If onBoarding = false → Redirect to /onboard
   If onBoarding = true → Redirect to /feed
                ↓
4. User completes onboarding → setOnboardingStatus(true)
                ↓
5. Redirected to /feed
                ↓
6. useAuthCheck() runs on every route change
   - If user tries to access /feed without onboarding
   - Redirects back to /onboard
```

-
```
1. User logs in → Server returns { id, email, onBoarding }
2. Client calls updateUser() to sync with auth state
3. useAuthCheck runs and checks user.onBoarding
4. If false → redirects to /onboard
5. User completes onboarding → Database updated to { onBoarding: true }
6. Next time user visits → /auth/me returns { onBoarding: true }
7. useAuthCheck sees true → allows access to /feed
```
```
1️⃣ App Mounts
   ↓
2️⃣ <AuthProvider> fetches user (ONE API call)
   ↓
3️⃣ User data is stored in Context (globally accessible)
   ↓
4️⃣ User navigates to /feed
   ↓
5️⃣ useAuthCheck runs:
   ├─ Is /feed PUBLIC? NO
   ├─ Is data Loading? NO
   ├─ Is /feed PRIVATE? YES → Check auth
   ├─ Is user authenticated? YES → Check onboarding
   ├─ Is user onboarded? YES → Allow access ✅
   └─ NO API CALLS MADE! Uses cached Context data
   ↓
6️⃣ User navigates to /onboard
   ├─ Is /onboard PUBLIC? NO
   ├─ Is data Loading? NO
   ├─ Is /onboard PRIVATE? YES → Check auth
   ├─ Is user authenticated? YES → Check onboarding
   ├─ Is user onboarded? NO → Stays on /onboard ✅
   └─ NO API CALLS MADE! Uses cached Context data
```

1. User logs in
   ↓
2. Server sets: accessToken, refreshToken, csrfToken ✅
   ↓
3. User makes request with accessToken
   ↓
4. AccessToken expires (15min)
   ↓
5. Next request gets 401 response
   ↓
6. Response interceptor calls POST /auth/refresh
   ↓
7. Server validates refreshToken, generates NEW accessToken ✅
   ↓
8. Original request retried with new accessToken ✅
   ↓
9. Success!