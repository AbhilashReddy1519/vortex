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