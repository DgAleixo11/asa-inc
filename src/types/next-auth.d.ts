import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "STUDENT" | "MENTOR" | "ADMIN";
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    role: "STUDENT" | "MENTOR" | "ADMIN";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: "STUDENT" | "MENTOR" | "ADMIN";
  }
}