export function getFirebaseAuthErrorMessage(errorCode) {
  const errorMessages = {
    // Common Auth errors
    'auth/network-request-failed': 'Network error. Please check your connection and try again.',
    'auth/user-disabled': 'This user account has been disabled.',
    'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
    'auth/too-many-requests': 'Too many requests. Please wait a moment and try again.',
    'auth/invalid-credential': 'Invalid credential. Please try again.',
    'auth/internal-error': 'An internal error occurred. Please try again later.',

    // Sign-in with Email & Password
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email address.',

    // Create user (Sign-up)
    'auth/email-already-in-use': 'This email is already in use. Please try signing in.',
    'auth/weak-password': 'Password should be at least 6 characters.',

    // Forgot password (Send reset email)
    'auth/missing-email': 'Please enter your email address to reset your password.',

    // Update profile (email / password / profile info)
    'auth/requires-recent-login': 'Please sign in again to update your profile.',
    'auth/invalid-verification-code': 'Invalid verification code.',
    'auth/invalid-verification-id': 'Invalid verification ID.',

    // Popup-related (Google etc.)
    'auth/popup-closed-by-user': 'The sign-in popup was closed before completing the sign-in.',
    'auth/cancelled-popup-request': 'Canceled previous sign-in attempt.',
    'auth/popup-blocked': 'The sign-in popup was blocked by your browser. Please allow popups and try again.',
    'auth/unauthorized-domain': 'This app is not authorized for this sign-in method.',
    'auth/account-exists-with-different-credential': 'An account already exists with a different sign-in method. Please use the correct provider.',

    // Fallback
    default: 'An unexpected error occurred. Please try again.',
  };

  return errorMessages[errorCode] || errorMessages.default;
}