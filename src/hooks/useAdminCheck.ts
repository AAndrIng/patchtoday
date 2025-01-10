import { useAuth0 } from '@auth0/auth0-react';

export function useAdminCheck() {
  const { user } = useAuth0();

  // En vez de user?.["clave"], usamos un condicional
  const roles = user && user["https://patchtoday.com/roles"]
    ? user["https://patchtoday.com/roles"]
    : [];

  return roles.includes("admin");
}
