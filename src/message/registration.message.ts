const messages: Record<string, string> = {
  REGISTRATION_ALREADY_REQUESTED: 'You already requested for registration with this contact. Please check your email or phone message.',
  CONTACT_ALREADY_REGISTERED: 'Contact already registered. Please use another contact.',
  VERIFICATION_SUCCESS: 'User {username} verified successfully.',
  TOKEN_ALREADY_USED: 'Token has already been used for verification.',
  VERIFICATION_SENT_EMAIL: 'Verification email sent successfully to {contact}.',
  VERIFICATION_SENT_PHONE: 'Verification code sent successfully to {contact}.',
  VERIFICATION_FAILED: 'Token verification failed.',
  REGISTRATION_EVENT_EMITTED: 'Registration event emitted for user ID {userId}.',
};

export {
    messages,
}