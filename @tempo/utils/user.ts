interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

export function getUserName(user: User, returnEmail?: boolean): string {
  if (!user.email && !user.firstName && !user.lastName) return '';
  if (user.firstName && user.lastName) return [user.firstName, user.lastName].join(' ');
  return returnEmail ? user.email : (user.email.split('@')[0] as string);
}

export function getUserInitials(user: User): string {
  if (!user) return '';
  const { firstName, lastName, email } = user;
  if (firstName && lastName) {
    return (firstName.slice(0, 1) + lastName.slice(0, 1)).toUpperCase();
  } else if (email) {
    return email.slice(0, 2).toUpperCase();
  }
  return '';
}
